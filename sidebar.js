const burger = document.querySelector('.burger');
const sidebar = document.getElementById('sidebar');

function toggleSidebar() {
  sidebar.classList.toggle("show");
  document.body.classList.toggle("sidebar-open");
}

// اضغط بره → يقفل
window.addEventListener("click", function (e) {
  if (!sidebar.contains(e.target) && !burger.contains(e.target)) {
    sidebar.classList.remove("show");
    document.body.classList.remove("sidebar-open");
  }
});

// اضغط على لينك → يقفل
sidebar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("show");
    document.body.classList.remove("sidebar-open");
  });
});
