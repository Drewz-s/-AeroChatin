// Chat functionality
function initializeChat() {
  // Theme toggle
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeStyle = document.getElementById('theme-style');
  
  themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      themeStyle.href = 'css/dark-theme.css';
      themeToggleBtn.innerHTML = '<img src="assets/icons/sun.svg" alt="Toggle Theme" class="theme-icon">';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      themeStyle.href = 'css/styles.css';
      themeToggleBtn.innerHTML = '<img src="assets/icons/moon.svg" alt="Toggle Theme" class="theme-icon">';
      localStorage.setItem('theme', 'light');
    }
  });
  
  // Set saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    themeStyle.href = 'css/dark-theme.css';
    themeToggleBtn.innerHTML = '<img src="assets/icons/sun.svg" alt="Toggle Theme" class="theme-icon">';
  }
  
  // Load chats
  loadChats();
  
  // Send message functionality
  const messageInput = document.getElementById('message-input');
  const sendBtn = document.getElementById('send-btn');
  
  function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText) {
      addMessage(messageText, 'me');
      messageInput.value = '';
      
      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponse = generateAIResponse(messageText);
        addMessage(aiResponse, 'aerochat');
      }, 1000 + Math.random() * 2000);
    }
  }
  
  sendBtn.addEventListener('click', sendMessage);
  
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}

function loadChats() {
  const chatList = document.getElementById('chat-list');
  
  // Default chats
  const chats = [
    {
      id: 'aerochat',
      name: 'AeroChat Assistant',
      avatar: 'assets/aerochat-logo.png',
      lastMessage: 'How can I help you today?',
      time: 'Just now',
      unread: 0,
      verified: true
    },
    {
      id: 'support',
      name: 'Support Team',
      avatar: '',
      lastMessage: 'Your issue has been resolved',
      time: '2 hours ago',
      unread: 1,
      verified: true
    },
    {
      id: 'john',
      name: 'John Doe',
      avatar: '',
      lastMessage: 'See you tomorrow!',
      time: 'Yesterday',
      unread: 0,
      verified: false
    }
  ];
  
  // Clear existing chats
  chatList.innerHTML = '';
  
  // Add chats to the list
  chats.forEach(chat => {
    const chatItem = document.createElement('div');
    chatItem.className = 'chat-item';
    chatItem.dataset.chatId = chat.id;
    
    chatItem.innerHTML = `
      <img src="${chat.avatar || 'assets/icons/user.svg'}" alt="${chat.name}" class="chat-item-avatar">
      <div class="chat-item-info">
        <div class="chat-item-name">
          ${chat.name}
          ${chat.verified ? '<span class="verified-badge">✓</span>' : ''}
        </div>
        <div class="chat-item-last-message">${chat.lastMessage}</div>
      </div>
      <div class="chat-item-time">${chat.time}</div>
      ${chat.unread > 0 ? `<div class="chat-item-unread">${chat.unread}</div>` : ''}
    `;
    
    chatItem.addEventListener('click', () => {
      // Remove active class from all chats
      document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Add active class to clicked chat
      chatItem.classList.add('active');
      
      // Load chat messages
      loadChatMessages(chat.id);
      
      // Update chat header
      document.getElementById('current-chat-title').textContent = chat.name;
      document.getElementById('current-chat-avatar').src = chat.avatar || 'assets/icons/user.svg';
      document.getElementById('current-chat-status').textContent = 'Online';
    });
    
    chatList.appendChild(chatItem);
  });
  
  // Select first chat by default
  if (chats.length > 0) {
    const firstChat = document.querySelector('.chat-item');
    firstChat.classList.add('active');
    loadChatMessages(chats[0].id);
  }
}

function loadChatMessages(chatId) {
  const messagesContainer = document.getElementById('messages-container');
  
  // Clear existing messages
  messagesContainer.innerHTML = '';
  
  // Default welcome message for AeroChat Assistant
  if (chatId === 'aerochat') {
    addMessage('Hello! I\'m AeroChat Assistant. How can I help you today?', 'aerochat');
  } else if (chatId === 'support') {
    addMessage('Thank you for contacting support. How can we assist you?', 'support');
  } else {
    addMessage(`This is the beginning of your conversation with ${chatId}.`, chatId);
  }
}

function addMessage(text, sender) {
  const messagesContainer = document.getElementById('messages-container');
  const isMe = sender === 'me';
  const senderName = sender === 'aerochat' ? 'AeroChat Assistant' : 
                    sender === 'support' ? 'Support Team' : 
                    sender === 'me' ? 'Me' : sender;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isMe ? 'my-message' : 'other-message'}`;
  
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  messageDiv.innerHTML = `
    ${!isMe ? `<img src="${sender === 'aerochat' ? 'assets/aerochat-logo.png' : 'assets/icons/user.svg'}" alt="${senderName}" class="message-avatar">` : ''}
    <div class="message-content">
      <div class="message-bubble">${text}</div>
      <div class="message-info">
        <span class="message-time">${timeString}</span>
        ${isMe ? '<span class="message-status">✓✓</span>' : ''}
      </div>
    </div>
    ${isMe ? `<img src="assets/aerochat-logo.png" alt="Me" class="message-avatar">` : ''}
  `;
  
  messagesContainer.appendChild(messageDiv);
  
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello there! How can I assist you today?";
  } else if (lowerMessage.includes('how are you')) {
    return "I'm just a virtual assistant, but I'm functioning perfectly! How about you?";
  } else if (lowerMessage.includes('thank')) {
    return "You're welcome! Is there anything else I can help you with?";
  } else if (lowerMessage.includes('help')) {
    return "I can help you with various things. You can ask me about AeroChat features, settings, or just chat with me!";
  } else if (lowerMessage.includes('feature') || lowerMessage.includes('function')) {
    return "AeroChat offers many features including:\n- Real-time messaging\n- Dark/light theme\n- AI assistant (that's me!)\n- Secure communications\n- And much more!";
  } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
    return "Goodbye! Don't hesitate to come back if you have more questions.";
  } else {
    const randomResponses = [
      "That's interesting! Tell me more about it.",
      "I understand. How does that make you feel?",
      "I see. What else would you like to discuss?",
      "Thanks for sharing that with me.",
      "I'm designed to assist with various topics. Could you clarify your question?",
      "That's a great point! Have you considered other perspectives on this?",
      "I'm constantly learning. Your input helps me improve!"
    ];
    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
  }
}