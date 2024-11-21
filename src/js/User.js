class User {
  constructor() {
    // name, lastName, userName,
    // (this.name = name),
    // (this.lastName = lastName),
    // (this.userName = userName),
    // (this.#password = this.#password),
    this.id = crypto.randomUUID();
    // (this.money = money),
    // (this.expenses = expenses);
  }

  // getMoney() {
  //   return this.money
  // }
}

export default User;
