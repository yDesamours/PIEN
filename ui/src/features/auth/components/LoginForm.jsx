import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { capltalize } from "../../../utils/utils";
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
  const { execute, requestState } = useApi();
  const { login } = useContext(AuthContext);

  const onchange = ({ target }) => {
    setUserData((state) => ({
      ...state,
      [target.name]: target.value,
    }));
  };

  const ontogglePassword = () => {
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

    login(result);
  };

  useEffect(() => {
    handleValueChange(userData);
  }, [userData]);

  return (
    <>
      <form onSubmit={onSubmit} className={className} ref={ref}>
        <fieldset className="flex flex-col gap-2 text-left">
          <legend className="mb-6 text-2xl">Qui etes vous?</legend>
          {["eleve", "enseignant", "gestionnaire"].map((e) => (
            <label
              className="bg-accent w-60 h-10 font-bold text-black cursor-pointer flex justify-center items-center hover:scale-110 transition-transform duration-300"
              key={e}
            >
              {capltalize(e)}
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
                onChange={ontogglePassword}
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
      </form>
    </>
  );
});

export default LoginForm;
