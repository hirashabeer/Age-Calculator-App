const inputBoxes = document.getElementsByClassName("inputboxes");
const dayBox = document.getElementById("daybox");
const monthBox = document.getElementById("monthbox");
const yearBox = document.getElementById("yearbox");

const button = document.getElementById("button");

const removeError = (inputBox) => {
  inputBox.parentElement.classList.remove("error");
  inputBox.nextElementSibling.textContent = ""; // Clear error message
};

dayBox.addEventListener("input", () => {
  if (dayBox.value > 31) {
    dayBox.parentElement.classList.add("error");
    dayBox.nextElementSibling.textContent = "Must be a valid date";
  } else {
    removeError(dayBox); // Remove error for valid input
  }
});
monthBox.addEventListener("input", () => {
  if (monthBox.value > 12) {
    monthBox.parentElement.classList.add("error");
    monthBox.nextElementSibling.textContent = "Must be a valid month";
  } else {
    removeError(monthBox);
  }
});
const today = new Date();

yearBox.addEventListener("input", () => {
  if (yearBox.value > today.getFullYear()) {
    yearBox.parentElement.classList.add("error");
    yearBox.nextElementSibling.textContent = "Must be in the past";
  } else {
    removeError(yearBox);
  }
});

button.addEventListener("click", () => {
  const inputBoxesArray = Array.from(inputBoxes);
  inputBoxesArray.forEach((inputBox) => {
    if (inputBox.value === "") {
      inputBox.parentElement.classList.add("error");
      inputBox.nextElementSibling.textContent = "This field is required";
    } else {
      removeError(inputBox); // Clear error for filled input
    }

    // Age Calculation Logic
    const allFieldsFilled =
      dayBox.value !== "" && monthBox.value !== "" && yearBox.value !== "";
    if (allFieldsFilled) {
      var yearAge = today.getFullYear() - yearBox.value;
      var monthAge = today.getMonth() - (monthBox.value - 1);
      var dayAge = today.getDate() - dayBox.value;

      if (monthAge < 0 || (monthAge === 0 && today.getDate() < dayBox.value)) {
        yearAge--;
        monthAge += 12;
      }
      if (dayAge < 0) {
        monthAge--;
        var tempDate = new Date(today.getFullYear(), today.getMonth(), 0);
        dayAge += tempDate.getDate();
      }
      const ageParts = document.querySelectorAll(".result span");
      ageParts[0].textContent = yearAge;
      ageParts[1].textContent = monthAge;
      ageParts[2].textContent = dayAge;

      ageParts.forEach((part, index) => {
        const targetValue = [yearAge, monthAge, dayAge][index];

        // Loop for each component animation
        for (let i = 0; i <= targetValue; i++) {
          setTimeout(() => {
            part.textContent = i;
          }, i * 20);
        }
      });
    }
  });
});
