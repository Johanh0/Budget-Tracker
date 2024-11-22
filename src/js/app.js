import Budget from "./Budget.js";

// Elements to manipulate the modal view
const budgetModalElement = document.querySelector(".budget__modal");
const addBudgetBtn = document.querySelector(".add__container--btn");
const closeModalIcon = document.querySelector(".fa-x");

// Expense list element
const expenseListElement = document.querySelector(".expenses__list ul li");

// Elements from the modal view
const typeBudgeElement = document.querySelector("#quantity--type");
const inputQuantity = document.querySelector("#input--quantity--money");
const inputName = document.querySelector("#input--budget--name");
const typeCategoryElement = document.querySelector("#category--type");
const submitBudget = document.querySelector(".submit--budget");

// Handle Category options dynamically when user change between income and expense
document.addEventListener("DOMContentLoaded", handleCategories);
typeBudgeElement.addEventListener("change", handleCategories);

// Budget Elements
const incomeResultElement = document.querySelector(
  ".budget__summary--income p"
);
const expenseResultElement = document.querySelector(
  ".budget__summary--expense p"
);
const totalResultElement = document.querySelector(".budget__summary--total p");

console.log(incomeResultElement);
console.log(expenseResultElement);
console.log(totalResultElement);

// Budget class initialization
const budget = new Budget(0, [], 0, 0);

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

  switch (typeBudgeElement.value) {
    case "income":
      expenseObj.type = "income";
      break;
    case "expense":
      expenseObj.type = "expense";
      break;
  }

  budget.addExpense(expenseObj);

  //   Cleaning inputs
  inputQuantity.value = "";
  inputName.value = "";

  //   Add expense
  addExpenses(budget.expensesList);

  updateBudget();
  closeModal();
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

// Add dynamically the expenses into the HTML
function addExpenses(expenseArr) {
  // Clean the expenses list
  expenseListElement.innerHTML = ``;
  console.log(expenseArr);

  //   Add each expense into the list
  expenseArr.forEach((expense) => {
    const expenseType =
      expense.type === "income" ? "income--type" : "expense--type";

    const isSymbolNeeded = expense.type === "expense" ? "-" : "";

    expenseListElement.innerHTML += `
        <article class="expense__container ${expenseType}">
            <div class="expense__container--icon">
                <img src="src/assets/icons/${expense.category}.svg" alt="icon" />
            </div>
            <div class="expense__container--title">
                <p>${expense.name}</p>
            </div>
            <div class="expense__container--price">
                <p>$ ${isSymbolNeeded}${expense.value}</p>
                <div>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                    <div class="tooltip" role="tooltip"></div>
                </div>
            </div>
        </article>
    `;
  });
}

// Update the budget
function updateBudget() {
  incomeResultElement.textContent = budget.incomeValue;
  expenseResultElement.textContent = budget.expenseValue;

  totalResultElement.textContent = budget.money;
}
