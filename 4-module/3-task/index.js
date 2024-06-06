function highlight(table) {
  
  Array.from(table.rows).forEach((row) => {
    const cells = row.cells;
    const statusCell = cells[3];

    Array.from(cells).forEach((cell) => {
      if (cell.dataset.available === "true") {
        row.classList.add("available");
      }
      if (cell.dataset.available === "false") {
        row.classList.add("unavailable");
      }
      if (!statusCell.hasAttribute("data-available")) {
        row.hidden = true;
      }
      if (parseInt(cell.textContent) < 18) {
        row.style.textDecoration = "line-through";
      }
      if (cell.textContent === "m") {
        row.classList.add("male");
      } 
      if (cell.textContent === "f") {
        row.classList.add("female");
      }
    });
  });
}
