
import { useState, useEffect } from 'react';
import { fetchStarLifeStreamData } from '@/data/mock-data';

interface StreamSource {
  url: string;
  headers?: Record<string, string>;
  qualityOptions: { label: string; value: string }[];
  isLoading: boolean;
  error: Error | null;
  refreshStream: () => Promise<void>;
}

export function useStreamSource(channelId: string): StreamSource {
  const [url, setUrl] = useState<string>('');
  const [headers, setHeaders] = useState<Record<string, string> | undefined>(undefined);
  const [qualityOptions, setQualityOptions] = useState<{ label: string; value: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timeout | null>(null);

  const fetchStreamData = async () => {
    setIsLoading(true);
    try {
      if (channelId === 'starlife') {
        const data = await fetchStarLifeStreamData();
        
        // Parse header properties into proper format
        const headerProps = data.headerProperties ? 
          data.headerProperties.split(';').reduce((acc: Record<string, string>, prop: string) => {
            const [key, value] = prop.split('=');
            if (key && value) acc[key.trim()] = value.trim();
            return acc;
          }, {}) : undefined;
        
        setUrl(data.streamUrl);
        setHeaders(headerProps);
        setQualityOptions(data.qualityOptions);
        
        // Set expiration time and refresh timer
        if (data.expiresIn) {
          const expireTime = Date.now() + (data.expiresIn * 1000);
          setExpiresAt(expireTime);
          
          // Set a timer to refresh the stream 10 seconds before expiration
          if (refreshTimer) clearTimeout(refreshTimer);
          const newTimer = setTimeout(() => {
            fetchStreamData();
          }, (data.expiresIn - 10) * 1000);
          
          setRefreshTimer(newTimer);
        }
      } else {
        // For regular channels, just use the static URL
        setUrl(`https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`);
        setHeaders(undefined);
        setQualityOptions([
          { label: "Auto", value: "auto" },
          { label: "1080p", value: "1080" },
          { label: "720p", value: "720" },
          { label: "480p", value: "480" },
          { label: "360p", value: "360" },
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      console.error('Error fetching stream source:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchStreamData();
    
    // Clean up timer on unmount
    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
    };
  }, [channelId]);

  return {
    url,
    headers,
    qualityOptions,
    isLoading,
    error,
    refreshStream: fetchStreamData
  };
}
