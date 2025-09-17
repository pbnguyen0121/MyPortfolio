import emailjs from "@emailjs/browser";

emailjs.init(import.meta.env.VITE_PUBLIC_KEY);

const form = document.getElementById("contact-form");
const toast = document.getElementById("toast");
const btnText = document.getElementById("btn-text");
const spinner = document.getElementById("loading-spinner");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  btnText.style.display = "none";
  spinner.style.display = "inline";

  const templateParams = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      templateParams
    )
    .then(() => {
      showToast("✅ Message sent successfully!", "success");
      form.reset();
    })
    .catch(() => showToast("❌ Failed to send. Please try again.", "error"))
    .finally(() => {
      btnText.style.display = "inline";
      spinner.style.display = "none";
    });
});

function showToast(msg, type) {
  toast.textContent = msg;
  toast.className = "show " + type;
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}


// Dark mode toggle
const toggleBtn = document.getElementById('toggle-theme');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? "Light Mode" : "Dark Mode";
});

// Fade-in sections on scroll
const sections = document.querySelectorAll("section");
const revealSections = () => {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(sec => {
    const boxTop = sec.getBoundingClientRect().top;
    if (boxTop < triggerBottom) sec.style.opacity = 1;
  });
};
window.addEventListener("scroll", revealSections);
revealSections();
