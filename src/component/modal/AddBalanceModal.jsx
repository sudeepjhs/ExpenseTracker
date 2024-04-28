import { enqueueSnackbar } from "notistack";
import React, { useContext } from "react";
import Modal from "react-modal";
import { ExpenseContext } from "../../ExpenseContext";

const AddBalanceModal = ({ modalIsOpen, setIsOpen }) => {
  const { setWalletBalance } = useContext(ExpenseContext);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddBalance = (e) => {
    e.preventDefault();
    const amount = document.getElementById("income-amount").value;
    setWalletBalance((prev) => prev + parseInt(amount));
    closeModal();
    enqueueSnackbar("Balance Added", { variant: "success" });
  };
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
      <h3>Add Balance</h3>
      <form id="balanceForm" onSubmit={handleAddBalance}>
        <input
          type="number"
          placeholder="Income Amount"
          name="amount"
          min={1}
          required
          id="income-amount"
        />
        <button type="submit">Add Balance</button>
        <button type="reset" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default AddBalanceModal;
