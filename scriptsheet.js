function changeOnToggle() {

  // Get references to the necessary elements
  const themeToggleCheckbox = document.getElementById("theme-toggle-checkbox");

  // Check if the checkbox is checked
  if (themeToggleCheckbox.checked) {
    // Change the value of --lightColor to #222222
    document.documentElement.style.setProperty("--lightColor", "#222222");
    document.documentElement.style.setProperty("--darkColor", "#afafaf");
  } else {
    // Reset the value of --lightColor to its original value (if needed)
    document.documentElement.style.setProperty("--lightColor", "#afafaf");
    document.documentElement.style.setProperty("--darkColor", "#222222");
  }
  
}

// Add an event listener to the checkbox
themeToggleCheckbox.addEventListener("change", changeOnToggle);