import { useRef } from 'react';

export function useImmediateRef<T>(currentValue: T) {
  const ref = useRef<T>(currentValue);
  ref.current = currentValue;
  return ref;
}