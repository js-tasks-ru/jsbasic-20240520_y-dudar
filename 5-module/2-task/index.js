function toggleText() {
  const button = document.querySelector(".toggle-text-button");
  button.addEventListener('click', () => {
    let text = document.getElementById("text");
    text = text.hasAttribute("hidden") ? text.removeAttribute("hidden") : text.setAttribute("hidden", "true");
  });
}
