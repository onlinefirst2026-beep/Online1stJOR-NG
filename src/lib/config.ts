import { SiteMode, ThemeVariant, JournalPage } from '../types';

/**
 * Central JORMASS Configuration & URL Resolver
 * 
 * Supports three operating environments:
 * 1. Demo-only mode: No Supabase, internal routes (/demo/demo1, /demo/demo2, /demo/demo3).
 * 2. Preview deployment mode: PreviewNest custom URLs configured.
 * 3. Production implementation mode: Backend/Supabase enabled.
 */

// Helper to normalize environment strings safely across environments
const getEnvString = (key: string, defaultValue: string = ''): string => {
  try {
    const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> })?.env;
    const value = metaEnv ? metaEnv[key] : undefined;
    if (value === undefined || value === null || value === '') {
      return defaultValue;
    }
    return String(value).trim();
  } catch {
    return defaultValue;
  }
};

export const config = {
  // 1. Site Execution Mode ('hub' | 'demo' | 'admin')
  siteMode: (getEnvString('VITE_SITE_MODE', 'hub') as SiteMode),

  // 2. Theme / Demo Variant ('demo1' | 'demo2' | 'demo3')
  themeVariant: (getEnvString('VITE_THEME_VARIANT', 'demo1') as ThemeVariant),

  // 3. OnlineFirst Proposal Hub URL (defaults to internal '/')
  hubUrl: getEnvString('VITE_HUB_URL', '/'),

  // 4. Existing OJS Base URL for editorial continuity
  ojsBaseUrl: getEnvString('VITE_OJS_BASE_URL', 'https://jormass.com/journal/index.php/jormass'),

  // 5. Demo URLs (First preference: PreviewNest custom domain, Fallback: internal route)
  demoUrls: {
    demo1: getEnvString('VITE_DEMO1_URL', '/demo/demo1'),
    demo2: getEnvString('VITE_DEMO2_URL', '/demo/demo2'),
    demo3: getEnvString('VITE_DEMO3_URL', '/demo/demo3'),
  },

  // 6. Optional Supabase Credentials (NOT required during demo phase)
  supabase: {
    url: getEnvString('VITE_SUPABASE_URL', ''),
    anonKey: getEnvString('VITE_SUPABASE_ANON_KEY', ''),
  },
};

/**
 * Check if Supabase backend is configured
 */
export const hasSupabase: boolean = Boolean(
  config.supabase.url &&
  config.supabase.anonKey &&
  config.supabase.url.startsWith('http') &&
  config.supabase.anonKey.length > 10
);

/**
 * URL & Route Helpers
 */
export function isExternalUrl(url: string): boolean {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
}

export function getDemoUrl(theme: ThemeVariant): string {
  return config.demoUrls[theme] || `/demo/${theme}`;
}

export function getHubUrl(): string {
  return config.hubUrl || '/';
}

export function getOjsUrl(subpath: string = ''): string {
  const base = config.ojsBaseUrl.replace(/\/+$/, '');
  if (!subpath) return base;
  return `${base}/${subpath.replace(/^\/+/, '')}`;
}

/**
 * Parse URL path or search parameters on app mount to determine initial mode and demo
 */
export function parseInitialRoute(): {
  mode: SiteMode;
  theme: ThemeVariant;
  page: JournalPage;
} {
  if (typeof window === 'undefined') {
    return {
      mode: config.siteMode,
      theme: config.themeVariant,
      page: 'home',
    };
  }

  const pathname = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);

  // Check URL pathname or hash for internal demo routes
  if (pathname.includes('/demo/demo1') || hash.includes('/demo/demo1') || searchParams.get('demo') === '1' || searchParams.get('theme') === 'demo1') {
    return { mode: 'demo', theme: 'demo1', page: (searchParams.get('page') as JournalPage) || 'home' };
  }
  if (pathname.includes('/demo/demo2') || hash.includes('/demo/demo2') || searchParams.get('demo') === '2' || searchParams.get('theme') === 'demo2') {
    return { mode: 'demo', theme: 'demo2', page: (searchParams.get('page') as JournalPage) || 'home' };
  }
  if (pathname.includes('/demo/demo3') || hash.includes('/demo/demo3') || searchParams.get('demo') === '3' || searchParams.get('theme') === 'demo3') {
    return { mode: 'demo', theme: 'demo3', page: (searchParams.get('page') as JournalPage) || 'home' };
  }
  if (pathname.includes('/admin') || hash.includes('/admin') || searchParams.get('mode') === 'admin') {
    return { mode: 'admin', theme: config.themeVariant, page: 'home' };
  }
  if (pathname.includes('/hub') || hash.includes('/hub') || searchParams.get('mode') === 'hub') {
    return { mode: 'hub', theme: config.themeVariant, page: 'home' };
  }

  // Fallback to configured environment defaults
  return {
    mode: config.siteMode,
    theme: config.themeVariant,
    page: 'home',
  };
}
