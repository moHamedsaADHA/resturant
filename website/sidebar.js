// Toggle sidebar on burger click
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // منع التحميل التلقائي
    const username = document.getElementById("username").value.trim();
    if (username) {
      localStorage.setItem("userName", username);
      window.location.href = "dashboard.html";
    }
  });
   // Close sidebar when clicking outside
   document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault(); // Stop form reload
      const username = document.getElementById("username").value.trim();
      if (username) {
        localStorage.setItem("userName", username);
        window.location.href = "dashboard.html";
      }
    });
// Close sidebar when clicking outside
document.addEventListener("click", function (e) {
  const sidebar = document.getElementById("sidebar");
  const burger = document.querySelector(".burger");

  if (
    !sidebar.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    sidebar.classList.remove("active");
  }
});

// تحسين مظهر العناصر الجانبية لو حبيت تضيف مستقبلاً أنميشن أو scroll
window.addEventListener("resize", () => {
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth > 768) {
    sidebar.classList.remove("active");
  }
});
