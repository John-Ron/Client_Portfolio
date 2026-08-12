/* ==========================================================
   JOYCE NAZARENO | CPA PORTFOLIO - Interactions & Animation
========================================================== */

// LOADER
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden-loader');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 800);
  }, 300);
});

// SCROLL REVEAL + STAGGERED ANIMATION
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const section = entry.target;
      section.classList.add('show');

      // Assign stagger order to grid items inside this section
      const staggerItems = section.querySelectorAll(
        '.service-card, .tool-card, .timeline-item, .trust-list li'
      );
      staggerItems.forEach((el, i) => el.style.setProperty('--i', i));

      revealObserver.unobserve(section);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.hidden').forEach((el) => revealObserver.observe(el));

// ACTIVE NAVIGATION LINK
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 220) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// SCROLL PROGRESS BAR
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
});

// MOBILE MENU TOGGLE
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-links');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
}

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });

  // ===== 3D ACCOUNTING BACKGROUND =====
  (function() {
    var canvas = document.getElementById('bg3d');
    if (!canvas || !window.THREE) return;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 60;

    var isMobile = window.innerWidth < 768;

    // Accounting symbol sprite
    function makeSymbol(text, color, size) {
      var c = document.createElement('canvas');
      c.width = 128; c.height = 128;
      var ctx = c.getContext('2d');
      ctx.font = '700 78px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color;
      ctx.fillText(text, 64, 68);
      var tex = new THREE.CanvasTexture(c);
      var mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.5, depthWrite: false });
      var spr = new THREE.Sprite(mat);
      spr.scale.set(size, size, 1);
      return spr;
    }

    // ===== FLOATING NOTEBOOKS (closed) =====
    function makeBook(w, d, color) {
      var g = new THREE.Group();
      var cover = new THREE.Mesh(
        new THREE.BoxGeometry(w, 0.35, d),
        new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.92 })
      );
      var pages = new THREE.Mesh(
        new THREE.BoxGeometry(w * 0.9, 0.22, d * 0.92),
        new THREE.MeshBasicMaterial({ color: 0xfaf6f4 })
      );
      pages.position.y = 0.28;
      var spine = new THREE.Mesh(
        new THREE.BoxGeometry(w, 0.38, 0.12),
        new THREE.MeshBasicMaterial({ color: 0x14213d, transparent: true, opacity: 0.85 })
      );
      spine.position.z = -d / 2;
      g.add(cover); g.add(pages); g.add(spine);
      return g;
    }

    // ===== OPEN LEDGER / NOTEBOOK =====
    function makeOpenBook(w, color) {
      var g = new THREE.Group();
      var pageMat = new THREE.MeshBasicMaterial({ color: 0xfdfafa });
      var coverMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.92 });
      var halfW = w / 2;
      var lp = new THREE.Mesh(new THREE.BoxGeometry(halfW, 0.05, w * 0.72), pageMat);
      lp.position.x = -halfW / 2; lp.rotation.z = 0.16;
      var lc = new THREE.Mesh(new THREE.BoxGeometry(halfW * 1.05, 0.09, w * 0.8), coverMat);
      lc.position.x = -halfW / 2; lc.position.y = -0.07; lc.rotation.z = 0.16;
      var rp = new THREE.Mesh(new THREE.BoxGeometry(halfW, 0.05, w * 0.72), pageMat);
      rp.position.x = halfW / 2; rp.rotation.z = -0.16;
      var rc = new THREE.Mesh(new THREE.BoxGeometry(halfW * 1.05, 0.09, w * 0.8), coverMat);
      rc.position.x = halfW / 2; rc.position.y = -0.07; rc.rotation.z = -0.16;
      g.add(lp); g.add(lc); g.add(rp); g.add(rc);
      return g;
    }

    // ===== COIN (barya) =====
    function makeCoin(color, opacity) {
      var geo = new THREE.CylinderGeometry(1.7, 1.7, 0.32, 28);
      var mat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: opacity });
      return new THREE.Mesh(geo, mat);
    }

    var bookColors = [0xb86b84, 0xe8a9bf, 0x14213d, 0x8f5a8f, 0xd4af7a, 0xc78ea8];
    var coinColors = [0xd4af7a, 0xe8a9bf, 0xc78ea8, 0xb86b84];

    // Closed notebooks
    var books = [];
    var bookCount = isMobile ? 7 : 12;
    for (var i = 0; i < bookCount; i++) {
      var w = 5 + Math.random() * 6;
      var d = w * (1.3 + Math.random() * 0.4);
      var b = makeBook(w, d, bookColors[i % bookColors.length]);
      b.position.set((Math.random() - 0.5) * 180, (Math.random() - 0.5) * 115, (Math.random() - 0.5) * 70);
      b.rotation.set(Math.random() * 0.4 - 0.2, Math.random() * Math.PI * 2, Math.random() * 0.4 - 0.2);
      b.userData.baseY = b.position.y;
      b.userData.speed = 0.4 + Math.random() * 0.8;
      books.push(b);
      scene.add(b);
    }

    // Open ledgers
    var openBooks = [];
    var openCount = isMobile ? 1 : 2;
    for (var i = 0; i < openCount; i++) {
      var ob = makeOpenBook(9, bookColors[(i + 2) % bookColors.length]);
      ob.position.set(i === 0 ? -46 : 48, i === 0 ? -20 : 24, -18);
      ob.rotation.y = i === 0 ? 0.6 : -0.5;
      ob.userData.baseY = ob.position.y;
      openBooks.push(ob);
      scene.add(ob);
    }

    // Coins
    var coins = [];
    var coinCount = isMobile ? 6 : 10;
    for (var i = 0; i < coinCount; i++) {
      var c = makeCoin(coinColors[i % coinColors.length], 0.5);
      c.position.set((Math.random() - 0.5) * 150, (Math.random() - 0.5) * 90, (Math.random() - 0.5) * 50);
      c.userData.baseY = c.position.y;
      coins.push(c);
      scene.add(c);
    }

    // Few accounting symbols
    var symbolGroup = new THREE.Group();
    var symbolCount = isMobile ? 4 : 8;
    for (var i = 0; i < symbolCount; i++) {
      var spr = makeSymbol(i % 2 === 0 ? '\u20B1' : '+', '#b86b84', 4 + Math.random() * 3);
      spr.position.set((Math.random() - 0.5) * 170, (Math.random() - 0.5) * 110, (Math.random() - 0.5) * 100);
      symbolGroup.add(spr);
    }
    scene.add(symbolGroup);

    // Sparkle particle field
    var count = isMobile ? 500 : 1000;
    var pos = new Float32Array(count * 3);
    var col = new Float32Array(count * 3);
    var pcolors = [new THREE.Color(0xb86b84), new THREE.Color(0x14213d), new THREE.Color(0xe8a9bf), new THREE.Color(0x8f5a8f)];
    for (var i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 220;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 140;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 220;
      var c = pcolors[Math.floor(Math.random() * pcolors.length)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    var pMat = new THREE.PointsMaterial({ size: isMobile ? 0.28 : 0.32, vertexColors: true, transparent: true, opacity: 0.8, depthWrite: false });
    var points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    function animate() {
      requestAnimationFrame(animate);
      var t = Date.now() * 0.0001;
      books.forEach(function(b, idx) {
        b.rotation.y += 0.0012;
        b.rotation.z += 0.0002;
        b.position.y = b.userData.baseY + Math.sin(t * b.userData.speed + idx) * 1.6;
      });
      openBooks.forEach(function(ob, idx) {
        ob.rotation.y += 0.0008;
        ob.position.y = ob.userData.baseY + Math.sin(t * 0.6 + idx * 2) * 1.2;
      });
      coins.forEach(function(c, idx) {
        c.rotation.x += 0.015;
        c.position.y = c.userData.baseY + Math.sin(t * 0.8 + idx) * 1.2;
      });
      symbolGroup.rotation.y += 0.001;
      points.rotation.y += 0.0005;
      points.rotation.x += 0.0002;
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  })();

});
