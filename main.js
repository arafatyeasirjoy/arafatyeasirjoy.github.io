// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

// Add placeholder video until user uploads their own
document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('background-video');
  
  // Set a placeholder video URL (replace with your actual video)
  if (!video.querySelector('source').src) {
    video.querySelector('source').src = 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4';
    video.load();
  }
  
  // Initialize the page
  initializeNavigation();
  handleScroll();
  initTypeWriter();
});

// Navigation functionality
function initializeNavigation() {
  // Toggle mobile menu
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    });
  });
}

// Handle scroll events
window.addEventListener('scroll', handleScroll);

function handleScroll() {
  // Header styling on scroll
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Active navigation based on scroll position
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Add more projects dynamically (you can customize this with your actual projects)
function addMoreProjects() {
  const projectsContainer = document.getElementById('more-projects');
  
  // Sample project data - replace with your actual projects
  const projects = [
    {
      title: 'Video Editing Showcase',
      description: 'A dynamic commercial video edited for a client\'s product launch campaign.',
      embedUrl: 'https://drive.google.com/file/d/16CqbvK2iNijVHF9T6Th6ffj8sg7L2q7n/preview',
      linkUrl: 'https://drive.google.com/file/d/16CqbvK2iNijVHF9T6Th6ffj8sg7L2q7n/view?usp=sharing'
    },
    {
      title: 'Video Editing Showcase',
      description: 'Engaging social media video content created for brand awareness.',
      embedUrl: 'https://drive.google.com/file/d/1GUk-dTGUtn-gi5cv2fqW6g95gHU_Z736/preview',
      linkUrl: 'https://drive.google.com/file/d/1GUk-dTGUtn-gi5cv2fqW6g95gHU_Z736/view?usp=sharing'
    }
  ];
  
  // Create project elements
  projects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.className = 'project-item';
    
    projectElement.innerHTML = `
      <div class="project-preview">
        <iframe src="${project.embedUrl}" allowfullscreen></iframe>
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.linkUrl}" target="_blank" class="view-project">View Full Project</a>
      </div>
    `;
    
    projectsContainer.appendChild(projectElement);
  });
}

// Call the function to add more projects
addMoreProjects();

// Animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.project-item, .tool, .contact-item');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.project-item, .tool, .contact-item');
  
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Typing Animation
function initTypeWriter() {
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");
  
  const textArray = ["Video Editor", "Motion Graphics Designer", "Visual Storyteller"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;
  
  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }
  
  function erase() {
    if (charIndex > 0) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if(textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }
  // Start typing immediately
  if(textArray.length) setTimeout(type, newTextDelay + 250);
}