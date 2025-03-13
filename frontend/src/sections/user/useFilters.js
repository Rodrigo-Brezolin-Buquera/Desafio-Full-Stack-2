import React, { useState } from "react";

export const useFilters = (data) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  const filteredData = data?.filter((transaction) => {
    const transactionDate = new Date(transaction.transaction_date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (  
      (!start || transactionDate >= start) &&
      (!end || transactionDate <= end) &&
      (!status || transaction.status === status)
    );
  });

  const values = {
    startDate,
    endDate,
    status,
  };
  const handlers = {
    handlestartDate: setStartDate,
    handleendDate: setEndDate,
    handlestatus: setStatus,
  };

  const clearAll = () => {
    setStartDate("");
    setEndDate("");
    setStatus("");
  };

  return { filteredData, values, handlers, clearAll };
};
