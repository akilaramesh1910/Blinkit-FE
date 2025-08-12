import React, { useEffect, useState } from 'react'

const useMobile = (breakPoint = 768) => {
  const [isMoble, setIsMobile] = useState(window.innerWidth < breakPoint);

  const handleResize = () => {
    const checkPoint = window.innerWidth < breakPoint;
    setIsMobile(checkPoint)
  }

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('resize', handleResize)
    }
  })

  return [isMoble]
}

export default useMobile