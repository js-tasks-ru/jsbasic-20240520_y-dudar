import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  elem = null;
  constructor(categories) {
    this.categories = categories;
    this.elem = this.#render();
    this.#scrollingMenu();
    this.#categorySelection();
  }

  #template() {
    return `
      <div class="ribbon">

      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
        <a href="#" class="ribbon__item ribbon__item_active" data-id="">All</a>
        <a href="#" class="ribbon__item" data-id="salads">Salads</a>
        <a href="#" class="ribbon__item" data-id="soups">Soups</a>
        <a href="#" class="ribbon__item" data-id="chicken-dishes">Chicken dishes</a>
        <a href="#" class="ribbon__item" data-id="beef-dishes">Beef dishes</a>
        <a href="#" class="ribbon__item" data-id="seafood-dishes">Seafood dishes</a>
        <a href="#" class="ribbon__item" data-id="vegetable-dishes">Vegetable dishes</a>
        <a href="#" class="ribbon__item" data-id="bits-and-bites">Bits and bites</a>
        <a href="#" class="ribbon__item" data-id="on-the-side ribbon__item_active">On the side</a>
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>`;
  }
  #scrollingMenu() {
    const ribbonArrowRight = this.elem.querySelector(".ribbon__arrow_right");
    const ribbonArrowLeft = this.elem.querySelector(".ribbon__arrow_left");
    const ribbonInner = this.elem.querySelector(".ribbon__inner");

    function hidingButtons() {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        ribbonArrowLeft.classList.remove("ribbon__arrow_visible");
      } else {
        ribbonArrowLeft.classList.add("ribbon__arrow_visible");
      }

      if (scrollRight >= 1) {
        ribbonArrowRight.classList.add("ribbon__arrow_visible");
      } else {
        ribbonArrowRight.classList.remove("ribbon__arrow_visible");
      }
    }
    ribbonArrowRight.addEventListener("click", () => {
      ribbonInner.scrollBy(350, 0);
      ribbonInner.addEventListener("scroll", () => {
        hidingButtons();
      });
    });
    ribbonArrowLeft.addEventListener("click", () => {
      ribbonInner.scrollBy(-350, 0);
      ribbonInner.addEventListener("scroll", () => {
        hidingButtons();
      });
    });
  }

  #categorySelection() {
    const ribon = this.elem.querySelector(".ribbon__inner");

    ribon.addEventListener("click", (event) => {
      let currentActiveElement = ribon.querySelector(".ribbon__item_active");

      if (currentActiveElement) {
        currentActiveElement.classList.remove("ribbon__item_active");
      }

      let newActiveElement = event.target;

      if (newActiveElement.dataset.id) {
        newActiveElement.classList.add("ribbon__item_active");
      }
      const ribbonSelect = new CustomEvent("ribbon-select", {
        detail: newActiveElement.dataset.id,
        bubbles: true,
      });
      this.elem.dispatchEvent(ribbonSelect);
    });
  }

  #render() {
    this.elem = createElement(this.#template());
    return this.elem;
  }
}
