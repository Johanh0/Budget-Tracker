class Budget {
  constructor(money, expensesList, expenseValue, incomeValue) {
    this.id = crypto.randomUUID();
    this.money = money;
    this.expensesList = expensesList;
    this.expenseValue = expenseValue;
    this.incomeValue = incomeValue;
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
        this.expenseValue = this.expenseValue + quantity;
        break;
    }
  }

  // Add the new expense to the list
  addExpense(expense) {
    this.expensesList.push(expense);
  }

  removeExpense(id) {
    // Filter out the expense with the given id
    const expenseToRemove = this.expensesList.find(
      (expense) => expense.id === id
    );
    if (expenseToRemove) {
      // Update the budget values based on the removed expense
      if (expenseToRemove.type === "expense") {
        this.money += expenseToRemove.value;
        this.expenseValue -= expenseToRemove.value;
      } else if (expenseToRemove.type === "income") {
        this.money -= expenseToRemove.value;
        this.incomeValue -= expenseToRemove.value;
      }

      // Remove the expense from the list
      this.expensesList = this.expensesList.filter(
        (expense) => expense.id !== id
      );
    }
  }
}
export default Budget;
