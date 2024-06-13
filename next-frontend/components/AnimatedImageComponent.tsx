'use client'

import React, { useState, useEffect, useRef } from 'react';

const images = [
   '/static/images/animation/head_anm_1.png',
   '/static/images/animation/head_anm_2.png',
   '/static/images/animation/head_anm_3.png',
   '/static/images/animation/head_anm_4.png',
];

const AnimatedImageComponent: React.FC<{ triggerChange: boolean }> = ({ triggerChange }) => {
   const [currentImage, setCurrentImage] = useState(images[0]);
   const [secondaryAnimation, setSecondaryAnimation] = useState(false);
   const requestRef = useRef<number | null>(null);
   const changeCountRef = useRef(0);
   const startTimeRef = useRef(0);

   const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      if (elapsed > 100) {
         if (changeCountRef.current < 11) {
            if (changeCountRef.current % 2 === 0) {
               setCurrentImage(images[0]);
            } else {
               const randomIndex = Math.random() < 0.8 ? Math.floor(Math.random() * 2) + 1 : 2;
               setCurrentImage(images[randomIndex]);
            }
            changeCountRef.current++;
            startTimeRef.current = timestamp;
            requestRef.current = requestAnimationFrame(animate);
         } else {
            setCurrentImage(images[0]);
            setSecondaryAnimation(true);
            cancelAnimationFrame(requestRef.current!);
         }
      } else {
         requestRef.current = requestAnimationFrame(animate);
      }
   };

   useEffect(() => {
      if (triggerChange) {
         changeCountRef.current = 0;
         startTimeRef.current = 0;
         requestRef.current = requestAnimationFrame(animate);
      }
      return () => cancelAnimationFrame(requestRef.current!);
   }, [triggerChange]);

   useEffect(() => {
      if (secondaryAnimation) {
         const toggleSecondaryImage = () => {
            setCurrentImage((prevImage) => (prevImage === images[0] ? images[3] : images[0]));
         };

         const intervalId = setInterval(toggleSecondaryImage, 200);
         const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            setCurrentImage(images[0]);
            setSecondaryAnimation(false);
         }, 1000);

         return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
         };
      }
   }, [secondaryAnimation]);

   useEffect(() => {
      if (!triggerChange) {
         const secondaryIntervalId = setInterval(() => {
            setSecondaryAnimation(true);
         }, 5000);

         return () => clearInterval(secondaryIntervalId);
      }
   }, [triggerChange]);

   return (
      <div className="animated-image">
         <img src={currentImage} alt="Animated Head" className="w-32 h-32" />
      </div>
   );
};

export default AnimatedImageComponent;
