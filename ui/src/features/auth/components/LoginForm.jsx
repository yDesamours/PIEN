import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

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

  const onchange = ({ target }) => {
    console.log(target.value);
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

  useEffect(() => {
    handleValueChange(userData);
  }, [userData]);

  const onSubmit = (formData) => {
    console.log(formData);
  };

  const credentialsElements = (
    <div>
      <label className="grid gap-1 mb-2">
        <span className="text-left">
          Email <span className="text-red-800">*</span>
        </span>
        <input
          type="text"
          name="email"
          value={userData.email}
          onChange={onchange}
          className="border-1 h-8 w-100"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-left">
          Password <span className="text-red-800">*</span>
        </span>
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

        <a>Forgot Password?</a>
      </div>
      <button type="submit" className="w-full">
        Login
      </button>
    </div>
  );

  const roleElements = (
    <div>
      {["eleve", "enseignant", "gestionnaire"].map((e) => (
        <div key={e}>
          <label>
            {e}
            <input
              type="radio"
              name="role"
              value={e}
              checked={userData.role === e}
              onChange={onchange}
              className="invisible"
            />
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <form onSubmit={onSubmit} className={className} ref={ref}>
      {roleElements}
      {credentialsElements}
    </form>
  );
});

export default LoginForm;
