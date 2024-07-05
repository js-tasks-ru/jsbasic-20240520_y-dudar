import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  elem = null;

  constructor() {
    this.elem = this.render();
    this.addEventListeners();
  }

  modalTemplate() {
    return `
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">Вот сюда нужно добавлять заголовок</h3>
          </div>
          <div class="modal__body">А сюда нужно добавлять содержимое тела модального окна</div>
        </div>
      </div>
    `;
  }

  open() {
    const body = document.querySelector('body');
    body.classList.add('is-modal-open');
    body.append(this.elem);
  }

  close() {
    const body = document.querySelector('body');
    body.classList.remove('is-modal-open');
    if (this.elem) {
      this.elem.remove();
    }
  }

  addEventListeners() {
    const modalClose = this.elem.querySelector('.modal__close');
    modalClose.addEventListener('click', () => this.close(), {once: true});

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    }, {once: true});
  }

  setTitle(title) {
    const modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.textContent = title;
  }

  setBody(node) {
    const modalBody = this.elem.querySelector('.modal__body');
    modalBody.textContent = '';
    modalBody.append(node);
  }

  render() {
    this.elem = createElement(this.modalTemplate());
    return this.elem;
  }
}