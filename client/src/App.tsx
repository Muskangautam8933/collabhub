import { Outlet } from "react-router";
import AuthGaurd from "./providers/auth-gaurd";
import GlobalContextProvider from "./providers/global";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <AuthGaurd>
        <ToastContainer />
        <GlobalContextProvider>
          <Outlet />
        </GlobalContextProvider>
      </AuthGaurd>
    </>
  );
}
