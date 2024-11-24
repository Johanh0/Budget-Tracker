import Budget from "./Budget.js";

// Budget class initialization
const budget = new Budget(0, [], 0, 0);

// Chart Element
const chartCanvas = document.querySelector("#budget--chart");
const chart = new Chart(chartCanvas, {
  type: "doughnut",
  data: {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Budget",
        data: [budget.incomeValue, budget.expenseValue],
        backgroundColor: ["#52b788", "#ef233c"],
      },
    ],
  },
});

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

// Limit the input only to numbers
inputQuantity.addEventListener("input", () => {
  const inputRegex = /^\d*$/;
  if (!inputRegex.test(inputQuantity.value)) {
    inputQuantity.value = inputQuantity.value.replace(/[^0-9]/g, "");
  }
});

// Event for submit the new budget expense / income
submitBudget.addEventListener("click", (event) => {
  event.preventDefault();

  // Get values from the inputs and format them
  const typeBudgetValue = typeBudgeElement.value.toLowerCase();
  const moneyValue = new Number(inputQuantity.value);
  const inputNameValue = inputName.value;
  const categoryValue = typeCategoryElement.value.toLowerCase();

  if (moneyValue <= 0 && inputNameValue === "") {
    alert("You need to field all the inputs!");
    return;
  }

  //   Save values into the user object
  budget.calculateBudget(moneyValue, typeBudgetValue);
  const expenseObj = {
    name: inputNameValue,
    value: moneyValue,
    category: categoryValue,
    id: crypto.randomUUID(),
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
  updateChart();
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
}

// Add dynamically the expenses into the HTML
function addExpenses(expenseArr) {
  // Clean the expenses list
  expenseListElement.innerHTML = ``;

  //   Add each expense into the list
  expenseArr.forEach((expense) => {
    const expenseType =
      expense.type === "income" ? "income--type" : "expense--type";

    const isSymbolNeeded = expense.type === "expense" ? "-" : "";

    expenseListElement.innerHTML += `
        <article data-id="${expense.id}" class="expense__container ${expenseType}">
            <div class="expense__container--icon">
                <img src="src/assets/icons/${expense.category}.svg" alt="icon" />
            </div>
            <div class="expense__container--title">
                <p>${expense.name}</p>
            </div>
            <div class="expense__container--price">
                <p>$ ${isSymbolNeeded}${expense.value}</p>
                <div class="delete--btn">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </article>
    `;

    deleteExpenses();
  });
}

// Add Delete functionality
function deleteExpenses() {
  const allExpenses = document.querySelectorAll(".expense__container");

  allExpenses.forEach((expense) => {
    const removeBtn = expense.children[2].children[1];

    removeBtn.addEventListener("click", () => {
      const expenseId = expense.dataset.id;
      expense.remove();
      budget.removeExpense(expenseId);
      updateBudget();
      updateChart();
    });
  });
}

// Update the budget
function updateBudget() {
  incomeResultElement.textContent = budget.incomeValue;
  expenseResultElement.textContent = budget.expenseValue;

  totalResultElement.textContent = budget.money;
}

// Update chart
function updateChart() {
  chart.data.datasets[0].data = [budget.incomeValue, budget.expenseValue];
  chart.update();
}
