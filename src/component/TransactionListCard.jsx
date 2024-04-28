import React from "react";
import { FaPen, FaRegTimesCircle } from "react-icons/fa";
import { PiPizza } from "react-icons/pi";
import "../styles/TransactionListCard.css";

const TransactionListCard = ({
  transaction,
  transactionId,
  editHandler,
  removeHandler,
}) => {
  return (
    <>
      <div className="list-card">
        <div className="avatar">
          <span className="icon">
            <PiPizza />
            {/* <span>{transaction.category}</span> */}
          </span>
          <div>
            <strong>{transaction.name}</strong>
            <span>{transaction.date}</span>
          </div>
        </div>
        <div className="actions">
          <span>₹{transaction.amount}</span>
          <div>
            <button
              className="action-deny"
              onClick={() => removeHandler(transactionId)}
            >
              <FaRegTimesCircle size={"20px"} />
            </button>
            <button
              onClick={() => editHandler(transactionId)}
              className="action-edit"
            >
              <FaPen size={"20px"} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionListCard;
