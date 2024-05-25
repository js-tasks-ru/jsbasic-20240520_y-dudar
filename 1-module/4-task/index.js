function checkSpam(str) {
  str = str.toUpperCase();
  let word = "";

  for (let char of str) {
    word += char;

    if (word.includes(" ")) {
      word = "";
    }

    if (word === "1XBET" || word === "XXXXX") {
      return true;
    }
  }
  
  return false;
}
