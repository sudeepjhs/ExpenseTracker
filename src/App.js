import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import "./App.css";
import { ExpenseContext } from "./ExpenseContext";
import ExpenseTracker from "./component/ExpenseTracker";
import RecentTransactions from "./component/RecentTransactions";
import TopExpenseChat from "./component/TopExpenseChat";
import { generateExpenseChartData } from "./helper/helper";

function App() {
  const [expenseData, setExpenseData] = useState([]);
  const [walletBalance, setWalletBalance] = useState(-1);

  useEffect(() => {
    let data = localStorage.getItem("expenseData");
    let balance = localStorage.getItem("walletBalance");
    if (data !== null) {
      setExpenseData(() => JSON.parse(data));
    }
    if (balance !== null) {
      setWalletBalance(() => parseInt(balance));
    } else {
      setWalletBalance(() => parseInt(5000));
    }
  }, []);

  useEffect(() => {
    if (expenseData.length > 0)
      localStorage.setItem("expenseData", JSON.stringify(expenseData));
  }, [expenseData]);

  useEffect(() => {
    if (walletBalance >= 0)
      localStorage.setItem("walletBalance", walletBalance);
  }, [walletBalance]);

  return (
    <ExpenseContext.Provider
      value={{ expenseData, setExpenseData, walletBalance, setWalletBalance }}
    >
      <SnackbarProvider
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <div className="container">
          <ExpenseTracker expenseData={expenseData} />
          <div className="transaction-container">
            <RecentTransactions />
            <div className="top-expenses">
              <h2>Top Expenses</h2>
              <div className="top-expenses-chart-container">
                {expenseData !== undefined && (
                  <TopExpenseChat
                    expenseData={generateExpenseChartData(expenseData)}
                  />
                )}
              </div>
              {/* </Card> */}
            </div>
          </div>
        </div>
      </SnackbarProvider>
    </ExpenseContext.Provider>
  );
}

export default App;
