document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const assistantToggle = document.getElementById('assistant-toggle');
  const assistantPanel = document.getElementById('assistant-panel');
  const assistantClose = document.getElementById('assistant-close');
  const assistantForm = document.getElementById('assistant-form');
  const assistantInput = document.getElementById('assistant-input');
  const assistantMessages = document.getElementById('assistant-messages');

  const applyTheme = (theme) => {
    const isLight = theme === 'light';
    document.body.classList.toggle('light-theme', isLight);
    themeIcon.textContent = isLight ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    localStorage.setItem('portfolio-theme', theme);
  };

  const savedTheme = localStorage.getItem('portfolio-theme');
  applyTheme(savedTheme || 'dark');

  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
    applyTheme(nextTheme);
  });

  const addAssistantMessage = (message, sender) => {
    const messageElement = document.createElement('div');
    messageElement.className = `assistant-message assistant-message-${sender}`;
    messageElement.textContent = message;
    assistantMessages.appendChild(messageElement);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  };

  const getAssistantReply = (question) => {
    const normalizedQuestion = question.toLowerCase();

    if (/(hire|freelance|work with|available|need a developer|build a project)/.test(normalizedQuestion)) {
      return 'To discuss a project, share the details through the contact form, email Abdirahmanosmanali28@gmail.com, or WhatsApp 0615269156.';
    }
    if (/(service|offer|do for|help with)/.test(normalizedQuestion)) {
      return 'He works on frontend and backend development, UI/UX design, REST and GraphQL API development, and database management.';
    }
    if (/(skill|stack|technolog|know|language|tool)/.test(normalizedQuestion)) {
      return 'His core stack includes React, Node.js, MongoDB, TypeScript, Python, and Figma. He also works with HTML5, CSS3, JavaScript, Express, PostgreSQL, and Git.';
    }
    if (/(e-commerce|ecommerce|online store|shopping|halden)/.test(normalizedQuestion)) {
      return 'The E-Commerce Website (Halden Home) is an online storefront built with React, React Router, Tailwind CSS, and Vite. Live demo: https://e-commerceweb-halden.netlify.app/';
    }
    if (/(dukaan|shop management|stock|sales|credit)/.test(normalizedQuestion)) {
      return 'DukaanBook is a shop management app for stock, sales, and customer credit, built with React, Tailwind CSS, and Vite. Live demo: https://dukaanbook.ileyktechnologies.com/sales';
    }
    if (/(ileyk|company website)/.test(normalizedQuestion)) {
      return 'Ileyk Technologies is a Somalia-based technology company website built with Astro. Visit it at https://ileyktechnologies.com/';
    }
    if (/(portfolio website|portfolio site)/.test(normalizedQuestion)) {
      return 'This personal portfolio is built with HTML, CSS, and JavaScript. The source code is on GitHub: https://github.com/maankajr/my-portfolio';
    }
    if (/(experience|years|background|who is|about)/.test(normalizedQuestion)) {
      return 'Abdirahman Osman Ali is a Full Stack Developer based in Mogadishu, Somalia, with 2+ years of experience, 15+ projects, and 10+ happy clients.';
    }
    if (/(project|portfolio|built|work)/.test(normalizedQuestion)) {
      return 'Featured work includes an E-Commerce Website (Halden Home), DukaanBook, the Ileyk Technologies website, and this Personal Portfolio. Ask about a specific project to hear its technologies and purpose.';
    }
    if (/(contact|email|phone|whatsapp|linkedin|github|reach)/.test(normalizedQuestion)) {
      return 'You can email Abdirahmanosmanali28@gmail.com, call or WhatsApp 0615269156, connect on LinkedIn at abdirahman-osman-ali-6918a628a, or find him on GitHub as maankajr.';
    }
    return 'Try asking about Abdirahman’s skills, experience, services, projects, or contact details. You can also reach him at Abdirahmanosmanali28@gmail.com or through the contact form.';
  };

  const askAssistant = (question) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;
    addAssistantMessage(trimmedQuestion, 'user');
    addAssistantMessage(getAssistantReply(trimmedQuestion), 'bot');
  };

  const setAssistantOpen = (isOpen) => {
    assistantPanel.hidden = !isOpen;
    assistantToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) assistantInput.focus();
  };

  assistantToggle.addEventListener('click', () => {
    setAssistantOpen(assistantPanel.hidden);
  });
  assistantClose.addEventListener('click', () => setAssistantOpen(false));
  assistantForm.addEventListener('submit', (event) => {
    event.preventDefault();
    askAssistant(assistantInput.value);
    assistantInput.value = '';
  });
  document.querySelectorAll('.assistant-prompts button').forEach((prompt) => {
    prompt.addEventListener('click', () => askAssistant(prompt.dataset.question));
  });

  /* ---------- Contact form ---------- */
  const CONTACT_EMAIL = 'Abdirahmanosmanali28@gmail.com';
  const MESSAGE_MAX = 500;
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const submitButton = form.querySelector('button[type="submit"]');
  const messageField = form.elements.message;
  const counter = document.getElementById('cf-message-counter');

  const fieldRules = {
    name: (value) => (value ? '' : 'Please enter your full name.'),
    email: (value) => {
      if (!value) return 'Please enter your email address.';
      return EMAIL_PATTERN.test(value) ? '' : 'Please enter a valid email address, e.g. you@example.com.';
    },
    subject: (value) => (value ? '' : 'Please enter a subject.'),
    message: (value) => {
      if (!value) return 'Please write a message.';
      if (value.length > MESSAGE_MAX) return `Your message is too long. Please keep it within ${MESSAGE_MAX} characters.`;
      return '';
    },
  };

  const setFieldError = (field, message) => {
    const errorElement = document.getElementById(`${field.id}-error`);
    field.classList.toggle('is-invalid', Boolean(message));
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (errorElement) errorElement.textContent = message;
  };

  const validateField = (field) => {
    const message = fieldRules[field.name](field.value.trim());
    setFieldError(field, message);
    return !message;
  };

  const showStatus = (type, html) => {
    status.className = `form-status ${type}`;
    status.innerHTML = html;
    status.hidden = false;
  };

  const updateCounter = () => {
    const length = messageField.value.length;
    counter.textContent = `${length}/${MESSAGE_MAX}`;
    counter.classList.toggle('is-near', length >= MESSAGE_MAX * 0.9 && length < MESSAGE_MAX);
    counter.classList.toggle('is-limit', length >= MESSAGE_MAX);
  };

  messageField.addEventListener('input', updateCounter);
  updateCounter();

  Object.keys(fieldRules).forEach((name) => {
    const field = form.elements[name];
    // Validate when the user leaves a field, then re-check live while they fix it.
    field.addEventListener('blur', () => {
      if (field.value.trim() || field.classList.contains('is-invalid')) validateField(field);
    });
    field.addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) validateField(field);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = Object.keys(fieldRules).map((name) => form.elements[name]);
    const invalidFields = fields.filter((field) => !validateField(field));

    if (invalidFields.length) {
      showStatus('error', 'Please correct the highlighted fields and try again.');
      invalidFields[0].focus();
      return;
    }

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const subject = form.elements.subject.value.trim();
    const message = messageField.value.trim();

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    submitButton.disabled = true;
    showStatus('success', 'Opening your email app&hellip;');
    window.location.href = mailto;

    setTimeout(() => {
      showStatus(
        'success',
        `Thank you! Your message is ready in your email app &mdash; just press <strong>Send</strong>. If nothing opened, please email me directly at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`
      );
      form.reset();
      fields.forEach((field) => setFieldError(field, ''));
      updateCounter();
      submitButton.disabled = false;
    }, 1200);
  });
});
