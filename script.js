/**
 * 805 HVAC Pro - Enhanced JavaScript
 * Professional, accessible, and smooth interactions
 */

(function() {
  'use strict';

  // Global variables
  let mobileMenuOpen = false;
  let scrollTimer = null;
  let resizeTimer = null;

  // DOM elements
  const elements = {
    mobileMenuToggle: null,
    mobileMenu: null,
    header: null,
    body: document.body,
    navLinks: null,
    mobileNavLinks: null
  };

  /**
   * Initialize the application
   */
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupApp);
    } else {
      setupApp();
    }
  }

  /**
   * Setup application after DOM is loaded
   */
  function setupApp() {
    cacheElements();
    setupMobileMenu();
    setupScrollEffects();
    setupFormEnhancements();
    setupAccessibility();
    setupSmoothScrolling();
    setupAnimations();
    setupEventListeners();
    
    console.log('805 HVAC Pro - Website initialized successfully');
  }

  /**
   * Cache DOM elements for better performance
   */
  function cacheElements() {
    elements.mobileMenuToggle = document.getElementById('menu-toggle');
    elements.mobileMenu = document.getElementById('mobile-menu');
    elements.header = document.querySelector('.header');
    elements.navLinks = document.querySelectorAll('.nav-link');
    elements.mobileNavLinks = document.querySelectorAll('.mobile-menu .nav-link');
  }

  /**
   * Setup mobile menu functionality
   */
  function setupMobileMenu() {
    if (!elements.mobileMenuToggle || !elements.mobileMenu) {
      console.warn('Mobile menu elements not found');
      return;
    }

    // Toggle mobile menu on button click
    elements.mobileMenuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close mobile menu when clicking on a link
    elements.mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        closeMobileMenu();
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (mobileMenuOpen && 
          !elements.mobileMenu.contains(e.target) && 
          !elements.mobileMenuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
        elements.mobileMenuToggle.focus();
      }
    });

    // Handle resize events
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth >= 768 && mobileMenuOpen) {
          closeMobileMenu();
        }
      }, 250);
    });
  }

  /**
   * Toggle mobile menu state
   */
  function toggleMobileMenu() {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  /**
   * Open mobile menu
   */
  function openMobileMenu() {
    mobileMenuOpen = true;
    elements.mobileMenu.classList.add('open');
    elements.mobileMenuToggle.classList.add('active');
    elements.mobileMenuToggle.setAttribute('aria-expanded', 'true');
    elements.body.style.overflow = 'hidden';
    
    // Focus first menu item for accessibility
    const firstMenuItem = elements.mobileMenu.querySelector('.nav-link');
    if (firstMenuItem) {
      setTimeout(() => firstMenuItem.focus(), 100);
    }

    // Track analytics if gtag is available
    if (typeof gtag === 'function') {
      gtag('event', 'mobile_menu_open', {
        event_category: 'navigation',
        event_label: 'mobile_menu'
      });
    }
  }

  /**
   * Close mobile menu
   */
  function closeMobileMenu() {
    mobileMenuOpen = false;
    elements.mobileMenu.classList.remove('open');
    elements.mobileMenuToggle.classList.remove('active');
    elements.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    elements.body.style.overflow = '';

    // Track analytics if gtag is available
    if (typeof gtag === 'function') {
      gtag('event', 'mobile_menu_close', {
        event_category: 'navigation',
        event_label: 'mobile_menu'
      });
    }
  }

  /**
   * Setup scroll effects
   */
  function setupScrollEffects() {
    let lastScrollY = window.scrollY;
    let headerHeight = elements.header ? elements.header.offsetHeight : 0;

    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function() {
        const currentScrollY = window.scrollY;
        
        // Add header background on scroll
        if (elements.header) {
          if (currentScrollY > 50) {
            elements.header.classList.add('scrolled');
          } else {
            elements.header.classList.remove('scrolled');
          }
        }

        // Track scroll depth for analytics
        trackScrollDepth();

        lastScrollY = currentScrollY;
      }, 10);
    });
  }

  /**
   * Track scroll depth for analytics
   */
  function trackScrollDepth() {
    if (typeof trackScrollDepth.marks === 'undefined') {
      trackScrollDepth.marks = [];
    }

    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    const marks = [25, 50, 75, 90];

    marks.forEach(mark => {
      if (scrollPercent >= mark && !trackScrollDepth.marks.includes(mark)) {
        trackScrollDepth.marks.push(mark);
        
        if (typeof trackScrollDepth === 'function') {
          trackScrollDepth(mark);
        }

        if (typeof gtag === 'function') {
          gtag('event', 'scroll_depth', {
            event_category: 'engagement',
            event_label: mark + '%',
            value: mark
          });
        }
      }
    });
  }

  /**
   * Setup form enhancements
   */
  function setupFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Add floating label effect
        setupFloatingLabels(input);
        
        // Add validation feedback
        setupValidationFeedback(input);
      });

      // Handle form submission
      form.addEventListener('submit', function(e) {
        if (!validateForm(form)) {
          e.preventDefault();
          return false;
        }

        // Track form submission
        if (typeof trackFormSubmit === 'function') {
          trackFormSubmit(form.getAttribute('name') || 'contact_form');
        }

        if (typeof gtag === 'function') {
          gtag('event', 'form_submit', {
            event_category: 'conversion',
            event_label: form.getAttribute('name') || 'contact_form'
          });
        }
      });
    });
  }

  /**
   * Setup floating labels for form inputs
   */
  function setupFloatingLabels(input) {
    const parent = input.parentElement;
    
    if (!parent.classList.contains('form-group')) return;

    input.addEventListener('focus', function() {
      parent.classList.add('focused');
    });

    input.addEventListener('blur', function() {
      if (!input.value.trim()) {
        parent.classList.remove('focused');
      }
    });

    // Check initial state
    if (input.value.trim()) {
      parent.classList.add('focused');
    }
  }

  /**
   * Setup validation feedback for form inputs
   */
  function setupValidationFeedback(input) {
    input.addEventListener('blur', function() {
      validateInput(input);
    });

    input.addEventListener('input', function() {
      // Clear validation state on input
      const parent = input.parentElement;
      parent.classList.remove('error', 'success');
      
      const errorMsg = parent.querySelector('.error-message');
      if (errorMsg) {
        errorMsg.remove();
      }
    });
  }

  /**
   * Validate individual input
   */
  function validateInput(input) {
    const parent = input.parentElement;
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing validation state
    parent.classList.remove('error', 'success');
    const existingError = parent.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Required field validation
    if (input.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (input.type === 'tel' && value) {
      const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    // Apply validation state
    if (!isValid) {
      parent.classList.add('error');
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = errorMessage;
      parent.appendChild(errorElement);
    } else if (value) {
      parent.classList.add('success');
    }

    return isValid;
  }

  /**
   * Validate entire form
   */
  function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * Setup accessibility enhancements
   */
  function setupAccessibility() {
    // Add skip link
    addSkipLink();
    
    // Enhance keyboard navigation
    enhanceKeyboardNavigation();
    
    // Add focus indicators
    addFocusIndicators();
    
    // Setup ARIA labels
    setupAriaLabels();
  }

  /**
   * Add skip link for accessibility
   */
  function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
      position: absolute;
      left: -9999px;
      z-index: 999999;
      padding: 8px 16px;
      background: #000;
      color: #fff;
      text-decoration: none;
      font-weight: bold;
    `;

    skipLink.addEventListener('focus', function() {
      this.style.left = '6px';
      this.style.top = '6px';
    });

    skipLink.addEventListener('blur', function() {
      this.style.left = '-9999px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  /**
   * Enhance keyboard navigation
   */
  function enhanceKeyboardNavigation() {
    // Add keyboard support for custom buttons
    const customButtons = document.querySelectorAll('[role="button"]:not(button)');
    
    customButtons.forEach(button => {
      button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    });

    // Trap focus in mobile menu when open
    if (elements.mobileMenu) {
      elements.mobileMenu.addEventListener('keydown', function(e) {
        if (!mobileMenuOpen) return;
        
        if (e.key === 'Tab') {
          trapFocus(e, elements.mobileMenu);
        }
      });
    }
  }

  /**
   * Trap focus within an element
   */
  function trapFocus(e, container) {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }

  /**
   * Add focus indicators for better accessibility
   */
  function addFocusIndicators() {
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
      element.addEventListener('focus', function() {
        this.classList.add('keyboard-focused');
      });

      element.addEventListener('blur', function() {
        this.classList.remove('keyboard-focused');
      });

      element.addEventListener('mousedown', function() {
        this.classList.add('mouse-focused');
      });

      element.addEventListener('mouseup', function() {
        this.classList.remove('mouse-focused');
      });
    });
  }

  /**
   * Setup ARIA labels for better screen reader support
   */
  function setupAriaLabels() {
    // Add aria-label to elements that need it
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      if (!link.hasAttribute('aria-label')) {
        link.setAttribute('aria-label', 'Call ' + link.textContent.trim());
      }
    });

    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
      if (!link.hasAttribute('aria-label')) {
        link.setAttribute('aria-label', 'Email ' + link.textContent.trim());
      }
    });
  }

  /**
   * Setup smooth scrolling for anchor links
   */
  function setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          const headerHeight = elements.header ? elements.header.offsetHeight : 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without jumping
          history.pushState(null, null, '#' + targetId);
          
          // Focus target for accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
        }
      });
    });
  }

  /**
   * Setup animations and transitions
   */
  function setupAnimations() {
    // Intersection Observer for fade-in animations
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animationObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe elements that should animate in
      const animateElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
      animateElements.forEach(el => {
        animationObserver.observe(el);
      });
    }

    // Parallax effect for hero sections (if reduced motion is not preferred)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setupParallaxEffect();
    }
  }

  /**
   * Setup parallax effect for hero sections
   */
  function setupParallaxEffect() {
    const heroElements = document.querySelectorAll('.hero');
    
    if (heroElements.length === 0) return;

    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      
      heroElements.forEach(hero => {
        const rect = hero.getBoundingClientRect();
        const speed = 0.5;
        
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
          const yPos = -(scrolled * speed);
          const heroImage = hero.querySelector('img');
          
          if (heroImage) {
            heroImage.style.transform = `translate3d(0, ${yPos}px, 0)`;
          }
        }
      });
      
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick);
  }

  /**
   * Setup additional event listeners
   */
  function setupEventListeners() {
    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
      if (document.hidden && mobileMenuOpen) {
        closeMobileMenu();
      }
    });

    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
      setTimeout(function() {
        if (mobileMenuOpen) {
          closeMobileMenu();
        }
      }, 100);
    });

    // Add loading states to buttons
    setupButtonLoadingStates();
  }

  /**
   * Setup loading states for buttons
   */
  function setupButtonLoadingStates() {
    const buttons = document.querySelectorAll('button[type="submit"], .btn[type="submit"]');
    
    buttons.forEach(button => {
      const form = button.closest('form');
      
      if (form) {
        form.addEventListener('submit', function() {
          button.disabled = true;
          button.classList.add('loading');
          
          const originalText = button.textContent;
          button.textContent = 'Sending...';
          
          // Reset after timeout (fallback)
          setTimeout(function() {
            button.disabled = false;
            button.classList.remove('loading');
            button.textContent = originalText;
          }, 5000);
        });
      }
    });
  }

  /**
   * Utility function to debounce function calls
   */
  function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  /**
   * Utility function to throttle function calls
   */
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Initialize the application
  init();

  // Expose useful functions to global scope if needed
  window.HVACProApp = {
    closeMobileMenu: closeMobileMenu,
    openMobileMenu: openMobileMenu,
    toggleMobileMenu: toggleMobileMenu
  };

})();
