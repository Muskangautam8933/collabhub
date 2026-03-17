import { Outlet } from "react-router";
import SocketContextProvider from "./providers/socket";

export default function PrivateLayout() {
  return (
    <>
      <SocketContextProvider>
        <Outlet />
      </SocketContextProvider>
    </>
  );
}
