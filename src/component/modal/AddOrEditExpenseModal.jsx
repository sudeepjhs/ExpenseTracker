import { enqueueSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { ExpenseContext } from "../../ExpenseContext";
import { Categories } from "../../config";

const AddOrEditExpenseModal = ({
  modalIsOpen,
  setIsOpen,
  isEditable,
  transactionId,
}) => {
  const { expenseData, setExpenseData, walletBalance, setWalletBalance } =
    useContext(ExpenseContext);
  const [expense, setExpense] = useState({
    name: "",
    amount: 0,
    category: "",
    date: "",
  });
  const resetExpense = () => {
    setExpense(() => ({
      name: "",
      amount: 0,
      category: "",
      date: "",
    }));
  };
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (isEditable) {
      const diff =
        parseInt(expense.amount) - parseInt(expenseData[transactionId].amount);
      if (walletBalance < diff) {
        enqueueSnackbar("Doesn't have sufficient balance in wallet", {
          variant: "error",
        });
        return;
      }
      let temp = [...expenseData];
      temp[transactionId] = expense;
      setWalletBalance((prev) => prev - diff);
      setExpenseData(() => temp);
      enqueueSnackbar("Transaction updated", { variant: "success" });
    } else {
      if (walletBalance < parseInt(expense.amount)) {
        enqueueSnackbar("Doesn't have sufficient balance in wallet", {
          variant: "error",
        });
        return;
      }
      setWalletBalance((prev) => prev - parseInt(expense.amount));
      setExpenseData((prev) => [...prev, expense]);
    }
    closeModal();
  };
  const closeModal = () => {
    setIsOpen(false);
    resetExpense();
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (!isEditable || !expenseData || transactionId == null || !modalIsOpen)
      return;
    setExpense(() => expenseData[transactionId]);
  }, [transactionId, isEditable, expenseData, modalIsOpen]);

  return (
    <Modal
      ariaHideApp={false}
      style={{
        content: {
          height: "fit-content",
          maxWidth: "50vw",
          width: "fit-content",
          margin: "auto",
          background: "#EFEFEFD9",
        },
      }}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
    >
      <h3>Add Expenses</h3>
      <form id="expenseForm" onSubmit={handleAddExpense}>
        <input
          type="text"
          value={expense.name}
          name="name"
          placeholder="Title"
          onChange={onChangeHandler}
          required
        />
        <input
          type="number"
          value={expense.amount}
          placeholder="Price"
          name="amount"
          min={1}
          onChange={onChangeHandler}
          required
        />
        <select
          value={expense.category}
          name="category"
          onChange={onChangeHandler}
          required
        >
          <option disabled value="">
            Select Category
          </option>
          {Categories.map((cat, i) => (
            <option key={"category-" + i}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          onChange={onChangeHandler}
          name="date"
          value={expense.date}
          required
        />
        <button type="submit">{isEditable ? "Update" : "Add"} Expense</button>
        <button type="reset" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default AddOrEditExpenseModal;
