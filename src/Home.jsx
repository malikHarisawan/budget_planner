
import React, { useState, useEffect } from 'react';

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
    const initialTransactions = localStorageTransactions || [];
    setTransactions(initialTransactions);
  }, []);

  const addTransaction = (e) => {
    e.preventDefault();
    if (text === '' || amount === '') {
      alert('Please add text and amount');
    } else {
      const newTransaction = {
        id: generateID(),
        text,
        amount: +amount,
      };
      setTransactions([...transactions, newTransaction]);
      updatelocalStorage();
      setText('');
      setAmount('');
    }
  };

  const removeItem = (id) => {
    const updatedTransactions = transactions.filter((trans) => trans.id !== id);
    setTransactions(updatedTransactions);
    updatelocalStorage();
  };

  const generateID = () => {
    return Math.floor(Math.random() * 100);
  };

  const updatelocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  };

  const addTransactionDOM = (trans) => {
    const sign = trans.amount < 0 ? '-' : '+';
    return (
      <li key={trans.id} className={trans.amount < 0 ? 'minus' : 'plus'}>
        {trans.text} <span>{`${sign} ${Math.abs(trans.amount)}`}</span>
        <button className="delete-btn" onClick={() => removeItem(trans.id)}>
          x
        </button>
      </li>
    );
  };

  const updateValues = () => {
    const amountArray = transactions.map((item) => item.amount);
    const total = amountArray.reduce((sum, num) => sum + num, 0).toFixed(2);
    const income = amountArray.filter((item) => item > 0).reduce((sum, num) => sum + num, 0).toFixed(2);
    const expense = amountArray.filter((item) => item < 0).reduce((sum, num) => sum + num, 0).toFixed(2);

    return { total, income, expense };
  };

  const { total, income, expense } = updateValues();

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.h1}>Budget Planner</h2>

        <h4>Your Balance</h4>
        <h1 id="balance">${total}</h1>

        <div style={styles['.inc-exp-container']}>
          <div>
            <h4>Income</h4>
            <p id="money-plus" className="money plus">
              +${income}
            </p>
          </div>
          <div>
            <h4>Expense</h4>
            <p id="money-minus" className="money minus">
              -${expense}
            </p>
          </div>
        </div>

        <h3>History</h3>
        <ul id="list" className="list">
          {transactions.map(addTransactionDOM)}
        </ul>

        <h3>Add new transaction</h3>
        <form onSubmit={addTransaction}>
          <div style={styles['.form-control']}>
            <label htmlFor="text">Text</label>
            <input
              type="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
              style={styles['input[type=\'text\'], input[type=\'number\']']}
            />
          </div>
          <div style={styles['.form-control']}>
            <label htmlFor="amount">
              Amount <br />
              (negative - expense, positive + income)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              style={styles['input[type=\'text\'], input[type=\'number\']']}
            />
          </div>
          <button className="btn" type="submit" style={styles.btn}>
            Add transaction
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  ':root': {
    '--box-shadow': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  },
  body: {
    
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'justify-content': 'center',
    'min-height': '100vh',
    margin: 0,
  },
  container: {
    margin: '30px auto',
    width: '350px',
  },
  h1: {
    'letter-spacing': '1px',
    margin: 0,
  },
  h3: {
    'border-bottom': '1px solid #bbb',
    'padding-bottom': '10px',
    margin: '40px 0 10px',
  },
  h4: {
    margin: 0,
    'text-transform': 'uppercase',
  },
  '.inc-exp-container': {
    'box-shadow': 'var(--box-shadow)',
    padding: '20px',
    display: 'flex',
    'justify-content': 'space-between',
    margin: '20px 0',
  },
  '.inc-exp-container > div': {
    flex: 1,
    'text-align': 'center',
  },
  '.inc-exp-container > div:first-of-type': {
    'border-right': '1px solid #dedede',
  },
  money: {
    'font-size': '20px',
    'letter-spacing': '1px',
    margin: '5px 0',
  },
  '.money.plus': {
    color: '#2ecc71',
  },
  '.money.minus': {
    color: '#c0392b',
  },
  label: {
    display: 'inline-block',
    margin: '10px 0',
  },
  'input[type=\'text\'], input[type=\'number\']': {
    border: '1px solid #dedede',
    'border-radius': '2px',
    display: 'block',
    'font-size': '16px',
    padding: '10px',
    width: '100%',
  },
  btn: {
    cursor: 'pointer',
    'background-color': '#9c88ff',
    'box-shadow': 'var(--box-shadow)',
    color: '#fff',
    border: 0,
    display: 'block',
    'font-size': '16px',
    margin: '10px 0 30px',
    padding: '10px',
    width: '100%',
  },
  '.btn:focus, .delete-btn:focus': {
    outline: 0,
  },
  list: {
    'list-style-type': 'none',
    padding: 0,
    'margin-bottom': '40px',
  },
  'list li': {
    'background-color': '#fff',
    'box-shadow': 'var(--box-shadow)',
    color: '#333',
    display: 'flex',
    'justify-content': 'space-between',
    position: 'relative',
    padding: '10px',
    margin: '10px 0',
  },
  'list li.plus': {
    'border-right': '5px solid #2ecc71',
  },
  'list li.minus': {
    'border-right': '5px solid #c0392b',
  },
  deleteBtn: {
    cursor: 'pointer',
    'background-color': '#e74c3c',
    border: 0,
    color: '#fff',
    'font-size': '20px',
    'line-height': '20px',
    padding: '2px 5px',
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translate(-100%, -50%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  'list li:hover .delete-btn': {
    opacity: 1,
  },
};

export default ExpenseTracker;
