import { useEffect, useState } from 'react';
import { useClientMediaQuery } from './useClientMediaQuery';

function getBreakpoints() {
  const root = getComputedStyle(document.documentElement);
  return {
    xs: root.getPropertyValue('--breakpoint-xs').trim() || '0rem',
    '2xs': root.getPropertyValue('--breakpoint-2xs').trim() || '0rem',
    sm: root.getPropertyValue('--breakpoint-sm').trim() || '0rem',
    '2sm': root.getPropertyValue('--breakpoint-2sm').trim() || '0rem',
    md: root.getPropertyValue('--breakpoint-md').trim() || '0rem',
    '2md': root.getPropertyValue('--breakpoint-2md').trim() || '0rem',
    lg: root.getPropertyValue('--breakpoint-lg').trim() || '0rem',
    '2lg': root.getPropertyValue('--breakpoint-2lg').trim() || '0rem',
    xl: root.getPropertyValue('--breakpoint-xl').trim() || '0rem',
    '2xl': root.getPropertyValue('--breakpoint-2xl').trim() || '0rem',
  };
}

export function useDevice() {
  const [bp, setBp] = useState<Record<string, string>>(() =>
    // fallback on first render to avoid SSR mismatch
    ({
      xs: '0rem',
      '2xs': '0rem',
      sm: '0rem',
      '2sm': '0rem',
      md: '0rem',
      '2md': '0rem',
      lg: '0rem',
      '2lg': '0rem',
      xl: '0rem',
      '2xl': '0rem',
    }),
  );

  useEffect(() => {
    setBp(getBreakpoints());
  }, []);

  const isXs = useClientMediaQuery(`(max-width: ${bp['xs']})`);
  const is2Xs = useClientMediaQuery(`(max-width: ${bp['2xs']})`);
  const isSm = useClientMediaQuery(`(max-width: ${bp['sm']})`);
  const is2Sm = useClientMediaQuery(`(max-width: ${bp['2sm']})`);
  const isMd = useClientMediaQuery(`(max-width: ${bp['md']})`);
  const is2Md = useClientMediaQuery(`(max-width: ${bp['2md']})`);
  const isLg = useClientMediaQuery(`(max-width: ${bp['lg']})`);
  const is2Lg = useClientMediaQuery(`(max-width: ${bp['2lg']})`);
  const isXl = useClientMediaQuery(`(max-width: ${bp['xl']})`);
  const is2Xl = useClientMediaQuery(`(max-width: ${bp['2xl']})`);
  const isHuge = useClientMediaQuery(`(min-width: ${bp['2xl']})`);

  const isMobile = isSm;
  const isTablet = isLg && !isSm;
  const isDesktop = !isXl;

  let currentScreen: keyof typeof bp | undefined;
  if (isXs) currentScreen = 'xs';
  else if (is2Xs) currentScreen = '2xs';
  else if (isSm) currentScreen = 'sm';
  else if (is2Sm) currentScreen = '2sm';
  else if (isMd) currentScreen = 'md';
  else if (is2Md) currentScreen = '2md';
  else if (isLg) currentScreen = 'lg';
  else if (is2Lg) currentScreen = '2lg';
  else if (isXl) currentScreen = 'xl';
  else if (is2Xl || isHuge) currentScreen = '2xl';

  return {
    isMobile,
    isTablet,
    isDesktop,
    isXs,
    is2Xs,
    isSm,
    is2Sm,
    isMd,
    is2Md,
    isLg,
    is2Lg,
    isXl,
    is2Xl,
    currentScreen,
  };
}
