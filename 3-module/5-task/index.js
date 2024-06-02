function getMinMax(str) {
  let number = str.split(" ").filter((item) => Number(item));
  let max = Math.max.apply(null, number);
  let min = Math.min.apply(null, number);

  return {min, max};
}

