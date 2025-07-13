import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

export default function PrivateOnly({ children, role }) {
  const { user } = useContext(AuthContext);
  // if (!user) return <Navigate to="/" />;
  // if (user.role.toLowerCase() !== role.toLowerCase()) return <NotFound />;
  return <>{children}</>;
}
