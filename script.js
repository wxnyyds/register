const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const isRequiredValid = checkRequired([username, email, password, confirmPassword]);
  let isFormValid = isRequiredValid;
  if (isRequiredValid) {
    const isUsernameValid = checkLength(username, 3, 15);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkLength(password, 6, 25);
    const isPasswordsMatch = checkPasswordsMatch(password, confirmPassword);

    isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
  }

  if (isFormValid) {
    alert("Registration successful!");
    form.reset();
    resetFormFields();
  }
});

function resetFormFields() {
  const formItems = document.querySelectorAll('.form-item');
  formItems.forEach(item => {
    const input = item.querySelector('input');
    input.style.borderColor = '#f0f0f0'; // 设置为初始的白色
  });
}

function checkRequired(inputArray) {
  let isValid = true;

  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${formatFieldName(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });
  return isValid;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${formatFieldName(input)} must be at least ${min} characters.`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${formatFieldName(input)} must be less than ${max} characters.`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email.value.trim())) {
    showSuccess(email);
    return true;
  } else {
    showError(email, "Email is not valid");
    return false;
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
    return false;
  }
  return true;
}

function formatFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-item error";
  const small = formGroup.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-item success";
}

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("focus", function () {
    input.style.borderColor = "#3498db"; // 设置为蓝色
  });

  input.addEventListener("blur", function () {
    if (!input.value) {  // 如果输入框为空，恢复初始状态
      input.style.borderColor = "#f0f0f0";
    }
  });
});
