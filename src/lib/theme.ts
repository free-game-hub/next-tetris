export type ThemeType = 'classic' | 'neon' | 'retro' | 'dark';

export interface Theme {
  background: string;
  grid: {
    empty: string;
    border: string;
  };
  block: {
    active: string;
    fixed: string;
    border: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
}

export const themes: Record<ThemeType, Theme> = {
  classic: {
    background: 'bg-gray-900',
    grid: {
      empty: 'bg-gray-800',
      border: 'border-gray-700'
    },
    block: {
      active: 'bg-yellow-500',
      fixed: 'bg-cyan-500',
      border: 'border-opacity-25'
    },
    text: {
      primary: 'text-white',
      secondary: 'text-gray-300'
    }
  },
  neon: {
    background: 'bg-black',
    grid: {
      empty: 'bg-gray-900',
      border: 'border-purple-500/20'
    },
    block: {
      active: 'bg-pink-500',
      fixed: 'bg-purple-500',
      border: 'border-white/25'
    },
    text: {
      primary: 'text-pink-500',
      secondary: 'text-purple-400'
    }
  },
  retro: {
    background: 'bg-green-900',
    grid: {
      empty: 'bg-green-800',
      border: 'border-green-700'
    },
    block: {
      active: 'bg-green-400',
      fixed: 'bg-green-500',
      border: 'border-green-300/25'
    },
    text: {
      primary: 'text-green-300',
      secondary: 'text-green-400'
    }
  },
  dark: {
    background: 'bg-zinc-900',
    grid: {
      empty: 'bg-zinc-800',
      border: 'border-zinc-700'
    },
    block: {
      active: 'bg-zinc-400',
      fixed: 'bg-zinc-500',
      border: 'border-zinc-300/25'
    },
    text: {
      primary: 'text-zinc-300',
      secondary: 'text-zinc-400'
    }
  }
}; 