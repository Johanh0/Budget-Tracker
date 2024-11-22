import User from "./User.js";

class Budget extends User {
  constructor(money, expensesList, expenseValue, incomeValue, id) {
    super(id),
      (this.money = money),
      (this.expensesList = expensesList),
      (this.expenseValue = expenseValue),
      (this.incomeValue = incomeValue);
  }

  calculateBudget(quantity, type) {
    switch (type) {
      case "income":
        const incomeResult = this.money + quantity;
        this.money = incomeResult;
        this.incomeValue = incomeResult;
        break;
      case "expense":
        const expenseResult = this.money - quantity;
        this.money = expenseResult;
        this.expenseValue = this.expenseValue - quantity;
        break;
    }
  }

  addExpense(expense) {
    this.expensesList.push(expense);
  }
}

export default Budget;
