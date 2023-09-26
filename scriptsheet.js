const themeToggleCheckbox = document.querySelector("#theme-toggle-checkbox");
const bodyElement = document.querySelector("body");

themeToggleCheckbox.addEventListener("change", () => {
  if (themeToggleCheckbox.checked) {
    bodyElement.classList.add("light-theme");
    bodyElement.classList.remove("dark-theme");
  } else {
    bodyElement.classList.remove("light-theme");
    bodyElement.classList.add("dark-theme");
  }
});