function initCarousel() {
  const carousel = document.querySelector(".carousel");
  let arrowRight = document.querySelector(".carousel__arrow_right");
  let arrowLeft = document.querySelector(".carousel__arrow_left");
  const carouselMove = document.querySelector(".carousel__inner");
  const slides = document.querySelectorAll(".carousel__slide");
  const slideWidth = slides[0].offsetWidth;
  let currentSlide = 0;

  const arrowUpdates = () => {
    arrowLeft.style.display = (currentSlide === 0) ? "none" : "";
    arrowRight.style.display = (currentSlide === slides.length - 1) ? "none" : ""; 
  };
  
  arrowUpdates();

  carousel.addEventListener("click", (event) => {
    const arrowRightClicked = event.target.closest(".carousel__arrow_right");
    const arrowLeftClicked = event.target.closest(".carousel__arrow_left");
    if (arrowRightClicked && currentSlide < slides.length - 1) {
      currentSlide++;
    } else if (arrowLeftClicked) {
      currentSlide--;
    }
    carouselMove.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    arrowUpdates();
  });
}