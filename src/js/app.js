import User from "./User.js";
import Budget from "./Budget.js";

// Elements to manipulate the modal view
const budgetModalElement = document.querySelector(".budget__modal");
const addBudgetBtn = document.querySelector(".add__container--btn");
const closeModalIcon = document.querySelector(".fa-x");

// Elements from the modal view
const typeBudgeElement = document.querySelector("#quantity--type");
const inputQuantity = document.querySelector("#input--quantity--money");
const inputName = document.querySelector("#input--budget--name");
const typeCategoryElement = document.querySelector("#category--type");
const submitBudget = document.querySelector(".submit--budget");

// Handle Category options dynamically when user change between income and expense
document.addEventListener("DOMContentLoaded", handleCategories);
typeBudgeElement.addEventListener("change", handleCategories);

// Budget class initialization
const budget = new Budget(0, []);

// After load the HTML create an user and save it into the localStorage
// document.addEventListener("DOMContentLoaded", () => {
//   const isUserSave = localStorage.getItem("user");

//   if (!isUserSave) {
//     localStorage.setItem("user", JSON.stringify(user));
//     return;
//   }

//   console.log();
// });

// Event for submit the new budget expense / income
submitBudget.addEventListener("click", (event) => {
  event.preventDefault();

  // Get values from the inputs and format them
  const typeBudgetValue = typeBudgeElement.value.toLowerCase();
  const moneyValue = new Number(inputQuantity.value);
  const inputNameValue = inputName.value;
  const categoryValue = typeCategoryElement.value.toLowerCase();

  //   Save values into the user object
  budget.calculateBudget(moneyValue, typeBudgetValue);
  const expenseObj = {
    name: inputNameValue,
    value: moneyValue,
    category: categoryValue,
  };

  budget.addExpense(expenseObj);

  //   Cleaning inputs
  inputQuantity.value = "";
  inputName.value = "";

  console.log(budget);
});

// Event listeners
addBudgetBtn.addEventListener("click", () => openModal());

// Close modal
closeModalIcon.addEventListener("click", closeModal);

// Functions
// Open Modal view
function openModal() {
  budgetModalElement.style.display = "flex";
}

// Close Modal view
function closeModal() {
  budgetModalElement.style.display = "none";
}

// Handle Category options dynamically when user change between income and expense
function handleCategories() {
  const incomeCategories = ["Job", "Tip", "Hustle", "Other"];
  const expenseCategories = [
    "House",
    "Food",
    "Health",
    "Transportation",
    "Saving",
    "Entertainment",
    "Other",
  ];

  //   Arrow function to generate the category list
  const generateCategories = (categoriesArray) => {
    categoriesArray.forEach((category) => {
      typeCategoryElement.innerHTML += `
              <option value="${category.toLowerCase()}">${category}</option>
              `;
    });
  };

  //   Clean the options list
  typeCategoryElement.innerHTML = "";

  switch (typeBudgeElement.value) {
    case "income":
      generateCategories(incomeCategories);
      break;
    case "expense":
      generateCategories(expenseCategories);
      break;
  }

  //   console.log(typeBudgeElement.value);
}
