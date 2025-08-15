import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  const isHomePage = document.querySelector(".page.home-page");
  if (!isHomePage) return;

  gsap.registerPlugin(ScrollTrigger);

  // grab the video instead of the image
  const heroVideo = document.querySelector(".hero-img video");
  heroVideo.play();            // just to be safe

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
