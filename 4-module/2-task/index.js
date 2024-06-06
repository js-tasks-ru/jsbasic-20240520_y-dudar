function makeDiagonalRed(table) {
  
  Array.from(table.rows).forEach((element, index) => {
    element.cells[index].style.backgroundColor = "red";
  });
}
