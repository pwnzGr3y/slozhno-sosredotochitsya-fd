// Слушатель изменений системной темы
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

darkModeMediaQuery.addEventListener("change", (e) => {
  const selectedTheme = localStorage.getItem("theme");
  if (selectedTheme === "auto") {
    const newTheme = e.matches ? "dark" : "light";
    document.documentElement.className = `theme-${newTheme}`;
  }
});

// Инициализация темы при загрузке
(function initTheme() {
  let theme = localStorage.getItem("theme");
  if (!theme) {
    theme = "auto"; // Устанавливаем "auto" по умолчанию
    localStorage.setItem("theme", theme);
  }
  setTheme(theme);
})();

// Обработка событий после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  const selectedTheme = localStorage.getItem("theme") || "auto";
  const themeButtons = [
    ...document.querySelectorAll(".header__theme-menu-button"),
  ];
  setActiveButton(themeButtons, selectedTheme);

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const chosenTheme = [...button.classList]
        .find((cn) => cn.includes("_type_"))
        .split("_type_")[1];
      setTheme(chosenTheme);
      setActiveButton(themeButtons, chosenTheme);
    });
  });
});

// Функция установки темы
function setTheme(theme) {
  localStorage.setItem("theme", theme);
  if (theme === "auto") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const actualTheme = prefersDark ? "dark" : "light";
    document.documentElement.className = `theme-${actualTheme}`;
  } else {
    document.documentElement.className = `theme-${theme}`;
  }
}

// Функция активации кнопки
function setActiveButton(buttonsArray, theme) {
  buttonsArray.forEach((button) => {
    button.classList.remove("header__theme-menu-button--active");
    button.removeAttribute("disabled");
  });
  const target = buttonsArray.find((button) =>
    button.classList.contains(`header__theme-menu-button_type_${theme}`),
  );
  if (target) {
    target.classList.add("header__theme-menu-button--active");
    target.setAttribute("disabled", "true");
  } else {
    const autoButton = document.querySelector(
      ".header__theme-menu-button_type_auto",
    );
    autoButton.classList.add("header__theme-menu-button--active");
    autoButton.setAttribute("disabled", "true");
  }
}
