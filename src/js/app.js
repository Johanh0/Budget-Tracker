import User from "./User.js";

const budgetModal = document.querySelector(".budget__modal");
const addBudgetBtn = document.querySelector(".add__container--btn");
const closeModalIcon = document.querySelector(".fa-x");

// Event listeners
addBudgetBtn.addEventListener("click", () => openModal());

// Close modal
closeModalIcon.addEventListener("click", closeModal);

// Functions
// Open Modal view
function openModal() {
  budgetModal.style.display = "flex";
}

// Close Modal view
function closeModal() {
  budgetModal.style.display = "none";
}
