import { useLayoutEffect, useState } from "react";
import { goToLogin } from "../routes/coordinator"
import { deleteStorageItem, getStorageItem } from "../utils/storageManager";
import { useNavigate } from "react-router-dom";


export const useProtectedPage = (role) => {
    const navigate = useNavigate()

    // useLayoutEffect(() => {
    //     const token = getStorageItem("token")
    //       if(!token) {
    //         goToAdmin(navigate)
    //       }
    //   })


};

