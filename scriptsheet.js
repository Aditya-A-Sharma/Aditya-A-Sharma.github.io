const themeToggleCheckbox = document.querySelector("#theme-toggle-checkbox");
const bodyElement = document.querySelector("body");

themeToggleCheckbox.addEventListener("change", () => {
  if (themeToggleCheckbox.checked) {
    bodyElement.classList.add("dark-theme");
    bodyElement.classList.remove("light-theme");
  } else {
    bodyElement.classList.remove("dark-theme");
    bodyElement.classList.add("light-theme");
  }
});