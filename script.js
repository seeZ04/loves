window.onload = function () {
  document.body.classList.remove("container");
  init();
  setTimeout(() => {
    document.body.classList.remove("not-loaded");
    const nightElement = document.querySelector(".night");
    const titleElement = document.getElementById("title_text");
    if (!titleElement || !nightElement) {
      console.error("Không tìm thấy '.night' hoặc '#title_text'.");
      return;
    }
    const texts = ["hello","world"];
    let index = 0;
    function getRandomPosition() {
      const paddingAuto = 0.05;
      const paddingRight = 0.4;
      const paddingbottom = 0.1; 
      const nightRect = nightElement.getBoundingClientRect();

      const maxWidth = nightRect.width * (1 - paddingRight); // Chỉ giới hạn right
      const maxHeight = nightRect.height * (1 - paddingbottom); // Chỉ giới hạn bottom

      const randomX = Math.floor(Math.random() * maxWidth * (1 - paddingAuto)); // Không cần padding cho left
      const randomY = Math.floor(Math.random() * maxHeight * (1 - paddingAuto)); // Không cần padding cho top

      return { x: randomX, y: randomY };
    }


    function showLetters(text, letterIndex = 0) {
      if (letterIndex === 0) {
        const { x, y } = getRandomPosition();
        titleElement.style.transform = `translate(${x}px, ${y}px)`;
      }

      if (letterIndex < text.length) {
        titleElement.innerHTML += text[letterIndex]; 
        setTimeout(() => showLetters(text, letterIndex + 1), 250); // Hiệu ứng xuất hiện từng chữ cái
      } else {
        setTimeout(() => {
          titleElement.style.opacity = "0"; 
          setTimeout(() => {
            titleElement.innerHTML = ""; 
            index = (index + 1) % texts.length; 
            titleElement.style.opacity = "0.8"; 
            showLetters(texts[index]);
          }, 1000); // Đợi 1s trước khi hiển thị chữ mới
        }, 3000); // Chữ hiện 1s rồi mờ đi
      }
    }

    showLetters(texts[index]); // Bắt đầu vòng lặp
  }, 1000);

  // add start and cursor
  class RandomCoordinates {
    constructor() {
      this.x = Math.random() * 100 + '%';
      this.y = Math.random() * 100 + '%';
    }
  }


  class ShootingStar {
    constructor() {
      this.star = document.createElement('div');
      this.star.classList.add('star');

      this.start = new RandomCoordinates();

      this.setStyles();
    }

    setStyles() {
      this.setNewStyleVar('--start-x', this.start.x);
      this.setNewStyleVar('--start-y', this.start.y);

      this.setNewStyleVar('--duration', Math.random() * 9 + 5 + 's');

      this.setNewStyleVar('--delay', Math.random() + 's');

      this.setNewStyleVar('--top', Math.random() * 100 - 30 + '%');
      this.setNewStyleVar('--left', Math.random() * 100 - 30 + '%');

      this.setNewStyleVar('--size', Math.random() + 0.8);

      this.setNewStyleVar('--angle', Math.random() * 360 + 'deg');
    }

    setNewStyleVar(styleName, styleValue) {
      this.star.style.setProperty(styleName, styleValue);
    }

    getStar() {
      return this.star;
    }
  }

  new ShootingStar();

  class NightSky {
    constructor() {
      this.nightSky = document.getElementById('night-sky');

      this.numberOfStars = Number.parseInt(this.nightSky.style.getPropertyValue('--number-of-stars'));
      this.addStars(this.numberOfStars);
    }

    addStars(numberOfStars) {
      for (let i = 0; i < numberOfStars; i++) {
        this.nightSky.appendChild(new ShootingStar().getStar());
      }
    }
  }

  new NightSky();

  // One of my first <canvas> experiments, woop! :D 

  var SCREEN_WIDTH = window.innerWidth;
  var SCREEN_HEIGHT = window.innerHeight;

  var RADIUS = 40;

  var RADIUS_SCALE = 1;
  var RADIUS_SCALE_MIN = 1;
  var RADIUS_SCALE_MAX = 1.5;

  var QUANTITY = 7;

  var canvas;
  var context;
  var particles;

  var mouseX = SCREEN_WIDTH * 0.5;
  var mouseY = SCREEN_HEIGHT * 0.5;
  var mouseIsDown = false;

  function init() {

    canvas = document.getElementById('world');
    if (!canvas) {
      console.error("Canvas không được tìm thấy!");
      return;
    }

    if (canvas && canvas.getContext) {
      context = canvas.getContext('2d');

      // Register event listeners
      window.addEventListener('mousemove', documentMouseMoveHandler, false);
      window.addEventListener('mousedown', documentMouseDownHandler, false);
      window.addEventListener('mouseup', documentMouseUpHandler, false);
      document.addEventListener('touchstart', documentTouchStartHandler, false);
      document.addEventListener('touchmove', documentTouchMoveHandler, false);
      window.addEventListener('resize', windowResizeHandler, false);

      createParticles();

      windowResizeHandler();

      setInterval(loop, 1000 / 60);
    }
  }

  function createParticles() {
    particles = [];

    for (var i = 0; i < QUANTITY; i++) {
      var particle = {
        size: 1,
        position: { x: mouseX, y: mouseY },
        offset: { x: 0, y: 0 },
        shift: { x: mouseX, y: mouseY },
        speed: 0.04 + Math.random() * 0.04,
        targetSize: 1,
        // fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
        fillColor: `hsl(${Math.random() * 40 + 200}, 70%, 50%)`,
        orbit: RADIUS * .5 + (RADIUS * .5 * Math.random())
      };

      particles.push(particle);
    }
  }

  function documentMouseMoveHandler(event) {
    mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * .5;
    mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * .5;
  }

  function documentMouseDownHandler(event) {
    mouseIsDown = false;
  }

  function documentMouseUpHandler(event) {
    mouseIsDown = false;
  }

  function documentTouchStartHandler(event) {
    if (event.touches.length == 1) {
      event.preventDefault();

      mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
      mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
    }
  }

  function documentTouchMoveHandler(event) {
    if (event.touches.length == 1) {
      event.preventDefault();

      mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
      mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
    }
  }

  function windowResizeHandler() {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;

    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
  }

  function loop() {

    if (mouseIsDown) {
      RADIUS_SCALE += (RADIUS_SCALE_MAX - RADIUS_SCALE) * (0.02);
    } else {
      RADIUS_SCALE -= (RADIUS_SCALE - RADIUS_SCALE_MIN) * (0.02);
    }

    RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX);

    // Reduce the opacity of the background to create a trailing effect
    // context.fillStyle = 'rgba(0,0,0,0.1)';
    // context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0, len = particles.length; i < len; i++) {
      var particle = particles[i];

      var lp = { x: particle.position.x, y: particle.position.y };

      // Rotation
      particle.offset.x += particle.speed;
      particle.offset.y += particle.speed;

      // Follow mouse with some lag
      particle.shift.x += (mouseX - particle.shift.x) * (particle.speed);
      particle.shift.y += (mouseY - particle.shift.y) * (particle.speed);

      // Apply position
      particle.position.x = particle.shift.x + Math.cos(i + particle.offset.x) * (particle.orbit * RADIUS_SCALE);
      particle.position.y = particle.shift.y + Math.sin(i + particle.offset.y) * (particle.orbit * RADIUS_SCALE);

      // Limit to screen bounds
      particle.position.x = Math.max(Math.min(particle.position.x, SCREEN_WIDTH), 0);
      particle.position.y = Math.max(Math.min(particle.position.y, SCREEN_HEIGHT), 0);

      particle.size += (particle.targetSize - particle.size) * 0.05;

      if (Math.round(particle.size) == Math.round(particle.targetSize)) {
        particle.targetSize = 1 + Math.random() * 7;
      }

      context.beginPath();
      context.fillStyle = particle.fillColor;
      context.strokeStyle = particle.fillColor;
      context.lineWidth = particle.size;
      context.moveTo(lp.x, lp.y);
      context.lineTo(particle.position.x, particle.position.y);
      context.stroke();
      context.arc(particle.position.x, particle.position.y, particle.size / 2, 0, Math.PI * 2, true);
      context.fill();
    }
  }
};


