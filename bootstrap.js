if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

let percent = 0;
let text = document.getElementById("percent");
let bar = document.getElementById("barFill");
let loader = document.getElementById("loader");

let load = setInterval(() => {
  percent++;
  text.innerText = percent + "%";
  bar.style.width = percent + "%";

  if (percent >= 100) {
    clearInterval(load);

    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.transition = "0.5s ease";

      setTimeout(() => {
        loader.style.display = "none";
      }, 500);

    }, 300);
  }
}, 15);



const indicator = document.getElementById("indicator");
const navList = document.getElementById("navList");
const links = document.querySelectorAll(".nav-link");

function move(el) {
  const rect = el.getBoundingClientRect();
  const parent = navList.getBoundingClientRect();

  indicator.style.width = rect.width + "px";
  indicator.style.left = (rect.left - parent.left) + "px";
}

links.forEach(l => {
  l.addEventListener("mouseenter", () => move(l));
});

navList.addEventListener("mouseleave", () => {
  indicator.style.width = "0px";
});


window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 120;

  links.forEach(link => {
    let sec = document.querySelector(link.getAttribute("href"));

    if (sec && sec.offsetTop <= fromTop &&
        sec.offsetTop + sec.offsetHeight > fromTop) {
      move(link);
    }
  });
});






document.addEventListener("DOMContentLoaded", () => {
  const about = document.querySelector(".about-section");

  if (!about) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.25
  });

  observer.observe(about);

});
document.addEventListener("DOMContentLoaded", function () {


  emailjs.init("ly_0E1WEvdkvAxJed");

  const form = document.getElementById("contact-form");
  const status = document.getElementById("status");

  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const params = {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };

    status.innerText = "Sending...";

emailjs.send("service_1i797y5", "template_weotegh", params)      .then(function(response) {
        status.innerText = "✅ Message sent successfully!";
        form.reset();
        console.log("SUCCESS!", response);
      })
      .catch(function(error) {
        status.innerText = "❌ Failed to send message!";
        console.error("FAILED...", error);
      });
  });

});





document.addEventListener("DOMContentLoaded", () => {
  const projects = document.querySelector(".projects-section");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  observer.observe(projects);
});



const canvas = document.getElementById("particles");

if (canvas) {

  const ctx = canvas.getContext("2d");

  let particlesArray = [];

  let mouse = {
    x: null,
    y: null,
    radius: 120
  };

  function resizeCanvas() {
    const scale = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
    ctx.scale(scale, scale);
  }

  resizeCanvas();

  window.addEventListener("resize", () => {
    resizeCanvas();
    init(); 
  });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.size = Math.random() * 2.5;

      this.baseX = this.x;
      this.baseY = this.y;

      this.density = (Math.random() * 30) + 1;
    }

    draw() {
      ctx.fillStyle = "rgba(0, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        let force = (mouse.radius - distance) / mouse.radius;

        this.x -= forceDirectionX * force * this.density;
        this.y -= forceDirectionY * force * this.density;

      } else {
        this.x += (this.baseX - this.x) * 0.05;
        this.y += (this.baseY - this.y) * 0.05;
      }

      this.draw();
    }
  }

  function init() {
    particlesArray = [];

    let count = window.innerWidth < 768 ? 50 : 90; // fewer on mobile

    for (let i = 0; i < count; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(p => p.update());

    requestAnimationFrame(animate);
  }

  init();
  animate();}