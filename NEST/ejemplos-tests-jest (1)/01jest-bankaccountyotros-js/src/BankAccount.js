class BankAccount {
  constructor(owner) {
    this.owner = owner;
    this.balance = 0;
    this.isClosed = false;
  }

  deposit(amount) {
    if (this.isClosed) {
      throw new Error("Account is closed");
    }
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.balance += amount;
  }

  withdraw(amount) {
    if (this.isClosed) {
      throw new Error("Account is closed");
    }
    if (amount <= 0) {
      throw new Error("Withdraw amount must be positive");
    }
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
  }

  getBalance() {
    return this.balance;
  }

  hasFunds(amount) {
    return amount <= this.balance;
  }

  transferTo(amount, otherAccount) {
    if (this.isClosed) {
      throw new Error("Account is closed");
    }
    if (!(otherAccount instanceof BankAccount)) {
      throw new Error("The target must be a BankAccount");
    }
    this.withdraw(amount);
    otherAccount.deposit(amount);
  }

  closeAccount() {
    if (this.isClosed) {
      throw new Error("Account already closed");
    }
    this.balance = 0;
    this.isClosed = true;
  }
}

module.exports = BankAccount;
