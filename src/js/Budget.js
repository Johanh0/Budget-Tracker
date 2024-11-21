import User from "./User.js";

class Budget extends User {
  constructor(money, expenses, id) {
    super(id), (this.money = money), (this.expenses = expenses);
  }

  calculateBudget(quantity, type) {
    switch (type) {
      case "income":
        this.money = this.money + quantity;
        break;
      case "expense":
        this.money = this.money - quantity;
        break;
    }
  }

  getMoney() {
    return this.money;
  }

  addExpense(expense) {
    this.expenses.push(expense);
  }
}

export default Budget;
