import createElement from "../../assets/lib/create-element.js";


export default class StepSlider {
  elem = null; 
  #config = { 
    steps: 0, 
    value: 0 
  };
  
 
  constructor({ steps, value = 0 }) {
    this.#config.steps = steps; 
    this.#config.value = value; 
    this.elem = this.#render(); 
    this.#addEventListeners(); 
    this.#updateSlider(this.#config.value);
  }

 
  #updateSlider(value) {
    this.#updateThumbAndProgress(value); 
    this.#highlightStep(value); 
    this.#displayValue(value); 
    this.#userEvent();
  }


  #updateThumbAndProgress(value) {
    const thumb = this.elem.querySelector('.slider__thumb'); 
    const progress = this.elem.querySelector('.slider__progress'); 

    const segments = this.#config.steps - 1; 
    const valuePercents = value / segments * 100; 

    thumb.style.left = `${valuePercents}%`; 
    progress.style.width = `${valuePercents}%`;
  }


  #highlightStep(value) {
    const sliderSteps = this.elem.querySelectorAll('.slider__steps span'); 

    sliderSteps.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === value); 
    });
  }


  #displayValue(value) {
    const sliderValue = this.elem.querySelector('.slider__value'); 
    sliderValue.textContent = value; 
    this.#config.value = value; 
  }


  #addEventListeners() {
    const sliderThumb = this.elem.querySelector('.slider__thumb');
    this.elem.addEventListener('click', (event) => this.#onSliderClick(event));
    sliderThumb.addEventListener('pointerdown', (event) => this.#onDown(event)); 
  }

  // Обработчик клика по слайдеру
  #onSliderClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left; 
    const leftRelative = left / this.elem.offsetWidth; 
    const segments = this.#config.steps - 1; 
    const approximateValue = leftRelative * segments; 
    const value = Math.round(approximateValue);
    
    this.#updateSlider(value); 
  }

  #onDown = () => {
    document.addEventListener('pointermove', this.#onMove);
    document.addEventListener('pointerup', this.#onUp, {once: true});
  }

  #onMove = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left; 

    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }
    
    if (leftRelative > 1) {
      leftRelative = 1;
    }
    
    let leftPercents = leftRelative * 100;
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    let segments = this.#config.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    const sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.textContent = value; 
    this.#config.value = value;
    this.elem.classList.add('slider_dragging');
    
  }

  #onUp = () => {
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.#onMove);
    this.#userEvent();
  }


  #createSteps() {
    const stepsArray = []; 

    for (let i = 0; i < this.#config.steps; i++) { 
      const stepClass = i === this.#config.value ? 'slider__step-active' : ''; 
      stepsArray.push(`<span class="${stepClass}"></span>`); 
    }

    return stepsArray.join(''); 
  }

  #userEvent() {
    const userEvent = new CustomEvent('slider-change', { 
      detail: this.#config.value,
      bubbles: true 
    });
    this.elem.dispatchEvent(userEvent);
  }

  #templateSlider() {
    const steps = this.#createSteps();

    return `
      <div class="slider">
        <!-- Ползунок слайдера с активным значением -->
        <div class="slider__thumb" style="left: ${this.#config.value / (this.#config.steps - 1) * 100}%;">
          <span class="slider__value">${this.#config.value}</span>
        </div>

        <!-- Полоска слайдера -->
        <div class="slider__progress" style="width: ${this.#config.value / (this.#config.steps - 1) * 100}%"></div>

        <!-- Шаги слайдера (вертикальные чёрточки) -->
        <div class="slider__steps">
          ${steps}
        </div>
      </div>
    `;
  }


  #render() {
    this.elem = createElement(this.#templateSlider());
    
    this.elem.ondragstart = (event) => event.preventDefault();

    return this.elem;
  }
}
