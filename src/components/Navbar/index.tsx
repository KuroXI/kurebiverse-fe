import kurebiimage from "../../assets/kurebiverse.png";
import { useSelector } from "react-redux";
import UserNavbar from "@/components/Navbar/components/User.tsx";
import Sidebar from "@/components/Navbar/components/Sidebar.tsx";
import { Input } from "@/components/ui/input.tsx";
import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { selectorProps } from "@/type/Redux";

export function Navbar() {
  const { user } = useSelector((state : selectorProps) => state);
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const invalidPathname = ["/login"];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserInput("");
    navigate(`/search/${userInput}`);
  };

  if (invalidPathname.includes(pathname)) return null;

  return (
    <nav
      className={"h-28 w-full flex justify-between items-center md:px-11 px-3"}
    >
      <div className={"flex items-center gap-2"}>
        <Sidebar />
        <Link
          to={"/"}
          className={"lg:block hidden h-auto lg:w-48 md:w-36 w-28"}
        >
          <img src={kurebiimage} alt={"logo"} />
        </Link>
      </div>
      <Link to={"/"} className={"lg:hidden block h-auto lg:w-48 md:w-36 w-28"}>
        <img src={kurebiimage} alt={"logo"} />
      </Link>
      <div className={"lg:block w-96 hidden"}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Input
            type="text"
            placeholder="Search"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
          />
        </form>
      </div>
      <UserNavbar user={user} />
    </nav>
  );
}
