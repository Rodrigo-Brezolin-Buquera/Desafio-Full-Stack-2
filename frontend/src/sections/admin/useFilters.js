import React, { useState } from "react";

export const useFilters = (data) => {
  const [cpf, setCpf] = useState("");
  const [product, setProduct] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [status, setStatus] = useState("");

  const filteredData = data?.filter((transaction) => {
    const transactionDate = new Date(transaction.transaction_date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const value = Number(transaction.value);

    return (
      (!cpf || transaction.cpf.includes(cpf)) &&
      (!product ||
        transaction.description
          .toLowerCase()
          .includes(product.toLowerCase())) &&
      (!start || transactionDate >= start) &&
      (!end || transactionDate <= end) &&
      (!minValue || value >= Number(minValue)) &&
      (!maxValue || value <= Number(maxValue)) &&
      (!status || transaction.status === status)
    );
  });

  const values = {
    cpf,
    product,
    startDate,
    endDate,
    minValue,
    maxValue,
    status,
  };
  const handlers = {
    handlecpf: setCpf,
    handleproduct: setProduct,
    handlestartDate: setStartDate,
    handleendDate: setEndDate,
    handleminValue: setMinValue,
    handlemaxValue: setMaxValue,
    handlestatus: setStatus,
  };

  const clearAll = () => {
    setCpf("");
    setProduct("");
    setStartDate("");
    setEndDate("");
    setMinValue("");
    setMaxValue("");
    setStatus("");
  };

  return { filteredData, values, handlers, clearAll };
};
