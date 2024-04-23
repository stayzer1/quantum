// Custom Scripts
// Custom scripts
// function tabs(
//   headerSelector,
//   tabSelector,
//   contentSelector,
//   activeClass,
//   display = "flex"
// ) {
//   const header = document.querySelector(headerSelector),
//     tab = document.querySelectorAll(tabSelector),
//     content = document.querySelectorAll(contentSelector);
//   function hideTabContent() {
//     content.forEach((item) => {
//       item.style.display = "none";
//     });
//     tab.forEach((item) => {
//       item.classList.remove(activeClass);
//     });
//   }
//   function showTabContent(i = 0) {
//     content[i].style.display = display;
//     tab[i].classList.add(activeClass);
//   }
//   hideTabContent();
//   showTabContent();
//   header.addEventListener("click", (e) => {
//     const target = e.target;
//     if (
//       target.classList.contains(tabSelector.replace(/\./, "")) ||
//       target.parentNode.classList.contains(tabSelector.replace(/\./, ""))
//     ) {
//       tab.forEach((item, i) => {
//         if (target == item || target.parentNode == item) {
//           hideTabContent();
//           showTabContent(i);
//         }
//       });
//     }
//   });
// }

// ПЕРВЫЙ аргумент - класс всего нашего хедера табов.
// ВТОРОЙ аргумент - класс конкретного элемента, при клике на который будет переключатся таб.
// ТРЕТИЙ аргумент - класс того блока, который будет переключаться.
// ЧЕТВЕРТЫЙ аргумент - класс активности, который будет добавлятся для таба, который сейчас активен.
// tabs(".tabs__header", ".tabs__header-item", ".tabs__content-item", "active");

window.addEventListener("DOMContentLoaded", () => {
  function stepForm() {
    const steps = document.querySelectorAll(".form__step");
    const prevBtn = document.querySelector(".prev__step");
    const nextBtn = document.querySelector(".next__step");
    // const stepButtonsDisabled = document.querySelector(
    //   ".step__buttons-disabled"
    // );
    const stepButtonsDisabled = document.querySelector(
      ".step__buttons-disabled"
    );
    const form = document.querySelector(".steps__form");
    const stepNumbers = document.querySelectorAll(".step__number");
    const progress = document.querySelector(".progress__success");
    form.addEventListener("submit", (e) => e.preventDefault());
    let formSteps = 0;
    nextBtn.classList.add("step__button-opacity");
    nextBtn.addEventListener("click", () => {
      formSteps++;
      nextBtn.classList.add("step__button-opacity");
      stepButtonsDisabled.style.display = "block";
      if (formSteps >= steps.length - 1) {
        nextBtn.style.display = "none";
        nextBtn.classList.remove("step__button-opacity");
        stepButtonsDisabled.style.display = "none";
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

      form.addEventListener("change", () => {
        let anyInputSelected = false;
        steps.forEach((step) => {
          const stepSelectors = step.querySelectorAll(".form__step-selector");
          if (Array.from(stepSelectors).some((input) => input.checked)) {
            anyInputSelected = true;
          }
        });
        if (anyInputSelected) {
          stepButtonsDisabled.style.display = "none";
          nextBtn.classList.remove("step__button-opacity");
        } else {
          stepButtonsDisabled.style.display = "block";
        }
      });
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
  const menuItem = document.querySelectorAll(".menu__item");
  menuItem.forEach((item) => {
    item.addEventListener("click", () => {
      menu.classList.remove("active");
      burger.classList.remove("active-burger");
      body.classList.remove("locked");
    });
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

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener("click", function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute("href");

    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

