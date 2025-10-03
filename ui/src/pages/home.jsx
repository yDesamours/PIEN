import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      navigate("/auth/login");
    } else {
      const path = `/${user.role.toLowerCase()}/dashboard`;
      navigate(path);
    }
  }, [user]);

  return <p></p>;
}
