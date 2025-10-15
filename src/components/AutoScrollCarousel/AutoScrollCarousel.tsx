'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './AutoScrollCarousel.module.css';

interface CarouselImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

interface AutoScrollCarouselProps {
  images: CarouselImage[];
  autoScrollInterval?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export default function AutoScrollCarousel({
  images,
  autoScrollInterval = 4000,
  pauseOnHover = true,
  className = '',
}: AutoScrollCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [isPaused, images.length, autoScrollInterval]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollAmount = currentIndex * (container.clientWidth / images.length);
    
    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }, [currentIndex, images.length]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setTimeout(() => setIsPaused(false), 1000);
    }
  };

  return (
    <div 
      className={`${styles.carousel} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="carousel"
    >
      <div 
        ref={containerRef}
        className={styles.scrollContainer}
        role="region"
        aria-label="Image carousel"
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className={styles.imageWrapper}
            data-carousel-index={index}
            data-active={currentIndex === index}
          >
            <img 
              src={image.url} 
              alt={image.alt}
              className={styles.image}
              style={{
                width: image.width ? `${image.width}px` : 'auto',
                height: image.height ? `${image.height}px` : 'auto',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
