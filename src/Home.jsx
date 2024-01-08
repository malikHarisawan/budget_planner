import React, { useState, useEffect } from 'react';
import './home.css';

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
    <div className="body">
      <div className="container">
        <h2 className="h1">Budget Planner</h2>

        <h4>Your Balance</h4>
        <h1 id="balance">${total}</h1>

        <div className="inc-exp-container">
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
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
              className="input"
            />
          </div>
          <div className="form-control">
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
              className="input"
            />
          </div>
          <button
          onClick={()=>{
           
           fetch("http://localhost:3000/admin/addTrans", {
            method : "POST",
            body: JSON.stringify({
              title:text,
              amount:amount
            }),
            headers:{
              "content-type": "application/json",
              "Authorization":"Bearer "+localStorage.getItem("token")
            }

           })
          
          }}
          
          className="btn" type="submit">
            Add transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseTracker;
