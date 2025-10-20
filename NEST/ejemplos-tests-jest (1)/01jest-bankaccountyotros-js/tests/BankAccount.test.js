/**
 * Tests para la clase BankAccount
 * Implementa todos los casos de prueba definidos en la tabla del README.md
 */

const BankAccount = require('../src/BankAccount');

describe('BankAccount', () => {
  
  describe('Constructor', () => {
    test('debe crear una cuenta con propietario y saldo inicial 0', () => {
      const account = new BankAccount('Juan');
      expect(account.owner).toBe('Juan');
      expect(account.balance).toBe(0);
      expect(account.isClosed).toBe(false);
    });
  });

  describe('deposit()', () => {
    test('Caso 1: Ingreso válido', () => {
      // Arrange
      const account = new BankAccount('Ana');
      
      // Act
      account.deposit(100);
      
      // Assert
      expect(account.getBalance()).toBe(100);
    });

    test('Caso 2: Ingreso de cantidad negativa', () => {
      // Arrange
      const account = new BankAccount('Pedro');
      
      // Act & Assert
      expect(() => account.deposit(-50)).toThrow('Deposit amount must be positive');
    });

    test('Caso 2b: Ingreso de cantidad cero', () => {
      // Arrange
      const account = new BankAccount('María');
      
      // Act & Assert
      expect(() => account.deposit(0)).toThrow('Deposit amount must be positive');
    });

    test('Caso 3: Intentar ingresar en cuenta cerrada', () => {
      // Arrange
      const account = new BankAccount('Luis');
      account.deposit(100);
      account.closeAccount();
      
      // Act & Assert
      expect(() => account.deposit(50)).toThrow('Account is closed');
    });
  });

  describe('withdraw()', () => {
    test('Caso 4: Retirada válida', () => {
      // Arrange
      const account = new BankAccount('Carlos');
      account.deposit(200);
      
      // Act
      account.withdraw(50);
      
      // Assert
      expect(account.getBalance()).toBe(150);
    });

    test('Caso 5: Retirada mayor que el saldo', () => {
      // Arrange
      const account = new BankAccount('Laura');
      account.deposit(100);
      
      // Act & Assert
      expect(() => account.withdraw(200)).toThrow('Insufficient funds');
    });

    test('Caso 6: Retirada de cantidad negativa', () => {
      // Arrange
      const account = new BankAccount('Diego');
      account.deposit(100);
      
      // Act & Assert
      expect(() => account.withdraw(-20)).toThrow('Withdraw amount must be positive');
    });

    test('Caso 6b: Retirada de cantidad cero', () => {
      // Arrange
      const account = new BankAccount('Sofía');
      account.deposit(100);
      
      // Act & Assert
      expect(() => account.withdraw(0)).toThrow('Withdraw amount must be positive');
    });

    test('Caso 7: Intentar retirar de cuenta cerrada', () => {
      // Arrange
      const account = new BankAccount('Miguel');
      account.deposit(100);
      account.closeAccount();
      
      // Act & Assert
      expect(() => account.withdraw(20)).toThrow('Account is closed');
    });
  });

  describe('getBalance()', () => {
    test('Caso 8: Consultar saldo inicial', () => {
      // Arrange
      const account = new BankAccount('Elena');
      
      // Act
      const balance = account.getBalance();
      
      // Assert
      expect(balance).toBe(0);
    });

    test('debe retornar el saldo correcto después de operaciones', () => {
      // Arrange
      const account = new BankAccount('Roberto');
      
      // Act
      account.deposit(100);
      account.withdraw(30);
      account.deposit(50);
      
      // Assert
      expect(account.getBalance()).toBe(120);
    });
  });

  describe('hasFunds()', () => {
    test('Caso 9: Verificar fondos suficientes', () => {
      // Arrange
      const account = new BankAccount('Patricia');
      account.deposit(50);
      
      // Act
      const result = account.hasFunds(20);
      
      // Assert
      expect(result).toBe(true);
    });

    test('Caso 10: Verificar fondos insuficientes', () => {
      // Arrange
      const account = new BankAccount('Fernando');
      account.deposit(10);
      
      // Act
      const result = account.hasFunds(50);
      
      // Assert
      expect(result).toBe(false);
    });

    test('debe retornar true cuando el saldo es exactamente igual a la cantidad', () => {
      // Arrange
      const account = new BankAccount('Isabel');
      account.deposit(100);
      
      // Act & Assert
      expect(account.hasFunds(100)).toBe(true);
    });

    test('debe retornar true cuando se consulta por 0', () => {
      // Arrange
      const account = new BankAccount('Jorge');
      
      // Act & Assert
      expect(account.hasFunds(0)).toBe(true);
    });
  });

  describe('transferTo()', () => {
    test('Caso 11: Transferencia válida entre cuentas', () => {
      // Arrange
      const account1 = new BankAccount('Cuenta Origen');
      const account2 = new BankAccount('Cuenta Destino');
      account1.deposit(100);
      
      // Act
      account1.transferTo(50, account2);
      
      // Assert
      expect(account1.getBalance()).toBe(50);
      expect(account2.getBalance()).toBe(50);
    });

    test('Caso 12: Transferencia con saldo insuficiente', () => {
      // Arrange
      const account1 = new BankAccount('Origen');
      const account2 = new BankAccount('Destino');
      account1.deposit(100);
      
      // Act & Assert
      expect(() => account1.transferTo(200, account2)).toThrow('Insufficient funds');
    });

    test('Caso 13: Transferencia a objeto que no es BankAccount', () => {
      // Arrange
      const account = new BankAccount('Cuenta');
      account.deposit(100);
      const notAnAccount = { balance: 0 };
      
      // Act & Assert
      expect(() => account.transferTo(50, notAnAccount)).toThrow('The target must be a BankAccount');
    });

    test('debe lanzar error al transferir cantidad negativa', () => {
      // Arrange
      const account1 = new BankAccount('Origen');
      const account2 = new BankAccount('Destino');
      account1.deposit(100);
      
      // Act & Assert
      expect(() => account1.transferTo(-50, account2)).toThrow('Withdraw amount must be positive');
    });

    test('debe lanzar error al transferir desde cuenta cerrada', () => {
      // Arrange
      const account1 = new BankAccount('Origen');
      const account2 = new BankAccount('Destino');
      account1.deposit(100);
      account1.closeAccount();
      
      // Act & Assert
      expect(() => account1.transferTo(50, account2)).toThrow('Account is closed');
    });

    test('transferencia completa debe dejar saldo origen en 0', () => {
      // Arrange
      const account1 = new BankAccount('Origen');
      const account2 = new BankAccount('Destino');
      account1.deposit(75);
      
      // Act
      account1.transferTo(75, account2);
      
      // Assert
      expect(account1.getBalance()).toBe(0);
      expect(account2.getBalance()).toBe(75);
    });
  });

  describe('closeAccount()', () => {
    test('Caso 14: Cerrar cuenta abierta', () => {
      // Arrange
      const account = new BankAccount('Cuenta');
      account.deposit(500);
      
      // Act
      account.closeAccount();
      
      // Assert
      expect(account.isClosed).toBe(true);
      expect(account.getBalance()).toBe(0);
    });

    test('Caso 15: Cerrar cuenta ya cerrada', () => {
      // Arrange
      const account = new BankAccount('Cuenta');
      account.deposit(100);
      account.closeAccount();
      
      // Act & Assert
      expect(() => account.closeAccount()).toThrow('Account already closed');
    });

    test('debe poder cerrar cuenta con saldo 0', () => {
      // Arrange
      const account = new BankAccount('Cuenta');
      
      // Act
      account.closeAccount();
      
      // Assert
      expect(account.isClosed).toBe(true);
      expect(account.getBalance()).toBe(0);
    });
  });

  describe('Integración - Casos complejos', () => {
    test('debe manejar múltiples operaciones en secuencia', () => {
      // Arrange
      const account = new BankAccount('Usuario Complejo');
      
      // Act
      account.deposit(1000);
      account.withdraw(200);
      account.deposit(500);
      account.withdraw(300);
      
      // Assert
      expect(account.getBalance()).toBe(1000);
    });

    test('debe permitir múltiples transferencias entre cuentas', () => {
      // Arrange
      const account1 = new BankAccount('Cuenta A');
      const account2 = new BankAccount('Cuenta B');
      const account3 = new BankAccount('Cuenta C');
      
      account1.deposit(1000);
      
      // Act
      account1.transferTo(300, account2);
      account1.transferTo(200, account3);
      account2.transferTo(100, account3);
      
      // Assert
      expect(account1.getBalance()).toBe(500);
      expect(account2.getBalance()).toBe(200);
      expect(account3.getBalance()).toBe(300);
    });

    test('no debe permitir ninguna operación después de cerrar cuenta', () => {
      // Arrange
      const account = new BankAccount('Cuenta Cerrada');
      account.deposit(100);
      account.closeAccount();
      
      // Assert - todas estas operaciones deben fallar
      expect(() => account.deposit(50)).toThrow('Account is closed');
      expect(() => account.withdraw(10)).toThrow('Account is closed');
      
      const otherAccount = new BankAccount('Otra');
      expect(() => account.transferTo(10, otherAccount)).toThrow('Account is closed');
    });
  });
});
