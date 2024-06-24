import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  elem = null;

  #product = [];

  constructor(product) {
    this.#product = product || this.#product;
    this.elem = this.#render();
  }

  #template() {
    const { name, price, image } = this.#product;
    return `
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${image}" class="card__image" alt="product">
          <span class="card__price">€${price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`;
  }

  #onPlusClick = (event) => {
    if (!event.target.closest(".card__button")) {
      return;
    }
    const openEvent = new CustomEvent("product-add", {
      detail: this.#product.id, 
      bubbles: true 
    });
    this.elem.dispatchEvent(openEvent);
  }

  #render() {
    this.elem = createElement(this.#template());
    this.elem.addEventListener("click", this.#onPlusClick);
    return this.elem;
  }
}