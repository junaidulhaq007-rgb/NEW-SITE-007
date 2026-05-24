import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Create a smooth fade-in animation
 */
export const fadeInAnimation = (element: HTMLElement, duration: number = 1) => {
  gsap.fromTo(
    element,
    { opacity: 0 },
    { opacity: 1, duration, ease: 'power2.out' }
  );
};

/**
 * Create a slide-up animation with fade
 */
export const slideUpAnimation = (element: HTMLElement, duration: number = 0.8) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration, ease: 'power2.out' }
  );
};

/**
 * Create a parallax scroll effect
 */
export const parallaxScroll = (element: HTMLElement, speed: number = 0.5) => {
  gsap.to(element, {
    y: () => window.innerHeight * speed,
    scrollTrigger: {
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      markers: false,
    },
  });
};

/**
 * Create a floating animation
 */
export const floatingAnimation = (element: HTMLElement, duration: number = 3) => {
  gsap.fromTo(
    element,
    { y: 0 },
    {
      y: -20,
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    }
  );
};

/**
 * Create a glow pulse animation
 */
export const glowPulse = (element: HTMLElement, duration: number = 2) => {
  gsap.fromTo(
    element,
    { boxShadow: '0 0 20px rgba(212, 165, 116, 0.5)' },
    {
      boxShadow: '0 0 40px rgba(212, 165, 116, 0.8)',
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    }
  );
};

/**
 * Stagger animation for multiple elements
 */
export const staggerAnimation = (
  elements: HTMLElement[],
  duration: number = 0.8,
  stagger: number = 0.1
) => {
  gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power2.out',
    }
  );
};

/**
 * Text reveal animation (character by character)
 */
export const textReveal = (element: HTMLElement, duration: number = 2) => {
  const text = element.textContent || '';
  element.textContent = '';
  
  gsap.to(element, {
    duration,
    onUpdate() {
      const progress = gsap.getProperty(element, 'progress') as number;
      const visibleChars = Math.floor(text.length * (progress || 0));
      element.textContent = text.substring(0, visibleChars);
    },
  });
};
