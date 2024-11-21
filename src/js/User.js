class User {
  #password;
  constructor(name, lastName, userName, money, expenses) {
    (this.name = name),
      (this.lastName = lastName),
      (this.userName = userName),
      (this.#password = this.#password),
      (this.id = crypto.randomUUID()),
      (this.money = money),
      (this.expenses = expenses);
  }

  // getMoney() {
  //   return this.money
  // }

  addMoney(quantity) {
    this.money = this.money + quantity;
  }

  restMoney(quantity) {
    this.money = this.money - quantity;
  }

  // getExpenses() {
  //   return this.expenses
  // }

  addExpense(expense) {
    this.expenses.push(expense);
  }
}

export default User;
