# helpful-motion-hooks
Just some helpful framer motion hooks

## useParallax
```jsx
import { useParallax } from 'helpful-motion-hooks'

const parallaxRef = useRef()
const [ty, invty] = useParallax(ref)
```

## useRelativeMouseFollow
```jsx
import { useRelativeMouseFollow } from 'helpful-motion-hooks'

const followRef = useRef()
const [rx, ry] = useRelativeMouseFollow(ref)
```