import { useState } from "react";
import { goToUser, goToAdmin } from "../routes/coordinator"
import { getStorageItem } from "../utils/storageManager";
import { useNavigate } from "react-router-dom";


export const useUnprotectedPage = async () => {
    const navigate = useNavigate()


    //     useLayoutEffect(() => {
    //         const token = getStorageItem("token")
    //         if(!token) {
    //             history.push('/login')
    //         }
    // })
}



