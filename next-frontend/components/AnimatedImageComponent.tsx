'use client'

import React, { useState, useEffect } from 'react'

const images = [
   '/static/images/animation/head_anm_1.png',
   '/static/images/animation/head_anm_2.png',
   '/static/images/animation/head_anm_3.png',
   '/static/images/animation/head_anm_4.png',
]

const AnimatedImageComponent: React.FC<{ triggerChange: boolean }> = ({ triggerChange }) => {
   const [currentImage, setCurrentImage] = useState(images[0])
   const [secondaryAnimation, setSecondaryAnimation] = useState(false)

   useEffect(() => {
      if (triggerChange) {
         let changeCount = 0

         const changeImage = () => {
            if (changeCount % 2 === 0) {
               setCurrentImage(images[0])
            } else {
               const randomIndex = Math.random() < 0.8 ? Math.floor(Math.random() * 2) + 1 : 2
               setCurrentImage(images[randomIndex])
            }
            changeCount++
            if (changeCount >= 11) {
               clearInterval(intervalId)
               setCurrentImage(images[0])
               setSecondaryAnimation(true)
            }
         }

         const intervalId = setInterval(changeImage, 100)
         setSecondaryAnimation(false)

         return () => clearInterval(intervalId)
      }
   }, [triggerChange])

   useEffect(() => {
      const toggleSecondaryImage = () => {
         setCurrentImage((prevImage) => (prevImage === images[0] ? images[3] : images[0]))
      }

      if (secondaryAnimation) {
         const intervalId = setInterval(toggleSecondaryImage, 200)

         const timeoutId = setTimeout(() => {
            clearInterval(intervalId)
            setCurrentImage(images[0])
            setSecondaryAnimation(false)
         }, 1000)

         return () => {
            clearInterval(intervalId)
            clearTimeout(timeoutId)
         }
      }
   }, [secondaryAnimation])

   useEffect(() => {
      if (!triggerChange) {
         const secondaryIntervalId = setInterval(() => {
            setSecondaryAnimation(true)
         }, 5000)

         return () => clearInterval(secondaryIntervalId)
      }
   }, [triggerChange])

   return (
      <div className="animated-image">
         <img src={currentImage} alt="Animated Head" className="w-32 h-32" />
      </div>
   )
}

export default AnimatedImageComponent
