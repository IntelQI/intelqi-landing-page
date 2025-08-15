import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  const isHomePage = document.querySelector(".page.home-page");
  if (!isHomePage) return;

  gsap.registerPlugin(ScrollTrigger);

  // grab the video instead of the image
  const heroVideo = document.querySelector(".hero-img video");
  
  // Video loading error handling
  if (heroVideo) {
    heroVideo.addEventListener('error', (e) => {
      console.error('Video loading error:', e);
      // Fallback: hide video and show fallback image
      const fallback = document.querySelector('.video-fallback');
      if (fallback) {
        fallback.style.display = 'block';
        heroVideo.style.display = 'none';
      }
    });

    heroVideo.addEventListener('loadeddata', () => {
      console.log('Video loaded successfully');
      heroVideo.play().catch(err => {
        console.warn('Autoplay prevented:', err);
        // Fallback for autoplay restrictions
        heroVideo.muted = true;
        heroVideo.play();
      });
    });

    // Attempt to play video
    heroVideo.play().catch(err => {
      console.warn('Initial play failed:', err);
    });
  }

  let scrollTriggerInstance = null;

  const initAnimations = () => {
    if (scrollTriggerInstance) scrollTriggerInstance.kill();

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: ".hero-img-holder",
      start: "top bottom",
      end: "top top",
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(".hero-img", {
          y: `${-110 + 110 * p}%`,
          scale: 0.25 + 0.75 * p,
          rotation: -15 + 15 * p,
        });
      },
    });
  };

  initAnimations();
  window.addEventListener("resize", initAnimations);
});
