/*
 * script.js
 *
 * This file contains all interactive behaviours for the Ecobber web
 * page. It handles the mobile navigation toggle, tab switching for
 * product categories, smooth scrolling, fade‑in animations on scroll
 * and a simple contact form submission handler. No external
 * dependencies are required.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    // Close the mobile menu when a navigation link is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // Tab functionality for products
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;
      if (!targetId) return;

      // Update active button
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Show the corresponding tab content
      tabContents.forEach((content) => {
        if (content.id === targetId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // Intersection observer for fade‑in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(
      '.card, .business-card, .sustainability-card'
    )
    .forEach((el) => observer.observe(el));

  // Hide/show navbar on scroll down/up
  let lastScrollY = window.pageYOffset;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;
    if (currentScrollY <= 0) {
      navbar.classList.remove('scroll-up', 'scroll-down');
    } else if (currentScrollY > lastScrollY && !navbar.classList.contains('scroll-down')) {
      navbar.classList.remove('scroll-up');
      navbar.classList.add('scroll-down');
    } else if (currentScrollY < lastScrollY && navbar.classList.contains('scroll-down')) {
      navbar.classList.remove('scroll-down');
      navbar.classList.add('scroll-up');
    }
    lastScrollY = currentScrollY;
  });

  // Contact form handler
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Provide simple feedback to the user without refreshing the page
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
});