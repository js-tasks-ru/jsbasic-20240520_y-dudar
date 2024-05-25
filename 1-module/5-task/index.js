function truncate(str, maxlength) {
  
  if (str.length > maxlength) {
    return str.substring(0, --maxlength) + "…";
  } else {
    return str;
  }
}


