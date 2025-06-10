import BlockUIProvider from "../context/blockUI";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <BlockUIProvider>
      <Outlet />
    </BlockUIProvider>
  );
}
