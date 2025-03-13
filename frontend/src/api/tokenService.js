import { jwtDecode } from "jwt-decode";
import { deleteStorageItem, getStorageItem } from "../utils/storageManager";


export const decodeToken = (token) => {
    
  try {
    const data = jwtDecode(token);

    if (data.exp * 1000 < Date.now()) {
        console.log("Token expirado");
        deleteStorageItem("token")
        return null;
      }
    return data;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};
