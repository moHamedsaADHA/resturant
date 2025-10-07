console.log('✅ navbar.js loaded successfully');

// ====== Dark Mode Toggle (Unified) ======
function toggleDarkMode() {
  console.log('🌓 toggleDarkMode() called');
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  console.log('Current theme:', isDark ? 'DARK' : 'LIGHT');
  
  // Update toggle button icon
  const toggle = document.querySelector('.dark-mode-toggle');
  if (toggle) {
    if (isDark) {
      toggle.innerHTML = '☀️';
      toggle.style.background = '#F5DEB3';
      toggle.style.color = '#000';
    } else {
      toggle.innerHTML = '🌙';
      toggle.style.background = 'rgba(255, 193, 7, 0.9)';
      toggle.style.color = '#3b141c';
    }
    console.log('Toggle button icon updated');
  }
}

// Make it globally accessible
window.toggleDarkMode = toggleDarkMode;

// ====== Load saved theme on page load ======
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM Content Loaded');
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  console.log('💾 Saved theme from localStorage:', savedTheme);
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    const toggle = document.querySelector('.dark-mode-toggle');
    if (toggle) {
      toggle.innerHTML = '☀️';
      toggle.style.background = '#F5DEB3';
      toggle.style.color = '#000';
    }
    console.log('✅ Dark mode applied from localStorage');
  } else {
    console.log('✅ Light mode (default)');
  }
});
