import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  elem = null;

  constructor(slides) {
    this.slides = slides;
    this.elem = this.#render();
    this.#slideSwitch();
  }

  #template() {
    return `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.#templateCarouselSlides()}
        </div>
      </div>
    `;
  }

  #templateCarouselSlides() {
    return this.slides
      .map(
        ({ price, name, image, id }) => `
      <div class="carousel__slide" data-id="${id}">
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `
      )
      .join("");
  }

  #slideSwitch() {
    const carouselTemplate = this.elem;
    const arrowRight = carouselTemplate.querySelector(".carousel__arrow_right");
    const arrowLeft = carouselTemplate.querySelector(".carousel__arrow_left");
    const carouselMove = carouselTemplate.querySelector(".carousel__inner");

    let currentSlide = 0;

    const arrowUpdates = () => {
      arrowLeft.style.display = currentSlide === 0 ? "none" : "";
      arrowRight.style.display =
        currentSlide === this.slides.length - 1 ? "none" : "";
    };

    arrowUpdates();

    carouselTemplate.addEventListener("click", (event) => {
      const arrowRightClicked = event.target.closest(".carousel__arrow_right");
      const arrowLeftClicked = event.target.closest(".carousel__arrow_left");
      if (arrowRightClicked && currentSlide < this.slides.length - 1) {
        currentSlide++;
      } else if (arrowLeftClicked && currentSlide > 0) {
        currentSlide--;
      }
      carouselMove.style.transform = `translateX(-${carouselMove.offsetWidth * currentSlide}px)`;
      arrowUpdates();
    });
  }

  #render() {
    this.elem = createElement(this.#template());
    const slides = this.elem.querySelectorAll(".carousel__slide");
    slides.forEach((slide) => {
      const addButton = slide.querySelector(".carousel__button");
      addButton.addEventListener("click", () => {
        const productId = slide.dataset.id;
        const productAdd = new CustomEvent("product-add", {
          detail: productId,
          bubbles: true,
        });
        this.elem.dispatchEvent(productAdd);
      });
    });
    return this.elem;
  }
}
