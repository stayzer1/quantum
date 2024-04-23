// Custom scripts
function tabs(
  headerSelector,
  tabSelector,
  contentSelector,
  activeClass,
  display = "flex"
) {
  const header = document.querySelector(headerSelector),
    tab = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector);
  function hideTabContent() {
    content.forEach((item) => {
      item.style.display = "none";
    });
    tab.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }
  function showTabContent(i = 0) {
    content[i].style.display = display;
    tab[i].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();
  header.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target.classList.contains(tabSelector.replace(/\./, "")) ||
      target.parentNode.classList.contains(tabSelector.replace(/\./, ""))
    ) {
      tab.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

// ПЕРВЫЙ аргумент - класс всего нашего хедера табов.
// ВТОРОЙ аргумент - класс конкретного элемента, при клике на который будет переключатся таб.
// ТРЕТИЙ аргумент - класс того блока, который будет переключаться.
// ЧЕТВЕРТЫЙ аргумент - класс активности, который будет добавлятся для таба, который сейчас активен.
tabs(".tabs__header", ".tabs__header-item", ".tabs__content-item", "active");

// Step Form
// function stepForm() {
//   const steps = document.querySelectorAll(".form__step");
//   const prevBtn = document.querySelector(".prev__step");
//   const nextBtn = document.querySelector(".next__step");
//   const form = document.querySelector(".steps__form");
//   const stepNumbers = document.querySelectorAll(".step__number");
//   const progress = document.querySelector(".progress__success");

//   form.addEventListener("submit", (e) => e.preventDefault());

//   let formSteps = 0;

//   nextBtn.addEventListener("click", () => {
//     if (formSteps === steps.length - 1) {
//       formSteps = 0;
//     } else {
//       formSteps++;
//     }

//     updateFormSteps();
//   });

//   prevBtn.addEventListener("click", () => {
//     if (formSteps === 0) {
//       formSteps = steps.length - 1;
//     } else {
//       formSteps--;
//     }

//     updateFormSteps();
//   });

//   function updateFormSteps() {
//     stepNumbers.forEach((stepNumber, index) => {
//       if (index === formSteps) {
//         stepNumber.classList.add("active__number");
//       } else {
//         stepNumber.classList.remove("active__number");
//       }
//     });

//     const percent = ((formSteps + 1) / steps.length) * 87 + "%";
//     progress.style.width = percent;

//     steps.forEach((step, index) => {
//       if (index === formSteps) {
//         step.classList.add("active");
//       } else {
//         step.classList.remove("active");
//       }
//     });
//   }

//   updateFormSteps();
// }

// stepForm();
window.addEventListener("DOMContentLoaded", () => {
  function stepForm() {
    const steps = document.querySelectorAll(".form__step");
    const prevBtn = document.querySelector(".prev__step");
    const nextBtn = document.querySelector(".next__step");
    const form = document.querySelector(".steps__form");
    const stepNumbers = document.querySelectorAll(".step__number");
    const progress = document.querySelector(".progress__success");
    form.addEventListener("submit", (e) => e.preventDefault());
    let formSteps = 0;
    nextBtn.addEventListener("click", () => {
      formSteps++;
      if (formSteps >= steps.length - 1) {
        nextBtn.style.display = "none";
        formSteps = steps.length - 1;
      }
      updateFormSteps();
    });
    prevBtn.addEventListener("click", () => {
      formSteps--;
      if (formSteps < 0) {
        formSteps = 0;
      }
      updateFormSteps();
    });
    function updateFormSteps() {
      stepNumbers.forEach((stepNumber, index) => {
        stepNumber.classList.toggle("active__number", index === formSteps);
      });
      progress.style.width = `${((formSteps + 1) / steps.length) * 87}%`;
      steps.forEach((step, index) => {
        step.classList.toggle("active", index === formSteps);
      });
      const currentStepInputs = document.querySelectorAll(
        ".form__step-selector"
      );
      let anyInputSelected = Array.from(currentStepInputs).some(
        (input) => input.checked
      );
      if (anyInputSelected) {
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = true;
      }
    }
    updateFormSteps();
  }
  stepForm();
});

// Аккордеон
function accordion() {
  const items = document.querySelectorAll(".accordion__item-trigger");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const parent = item.parentNode;
      if (parent.classList.contains("accordion__item-active")) {
        parent.classList.remove("accordion__item-active");
      } else {
        document
          .querySelectorAll(".accordion__item")
          .forEach((child) => child.classList.remove("accordion__item-active"));
        parent.classList.add("accordion__item-active");
      }
    });
  });
}
accordion();

// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const body = document.querySelector("body");
  burger.addEventListener("click", () => {
    if (!menu.classList.contains("active")) {
      menu.classList.add("active");
      burger.classList.add("active-burger");
      body.classList.add("locked");
    } else {
      menu.classList.remove("active");
      burger.classList.remove("active-burger");
      body.classList.remove("locked");
    }
  });
  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener("resize", () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove("active");
      burger.classList.remove("active-burger");
      body.classList.remove("locked");
    }
  });
}
burgerMenu();
