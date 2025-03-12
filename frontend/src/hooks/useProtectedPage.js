import { useLayoutEffect } from "react";
import { getStorageItem } from "../utils/storageManager";
import { useNavigate } from "react-router-dom";
import { goToAdminPage, goTohome, goToUserPage } from "../router/coordinator";

export const useProtectedPage = (role) => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const token = getStorageItem("token");
    if (!token) {
      goTohome(navigate);
    }
  });
};
