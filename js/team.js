import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener('DOMContentLoaded', () => {
  const isTeamPage = document.querySelector(".page.team-page");
  if (!isTeamPage) return;

  // Learn More button functionality
  document.querySelectorAll('.team-profile-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const memberId = this.getAttribute('data-member-id');
      if (memberId) {
        window.location.href = `/about.html?member=${encodeURIComponent(memberId)}`;
      }
    });
  });

  // GSAP infinite loop animation (desktop only)
  if (window.innerWidth > 1000) {
    gsap.registerPlugin(ScrollTrigger);

    const teamGrid = document.querySelector(".team-grid");
    const teamCards = gsap.utils.toArray(".team-member-card");
    
    // Clone cards for seamless loop
    teamCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.classList.add('cloned');
      teamGrid.appendChild(clone);
    });

    // Re-add event listeners to cloned buttons
    document.querySelectorAll('.team-profile-btn.cloned').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const memberId = this.getAttribute('data-member-id');
        if (memberId) {
          window.location.href = `/about.html?member=${encodeURIComponent(memberId)}`;
        }
      });
    });

    const allCards = gsap.utils.toArray(".team-member-card");
    const cardWidth = 370; // width + margin
    const totalWidth = cardWidth * teamCards.length;

    // Set up infinite scroll animation
    gsap.set(teamGrid, { 
      x: 0,
      width: cardWidth * allCards.length + "px"
    });

    // Create infinite loop timeline
    const infiniteLoop = gsap.timeline({ repeat: -1 });
    
    infiniteLoop.to(teamGrid, {
      x: -totalWidth,
      duration: teamCards.length * 3, // 3 seconds per card
      ease: "none"
    });

    // Scroll-triggered speed control
    ScrollTrigger.create({
      trigger: ".team-core",
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        // Slow down when in view, speed up when out of view
        const speed = self.isActive ? 0.3 : 1;
        gsap.to(infiniteLoop, { timeScale: speed, duration: 0.5 });
      }
    });

    // Hover effects to pause/resume
    allCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(infiniteLoop, { timeScale: 0.1, duration: 0.3 });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(infiniteLoop, { timeScale: 0.3, duration: 0.3 });
      });
    });
  }
});
