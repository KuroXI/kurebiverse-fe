import kurebiimage from "../../assets/kurebiverse.png";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

type AuthenticationProps = {
  type: string;
};

export const Authentication = ({ type }: AuthenticationProps) => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen max-w-sm mx-auto relative animate-slideIn">
      <img src={kurebiimage} alt="logo" className="w-80" />
      {type === "login" && <Login />}
      {type === "register" && <Register />}
    </div>
  );
};
