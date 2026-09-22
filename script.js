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
      return 'Abdirahman is available for freelance work. Share your project through the contact form, email Abdirahmanosmanali28@gmail.com, or WhatsApp 0615269156, and I can help summarize your request.';
    }
    if (/(service|offer|do for|help with)/.test(normalizedQuestion)) {
      return 'He offers frontend and backend development, UI/UX design, REST and GraphQL API development, database management, and DevOps and deployment.';
    }
    if (/(skill|stack|technolog|know|language|tool)/.test(normalizedQuestion)) {
      return 'His core stack includes React, Node.js, MongoDB, TypeScript, Python, and Figma. He also works with HTML5, CSS3, JavaScript, Express, PostgreSQL, Docker, Git, AWS, Vercel, and Netlify.';
    }
    if (/(experience|years|background|who is|about)/.test(normalizedQuestion)) {
      return 'Abdirahman Osman Ali is a Full Stack Developer based in Mogadishu, Somalia, with 2+ years of experience, 15+ projects, and 10+ happy clients.';
    }
    if (/(e-commerce|ecommerce|online store|shopping)/.test(normalizedQuestion)) {
      return 'The E-Commerce Website is built with React, Node.js, MongoDB, and Stripe. It is one of Abdirahman’s featured projects; contact him directly for deeper project details.';
    }
    if (/(analytics|dashboard|reporting)/.test(normalizedQuestion)) {
      return 'The Analytics Dashboard uses React, TypeScript, PostgreSQL, and D3.js. It is a featured project; contact Abdirahman directly for details beyond the portfolio summary.';
    }
    if (/(task management|task app|productivity)/.test(normalizedQuestion)) {
      return 'The Task Management App uses Vue.js, Express, MongoDB, and Socket.io. It is a featured collaborative productivity project; contact Abdirahman for more details.';
    }
    if (/(portfolio website|portfolio site)/.test(normalizedQuestion)) {
      return 'The Portfolio Website uses HTML, CSS, and JavaScript. It showcases Abdirahman’s work and frontend skills; contact him directly for anything beyond this summary.';
    }
    if (/(project|portfolio|built|work)/.test(normalizedQuestion)) {
      return 'Featured work includes an E-Commerce Website, Portfolio Website, Analytics Dashboard, and Task Management App. Ask about a specific project to hear its technologies and purpose.';
    }
    if (/(contact|email|phone|whatsapp|linkedin|github|reach)/.test(normalizedQuestion)) {
      return 'You can email Abdirahmanosmanali28@gmail.com, call or WhatsApp 0615269156, connect on LinkedIn at abdirahman-osman-ali-6918a628a, or find him on GitHub as maankajr.';
    }
    return 'That is outside what I can answer as Abdirahman’s portfolio assistant. I can help with his skills, experience, services, projects, or contact details; for anything else, please email Abdirahmanosmanali28@gmail.com or use the contact form.';
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

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const subject = form.elements.subject.value.trim();
    const message = form.elements.message.value.trim();

    if (!name || !email || !subject || !message) {
      status.textContent = 'Please fill in all fields before sending.';
      return;
    }

    const mailto = `mailto:Abdirahmanosmanali28@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    status.textContent = 'Opening your email app...';
    window.location.href = mailto;

    setTimeout(() => {
      status.textContent = 'Your message is ready to send. Thank you!';
      form.reset();
    }, 1200);
  });
});
