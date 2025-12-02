import { useNavigate } from "react-router-dom";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { capitalize } from "../../../utils/utils";
import useApi from "../../../hooks/api";
import USER from "../../../services/api/user";
import { AuthContext } from "../../../context/authContext";

const LoginForm = forwardRef(function (
  { className, handleValueChange = () => {} },
  ref
) {
  const [userData, setUserData] = useState({
    role: "",
    email: "",
    password: "",
    showPassword: false,
  });
  const [error, setError] = useState(null);

  const { execute } = useApi();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onchange = ({ target }) => {
    setUserData((state) => ({
      ...state,
      [target.name]: target.value,
    }));
  };

  const onTogglePassword = () => {
    setUserData((state) => ({
      ...state,
      showPassword: !state.showPassword,
    }));
  };

  const onReset = () => {
    setUserData((state) => ({
      role: "",
      email: "",
      password: "",
      showPassword: state.showPassword,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await execute(
      USER.LOGIN({
        email: userData.email,
        password: userData.password,
        role: userData.role,
      })
    );

    if (result.error) {
      setError(result.error.message);
      setUserData((state) => ({ ...state, email: "", password: "" }));
      return;
    }

    const role = login(result.data);
    navigate("/" + role);
  };

  useEffect(() => {
    setError(null);
    handleValueChange(userData);
  }, [userData]);

  return (
    <>
      <article>
        <form onSubmit={onSubmit} className={className} ref={ref}>
          <fieldset className="flex flex-col gap-2 text-left">
            <legend className="mb-6 text-2xl">Qui etes vous?</legend>
            {["eleve", "enseignant", "gestionnaire"].map((e) => (
              <label
                className="bg-accent w-60 h-10 font-bold text-black cursor-pointer flex justify-center items-center hover:scale-110 transition-transform duration-300"
                key={e}
              >
                {capitalize(e)}
                <input
                  type="radio"
                  name="role"
                  value={e}
                  checked={userData.role === e}
                  onChange={onchange}
                  className="invisible"
                />
              </label>
            ))}
          </fieldset>

          <div className="relative">
            <p
              className={`absolute -top-10 text-center w-full  ${
                error ? "" : "invisible"
              }`}
            >
              {error}
            </p>
            <fieldset>
              <legend className="mb-6 text-2xl text-left">Bienvenue</legend>
              <label className="grid gap-1 mb-2 text-left text-primary">
                Email
                <input
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={onchange}
                  className="border-1 h-8 w-100"
                />
              </label>

              <label className="grid gap-1 text-left text-primary">
                Password
                <input
                  type={userData.showPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={onchange}
                  className="border-1 h-8 w-100"
                />
              </label>

              <div className="flex justify-between mb-2">
                <label>
                  <span className="mr-1">Show Password</span>
                  <input
                    type="checkbox"
                    name="showPassword"
                    onChange={onTogglePassword}
                  />
                </label>

                <a className="cursor-pointer">Forgot Password?</a>
              </div>
              <button type="submit" className="w-full mb-1 bg-primary">
                Login
              </button>
              <span
                role="button"
                onClick={onReset}
                className="text-primary text-xs cursor-pointer"
              >
                Vous n'etes pas {userData.role}?
              </span>
            </fieldset>
          </div>
        </form>
      </article>
    </>
  );
});

export default LoginForm;
