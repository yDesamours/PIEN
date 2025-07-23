import { useRef, useState } from "react";
import LoginForm from "../features/auth/components/LoginForm";

export default function Login() {
  const formRef = useRef();
  const [position, setPosition] = useState("left-1/2");

  const handleValueChange = ({ role }) => {
    if (role) {
      setPosition("left-0");
    } else {
      setPosition("left-1/2");
    }
  };

  return (
    <main>
      <div
        className={`absolute bg-amber-900 h-full w-1/2 ${position} z-100 transition-all duration-300 ease-in-out`}
      ></div>
      <LoginForm
        handleValueChange={handleValueChange}
        className="grid grid-cols-2 justify-items-center absolute top-1/2 w-full -translate-y-1/2"
        ref={formRef}
      />
    </main>
  );
}
