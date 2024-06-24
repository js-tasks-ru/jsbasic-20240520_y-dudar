/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

function createElement(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.firstElementChild;
}

export default class UserTable {
  elem = null;

  constructor(rows) {
    this.rows = rows;
    this.elem = this.#render();
  }

  #template() {
    return `
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${this.rows.map(({ name, age, salary, city }) => `
            <tr>
              <td>${name}</td>
              <td>${age}</td>
              <td>${salary}</td>
              <td>${city}</td>
              <td><button class="del">X</button></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  #removeClickRow (event) {
    if (event.target.classList.contains("del")) {
      const row = event.target.closest("tr");
      row.remove();
    }
  }

  #render() {
    this.elem = createElement(this.#template());
    this.elem.addEventListener("click", this.#removeClickRow);
    return this.elem;
  }
}

