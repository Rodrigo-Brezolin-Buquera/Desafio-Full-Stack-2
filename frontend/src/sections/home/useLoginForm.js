import React from 'react'
import { api } from '../../api/config';
import { decodeToken } from '../../api/tokenService';
import { useForm } from 'react-hook-form';
import { setStorageItem } from '../../utils/storageManager';
import { goToUserPage, goToAdminPage } from '../../router/coordinator';

export const useLoginForm = (navigate) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
  

    const onFormSubmit = async (body) => {
         try {
           const {data} = await api.post("/login", body);
           setStorageItem("token", data.token);
           const tokenData =   decodeToken(data.token)
           const isAdmin = tokenData.role === "admin"
           if(isAdmin) goToAdminPage(navigate)
           else goToUserPage(navigate, tokenData.id)
       
         } catch (error) {
           if (error.response) {
               console.error("Erro do Backend:", error.response.data);
               console.log(error.response.data.message || "Erro desconhecido do servidor");
           } else if (error.request) {
               console.error("Erro de Conexão:", error.request);
               console.log("Erro de conexão com o servidor. Tente novamente.");
           } else {
               console.error("Erro inesperado:", error.message);
               console.log("Ocorreu um erro inesperado. Verifique o console.");
           }  }


    };
  
  
    return {register, handleSubmit, onFormSubmit, errors  }
}
