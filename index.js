function toggleSidebar() {
    
  document.getElementById("sidebar").classList.toggle("show");
  
}

// حدد العناصر المهمة
const burger = document.querySelector('.burger');
const sidebar = document.getElementById('sidebar');

// لما تضغط على الزر ☰ - يتم فتح أو غلق القائمة
function toggleSidebar() {
  sidebar.classList.toggle("show");
}

// اغلاق القائمة لما تضغط في أي مكان خارج الزر أو القائمة
window.addEventListener('click', function (e) {
  if (
    !sidebar.contains(e.target) &&   // الضغط مش داخل القائمة
    !burger.contains(e.target)       // ولا على الزر ☰
  ) {
    sidebar.classList.remove("show"); // اقفل القائمة
  }
});

// (اختياري) لو عايز تقفل القائمة لما تضغط على أي رابط بداخلها
const links = sidebar.querySelectorAll('a');
links.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove("show");
  });
});

const cursor = document.getElementById('customCursor');

  document.addEventListener('mousemove', (e) => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
  });

  document.addEventListener('mousedown', () => {
    cursor.classList.add('cursor-click');
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('cursor-click');
  });

  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    // const size = Math.max(window.innerWidth, window.innerHeight);
        const size = 15;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - size/2) + 'px';
    ripple.style.top = (e.clientY - size/2) + 'px';
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
