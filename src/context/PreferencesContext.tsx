import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Preferences = {
  name?: string;
  defaultGuestCount?: number;
  lastCategory?: string; // Remembers last selected menu category
};

type PreferencesContextValue = {
  ready: boolean;
  preferences: Preferences;
  updatePreferences: (patch: Partial<Preferences>) => Promise<void>;
  clear: () => Promise<void>;
};

const STORAGE_KEY = 'app:preferences:v1';

const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({});

  // Load from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Preferences;
          setPreferences(parsed ?? {});
        }
      } catch {
        // ignore parse/load errors, fall back to defaults
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const persist = useCallback(async (next: Preferences) => {
    setPreferences(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore persist errors
    }
  }, []);

  const updatePreferences = useCallback(async (patch: Partial<Preferences>) => {
    await persist({ ...preferences, ...patch });
  }, [preferences, persist]);

  const clear = useCallback(async () => {
    await persist({});
  }, [persist]);

  const value = useMemo<PreferencesContextValue>(() => ({ ready, preferences, updatePreferences, clear }), [ready, preferences, updatePreferences, clear]);

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return ctx;
}

