import { goTohome } from "../router/coordinator"
import { deleteStorageItem } from "../utils/storageManager"


export const handleLogout = (navigate) => {
    deleteStorageItem("token")
    goTohome(navigate)
}