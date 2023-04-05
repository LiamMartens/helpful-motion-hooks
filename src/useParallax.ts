import { useScroll, useTransform } from 'framer-motion';
import { MutableRefObject } from 'react';

type UseScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>
type ScrollOffset = UseScrollOptions['offset'];

// @REAMDE takes a ref and returns 2 motion values
// the first one being the positive parallax - normalized between -1 and 1 with 0 being equivalent to the element being in the middle of the screen
// the second one is the inverse of the first one - between 1 and -1 for an inverse effect
export function useParallax(
  ref: MutableRefObject<HTMLDivElement | null>,
  scrollOffset: ScrollOffset = ['start end', 'end start'],
  otherOptions: UseScrollOptions = {}
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: scrollOffset,
    ...otherOptions,
  });
  const ty = useTransform(scrollYProgress, (progress) => {
    // normalize between -1 and 1 -> with 0 being equivalent to 0.5
    const normalized = ((progress * 2) - 1);
    return normalized;
  });
  const invty = useTransform(ty, (value) => -value);

  return [ty, invty];
}
