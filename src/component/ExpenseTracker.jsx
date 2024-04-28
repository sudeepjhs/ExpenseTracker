import React, { memo, useContext, useState } from "react";
import "../styles/ExpenseTracker.css";
import ExpenseChart from "./ExpenseChart";
import Card from "./common/Card";
import AddOrEditExpenseModal from "./modal/AddOrEditExpenseModal";
import AddBalanceModal from "./modal/AddBalanceModal";
import { ExpenseContext } from "../ExpenseContext";
import { generateExpenseChartData } from "../helper/helper";

const ExpenseTracker = ({ expenseData }) => {
  const { walletBalance } = useContext(ExpenseContext);
  const expense =
    expenseData?.reduce((prev, a) => prev + parseInt(a.amount), 0) || 0;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  return (
    <>
      <h1>Expense Tracker</h1>
      <Card className="expense-tracker">
        <Card className="wallet-balance">
          <p>
            Wallet Balance: <span>₹{walletBalance}</span>
          </p>
          <button onClick={() => setWalletModal(true)}>+ Add Income</button>
        </Card>
        <Card className="expenses">
          <p>
            Expenses: <span>₹{expense}</span>
          </p>
          <button onClick={() => setIsOpen(true)}>+ Add Expense</button>
        </Card>
        {expenseData !== undefined && (
          <ExpenseChart expenseData={generateExpenseChartData(expenseData)} />
        )}
      </Card>
      <AddOrEditExpenseModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <AddBalanceModal modalIsOpen={walletModal} setIsOpen={setWalletModal} />
    </>
  );
};

export default memo(ExpenseTracker);
