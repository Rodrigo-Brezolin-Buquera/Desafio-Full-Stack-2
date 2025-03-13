import { useLayoutEffect } from "react";
import { getStorageItem } from "../utils/storageManager";
import { useNavigate,useLocation } from "react-router-dom";
import { goToAdminPage, goTohome, goToUserPage } from "../router/coordinator";
import { decodeToken } from "../api/tokenService";

export const useProtectedPage = (role) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  useLayoutEffect(() => {
    const token = getStorageItem("token");

    if (!token) {
      goTohome(navigate);
    }
    const tokenData = decodeToken(token)
    const isAdmin = tokenData.role === "admin"
    const onAdminPage = pathname === "/admin"
    if(onAdminPage && !isAdmin) goToUserPage(navigate)

  });

};
