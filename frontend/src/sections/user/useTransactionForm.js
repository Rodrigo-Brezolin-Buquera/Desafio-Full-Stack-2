import React from "react";
import { useForm } from "react-hook-form";
import { api } from "../../api/config";
import { getHeaders } from "../../utils/storageManager";

export const useTransactionForm = (id, setReloadTrigger) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (data) => {
    try {
      const body = {
        ...data,
        value: Number(data.value),
        cpf: id,
      };
      await api.post(
        "/transaction",
        body,
        getHeaders()
      );
      reset();
      setReloadTrigger((prev) => !prev); 

    } catch (error) {
      console.log(error);
    }
  };

  return { register, handleSubmit, onFormSubmit, errors };
};
