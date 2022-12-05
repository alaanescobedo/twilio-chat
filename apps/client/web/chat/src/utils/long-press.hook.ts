import { useRef, useState } from "react"

export const useLongPress = ({ onClick, inTime }: { onClick?: Function, inTime: number } = { inTime: 350 }) => {

  const [isLongPress, setIsLongPress] = useState(false)
  const timerRef = useRef(0)
  const isLongPressRef = useRef(false)

  const startPressTimer = () => {
    isLongPressRef.current = false
    timerRef.current = setTimeout(() => {
      isLongPressRef.current = true
      setIsLongPress(true)
    }, inTime)
  }
  const handleOnClick = () => {
    if (isLongPressRef.current === true) return
    if (typeof onClick === 'function') onClick()
  }
  const handleOnMouseDown = () => startPressTimer()
  const handleOnMouseUp = () => clearTimeout(timerRef.current)
  const handleOnTouchStart = () => startPressTimer()
  const handleOnTouchEnd = () => clearTimeout(timerRef.current)

  return {
    isLongPress,
    setIsLongPress,
    handlers: {
      onClick: handleOnClick,
      onMouseDown: handleOnMouseDown,
      onMouseUp: handleOnMouseUp,
      onTouchStart: handleOnTouchStart,
      onTouchEnd: handleOnTouchEnd
    }
  }
}
