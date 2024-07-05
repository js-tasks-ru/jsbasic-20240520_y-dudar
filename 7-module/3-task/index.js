import createElement from "../../assets/lib/create-element.js";

// Экспортируемый класс StepSlider
export default class StepSlider {
  elem = null; // Главный элемент слайдера
  #config = { // Конфигурация слайдера
    steps: 0, // Количество шагов
    value: 0 // Текущее значение
  };
  
  // Конструктор класса
  constructor({ steps, value = 0 }) {
    this.#config.steps = steps; // Устанавливаем количество шагов
    this.#config.value = value; // Устанавливаем начальное значение
    this.elem = this.#render(); // Отрисовываем слайдер
    this.#addEventListeners(); // Добавляем обработчики событий
    this.#updateSlider(this.#config.value); // Инициализация слайдера с текущим значением
  }

  // Метод для обновления слайдера
  #updateSlider(value) {
    this.#updateThumbAndProgress(value); // Обновляем положение ползунка и прогресс-бара
    this.#highlightStep(value); // Выделяем текущий шаг
    this.#displayValue(value); // Отображаем текущее значение
    this.#userEvent();
  }

  // Обновление положения ползунка и прогресс-бара
  #updateThumbAndProgress(value) {
    const thumb = this.elem.querySelector('.slider__thumb'); // Находим ползунок
    const progress = this.elem.querySelector('.slider__progress'); // Находим прогресс-бар

    const segments = this.#config.steps - 1; // Количество сегментов между шагами
    const valuePercents = value / segments * 100; // Вычисляем процентное значение для ползунка

    thumb.style.left = `${valuePercents}%`; // Устанавливаем положение ползунка
    progress.style.width = `${valuePercents}%`; // Устанавливаем ширину прогресс-бара
  }

  // Выделение текущего шага
  #highlightStep(value) {
    const sliderSteps = this.elem.querySelectorAll('.slider__steps span'); // Находим все шаги

    sliderSteps.forEach((step, index) => { // Проходим по каждому шагу
      step.classList.toggle('slider__step-active', index === value); // Добавляем или убираем класс активного шага
    });
  }

  // Отображение текущего значения
  #displayValue(value) {
    const sliderValue = this.elem.querySelector('.slider__value'); // Находим элемент отображения значения
    sliderValue.textContent = value; // Обновляем текстовое значение
    this.#config.value = value; // Обновляем текущее значение в конфигурации
  }

  // Добавление обработчиков событий
  #addEventListeners() {
    this.elem.addEventListener('click', (event) => this.#onSliderClick(event)); // Добавляем обработчик клика по слайдеру
  }

  // Обработчик клика по слайдеру
  #onSliderClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left; // Вычисляем позицию клика относительно слайдера
    const leftRelative = left / this.elem.offsetWidth; // Вычисляем относительное положение клика
    const segments = this.#config.steps - 1; // Количество сегментов между шагами
    const approximateValue = leftRelative * segments; // Приблизительное значение шага
    const value = Math.round(approximateValue); // Округляем до ближайшего шага
    
    this.#updateSlider(value); // Обновляем слайдер на основе нового значения
  }

  // Создание HTML-шаблона для шагов слайдера
  #createSteps() {
    const stepsArray = []; // Массив для шагов

    for (let i = 0; i < this.#config.steps; i++) { // Проходим по каждому шагу
      const stepClass = i === this.#config.value ? 'slider__step-active' : ''; // Определяем класс активного шага
      stepsArray.push(`<span class="${stepClass}"></span>`); // Добавляем шаг в массив
    }

    return stepsArray.join(''); // Возвращаем шаги в виде строки
  }

  #userEvent() {
    const userEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: this.#config.value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    });
    this.elem.dispatchEvent(userEvent);
  }

  // Создание HTML-шаблона для слайдера
  #templateSlider() {
    const steps = this.#createSteps(); // Создаем шаги

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

  // Отрисовка слайдера и возврат элемента
  #render() {
    this.elem = createElement(this.#templateSlider()); // Создаем элемент слайдера на основе HTML-шаблона
    return this.elem; // Возвращаем элемент
  }
}