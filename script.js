
// SCROLL FADE-IN ANIMATION

const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }

  });

});

hiddenElements.forEach((el) => observer.observe(el));


// ACTIVE NAVIGATION LINK

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const sectionTop = section.offsetTop;

    if(pageYOffset >= sectionTop - 200){
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach((link) => {

    link.classList.remove("active");

    if(link.getAttribute("href").includes(current)){
      link.classList.add("active");
    }

  });

});


// LOADER

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  loader.style.opacity = "0";

  setTimeout(() => {
    loader.style.display = "none";
  }, 500);

});


// SCROLL PROGRESS BAR

window.addEventListener("scroll", () => {

  const scrollTop = document.documentElement.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollPercent = (scrollTop / scrollHeight) * 100;

  document.querySelector(".scroll-progress").style.width =
    scrollPercent + "%";

});


// SMOOTH BUTTON CLICK EFFECT

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener('click', function (e) {

    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });

  });

});
// Smooth Button Animation

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {

  button.addEventListener("mouseenter", () => {
    button.style.transform = "translateY(-4px) scale(1.03)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translateY(0) scale(1)";
  });

});

// Contact Button Alert

const contactBtn = document.querySelector(".contact-btn");

contactBtn.addEventListener("click", () => {

  alert(
    "Thank you for reaching out! Joyce will contact you soon."
  );

});

