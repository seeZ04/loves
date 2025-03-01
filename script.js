window.onload = function () {
  document.body.classList.remove("container");

  setTimeout(() => {
    document.body.classList.remove("not-loaded");
    const nightElement = document.querySelector(".night");
    const titleElement = document.getElementById("title_text");
    if (!titleElement || !nightElement) {
      console.error("Không tìm thấy '.night' hoặc '#title_text'.");
      return;
    }

    const texts = ["Em yêu ơi...", "Anh có điều muốn nói", "Rằng...", "Anh","Yêu em...", "Sẽ mãi yêu em", "không cần lý do", "Em là hạnh phúc của anh", "Em là điều tuyệt vời nhất", "Sau tất cả..." ,"Anh xin lỗi em...", "Anh sẽ luôn đi theo bên em.", "Bên em...", "..."]; //"Hãy ở bên anh."
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
};
