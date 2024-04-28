import { closeSnackbar, enqueueSnackbar } from "notistack";
import React, { useContext, useMemo, useRef, useState } from "react";
import { ExpenseContext } from "../ExpenseContext";
import "../styles/RecentTransactions.css";
import Pagination from "./Pagination";
import TransactionListCard from "./TransactionListCard";
import Card from "./common/Card";
import AddOrEditExpenseModal from "./modal/AddOrEditExpenseModal";

const PageSize = 3;

const RecentTransactions = () => {
  const { expenseData, setExpenseData, setWalletBalance } =
    useContext(ExpenseContext);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return expenseData?.length
      ? expenseData.slice(firstPageIndex, lastPageIndex)
      : [];
  }, [currentPage, expenseData]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const selectedTransactionId = useRef(null);
  const removeTransaction = () => {
    let id = selectedTransactionId.current;
    if (id == null) return;
    let temp = [...expenseData];
    const transactionAmount = temp[id].amount;
    temp.splice(id, 1);
    setExpenseData(() => temp);
    setWalletBalance((prev) => prev + parseInt(transactionAmount));
    selectedTransactionId.current = null;
    enqueueSnackbar("Transaction removed", { variant: "success" });
    if (temp.length === 0)
      localStorage.setItem("expenseData", JSON.stringify(temp));
  };
  const action = (snackbarId) => (
    <>
      <button
        style={{
          color: "rgb(0, 187, 255)",
          outline: "none",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          margin: "0px",
          userSelect: "none",
        }}
        onClick={() => {
          removeTransaction();
          closeSnackbar(snackbarId);
        }}
      >
        Yes,Remove
      </button>
      <button
        style={{
          color: "rgb(255, 23, 68)",
          outline: "none",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          margin: "0px",
          userSelect: "none",
        }}
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        Dismiss
      </button>
    </>
  );
  const showRemoveTransactionConfirmation = (transactionId) => {
    selectedTransactionId.current = transactionId;
    enqueueSnackbar("Are you sure to delete this transaction ?", {
      variant: "default",
      action,
      persist: true,
      anchorOrigin: { horizontal: "center", vertical: "top" },
    });
  };
  const showEditTransactionModal = (transactionId) => {
    selectedTransactionId.current = transactionId;
    setIsOpen(true);
  };
  return (
    <div className="recent-transactions">
      <h2>Recent Transactions</h2>
      {expenseData?.length ? (
        <Card>
          {currentTableData.map((transaction, index) => (
            <TransactionListCard
              key={"transaction-" + index}
              transaction={transaction}
              transactionId={index}
              removeHandler={showRemoveTransactionConfirmation}
              editHandler={showEditTransactionModal}
            />
          ))}
          <div className="footer">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={expenseData?.length || 0}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </Card>
      ) : (
        <div className="notFound">No Recent Transactions found</div>
      )}
      <AddOrEditExpenseModal
        isEditable={true}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        transactionId={selectedTransactionId.current}
      />
    </div>
  );
};

export default RecentTransactions;
