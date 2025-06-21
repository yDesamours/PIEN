import { useContext, useEffect } from "react";
import Loading from "../layouts/loading";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      navigate("/auth/login");
    } else {
      const path = `/${user.role.toLowerCase()}/dashboard`;
      navigate(path);
    }
  }, [user]);

  return <Loading />;
}
