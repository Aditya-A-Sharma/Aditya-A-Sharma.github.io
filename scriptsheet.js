const themeToggleCheckbox = document.getElementById("theme-toggle-checkbox");

function changeOnToggle() {
  if (themeToggleCheckbox.checked) {
    document.documentElement.style.setProperty("--lightColor", "#222222");
    document.documentElement.style.setProperty("--darkColor", "#afafaf");
  } else {
    document.documentElement.style.setProperty("--lightColor", "#afafaf");
    document.documentElement.style.setProperty("--darkColor", "#222222");
  }
}

themeToggleCheckbox.addEventListener("change", changeOnToggle);