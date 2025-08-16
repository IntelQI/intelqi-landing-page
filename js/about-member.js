async function loadMemberProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const memberId = urlParams.get('member');
  
  if (!memberId) {
    document.getElementById('member-name').textContent = 'Team Member';
    document.getElementById('member-bio').textContent = 'Please select a team member from the team page.';
    return;
  }
  
  try {
    const response = await fetch('/team-data.json');
    const data = await response.json();
    const member = data.teamMembers.find(m => m.id === memberId);
    
    if (!member) {
      document.getElementById('member-name').textContent = 'Member Not Found';
      document.getElementById('member-bio').textContent = 'The requested team member profile does not exist.';
      return;
    }

    // Update page title
    document.getElementById('page-title').textContent = `About | ${member.fullName} | IntelQI Studios`;
    
    // Update hero section
    document.getElementById('member-name').textContent = member.fullName;
    document.getElementById('member-bio').textContent = member.heroBio;
    document.getElementById('member-role').textContent = member.role;
    document.getElementById('member-portrait').src = member.portrait;
    document.getElementById('member-portrait').alt = `${member.fullName} portrait`;

    // Update description
    document.getElementById('member-description').textContent = member.shortBio;

    // Update tags
    const tags = member.tags || [];
    for (let i = 1; i <= 5; i++) {
      const tagElement = document.getElementById(`tag-${i}`);
      if (tagElement) {
        if (tags[i-1]) {
          tagElement.querySelector('p').textContent = tags[i-1];
          tagElement.style.display = 'block';
        } else {
          tagElement.style.display = 'none';
        }
      }
    }

    // Update skills
    const skillsList = document.getElementById('skills-list');
    if (skillsList && member.skills) {
      skillsList.innerHTML = '';
      member.skills.forEach((skill, idx) => {
        const skillNumber = (idx + 1).toString().padStart(2, '0');
        skillsList.innerHTML += `<p class="mn">${skillNumber}........................${skill}</p>`;
      });
    }

    // Update stats
    if (member.stats && member.stats.length >= 3) {
      document.getElementById('stat-1-value').textContent = member.stats[0].value;
      document.getElementById('stat-1-title').textContent = member.stats.title;
      document.getElementById('stat-2-value').textContent = member.stats[1].value;
      document.getElementById('stat-2-title').textContent = member.stats[1].title;
      document.getElementById('stat-3-value').textContent = member.stats[2].value;
      document.getElementById('stat-3-title').textContent = member.stats[2].title;
    }

    // Trigger ScrollTrigger refresh after content is loaded
    // This ensures GSAP animations work with the new content
    setTimeout(() => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    }, 100);

  } catch (error) {
    console.error('Error loading member profile:', error);
    document.getElementById('member-name').textContent = 'Error Loading Profile';
    document.getElementById('member-bio').textContent = 'Sorry, there was an error loading the member profile. Please try again later.';
  }
}

// Load member profile when page loads
document.addEventListener('DOMContentLoaded', loadMemberProfile);
