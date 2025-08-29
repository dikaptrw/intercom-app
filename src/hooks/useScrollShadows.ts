import { useState, useEffect, useRef } from 'react';

export function useScrollShadows<T extends HTMLElement>() {
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

    updateShadows(); // initial check

    el.addEventListener('scroll', updateShadows);
    window.addEventListener('resize', updateShadows);

    return () => {
      el.removeEventListener('scroll', updateShadows);
      window.removeEventListener('resize', updateShadows);
    };
  }, []);

  return { ref, showTopShadow, showBottomShadow };
}
