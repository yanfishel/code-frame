import React, { createRef, useEffect, useRef } from "react"
import lottie, { AnimationItem } from "lottie-web"


interface LottieAnimationProps {
  data: any
  onLoaded?: () => void
  className?: string
  style?: React.CSSProperties
}
const LottieAnimation = ({ data, onLoaded = ()=>null, className, style }: LottieAnimationProps) => {

  const animRef = useRef<AnimationItem>(null)
  const lottieContainer = createRef<HTMLDivElement>()

  const handleAnimationLoaded = () => onLoaded()


  useEffect(() => {
    if (lottieContainer.current) {
      animRef.current = lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: data,
      })

      animRef.current.addEventListener("DOMLoaded", handleAnimationLoaded)
    }

    return () => {
      animRef.current?.removeEventListener("DOMLoaded", handleAnimationLoaded)
    }
  }, [])


  return <div ref={lottieContainer} className={className} style={style} />
}

export default LottieAnimation