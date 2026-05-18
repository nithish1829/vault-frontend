import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProtectedRoute({ children }) {

  const unlocked = localStorage.getItem("vaultUnlocked");

  if (unlocked !== "true") {
    return <Navigate to="/calc" />;
  }

  return children;
}

export default ProtectedRoute;