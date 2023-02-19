import { useSpring, useTransform } from 'framer-motion';
import { RefObject, useEffect, useRef } from 'react';

type SpringOptions = Parameters<typeof useSpring>[1]
type Size = {
  width?: number
  height?: number
}

export function useRelativeMouseFollow<T extends HTMLElement>(ref: RefObject<T>, config?: SpringOptions) {
  const rx = useSpring(0.5, config);
  const ry = useSpring(0.5, config);

  useEffect(() => {
    const handler = (event: PointerEvent) => {
      if (!ref.current) return;
      // calling getBoundingClientRect on every pointer move is not ideal
      // fine for now
      const rect = ref.current.getBoundingClientRect();
      const relX = (event.clientX - rect.x) / rect.width;
      const relY = (event.clientY - rect.y) / rect.height;
      rx.set(relX);
      ry.set(relY);
    };

    if (ref.current) {
      ref.current.addEventListener('pointermove', handler);
    }
    return () => ref.current?.removeEventListener('pointermove', handler);
  }, [ref]);

  return [rx, ry];
}
