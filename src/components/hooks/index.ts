import { useRef, useEffect } from "react";

type Timer = ReturnType<typeof setTimeout>
type SomeFunction = (...args: any[]) => void

export const useDebounce = <Func extends SomeFunction>(func: Func, delay = 200) => {
  const timer = useRef<Timer>()

  useEffect(() => {
    return () => {
      if (!timer.current) return
      clearTimeout(timer.current)
    }
  }, [])

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args)
    }, delay)
    clearTimeout(timer.current)
    timer.current = newTimer
  }) as Func

  return debouncedFunction;
}
