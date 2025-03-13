import React from "react";
import { useForm } from "react-hook-form";
import { api } from "../../api/config";
import { getHeaders } from "../../utils/storageManager";

export const useTransactionForm = (id, setErrorMessage,setReloadTrigger) => {
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
      setReloadTrigger((prevState) =>!prevState); 
      setErrorMessage(null)

    } catch (error) {
      if (error.response) {
        console.error("Erro do Backend:", error.response.data);
        setErrorMessage(error.response.data.message || "Erro desconhecido do servidor");
    } else if (error.request) {
        console.error("Erro de Conexão:", error.request);
        setErrorMessage("Erro de conexão com o servidor. Tente novamente.");
    } else {
        console.error("Erro inesperado:", error.message);
        setErrorMessage("Ocorreu um erro inesperado. Verifique o console.");
    } 
    }
  };

  return { register, handleSubmit, onFormSubmit, errors };
};
