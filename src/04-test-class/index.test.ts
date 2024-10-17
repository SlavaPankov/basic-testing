// Uncomment the code below and write your tests
import { getBankAccount, BankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';
import lodash from 'lodash';

let account: BankAccount;
let transferAccount: BankAccount;
let balance: number;
let moreBalance: number;

beforeEach(() => {
  balance = 1000;
  moreBalance = 2000;
  account = getBankAccount(balance);
  transferAccount = getBankAccount(moreBalance);
});

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(moreBalance)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(moreBalance, transferAccount)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(balance, account)).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(account.deposit(moreBalance).getBalance()).toBe(moreBalance + balance);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(500).getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    expect(account.transfer(balance, transferAccount).getBalance()).toBe(0);
    expect(transferAccount.getBalance()).toBe(moreBalance + balance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    
    const balance = await account.fetchBalance();

    expect(balance).toBe(1);

    jest.restoreAllMocks();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(moreBalance);
    
    await account.synchronizeBalance();
    
    const balance = account.getBalance();
    
    expect(balance).toBe(moreBalance);
    
    jest.restoreAllMocks();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    
    expect(async () => await account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);

    jest.restoreAllMocks();
  });
});
