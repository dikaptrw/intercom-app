import { useState, useEffect, useRef, type DependencyList } from 'react';

export function useScrollShadows<T extends HTMLElement>({
  deps,
}: {
  deps: DependencyList;
}) {
  const ref = useRef<T>(null);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateShadows = () => {
      setShowTopShadow(el.scrollTop > 0);
      setShowBottomShadow(el.scrollHeight - el.scrollTop > el.clientHeight);
    };

    updateShadows(); // run once on mount or when deps change

    el.addEventListener('scroll', updateShadows);
    window.addEventListener('resize', updateShadows);

    return () => {
      el.removeEventListener('scroll', updateShadows);
      window.removeEventListener('resize', updateShadows);
    };
  }, deps);

  return { ref, showTopShadow, showBottomShadow };
}
