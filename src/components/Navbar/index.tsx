import kurebiimage from "../../assets/kurebiverse.png";
import { useSelector } from "react-redux";
import { User } from "@supabase/supabase-js";
import UserNavbar from "@/components/Navbar/components/User.tsx";
import Sidebar from "@/components/Navbar/components/Sidebar.tsx";
import {Input} from "@/components/ui/input.tsx";
import {FormEvent, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export function Navbar() {
  const { user } = useSelector((state: { user: { user: User } }) => state.user);
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation()

  const invalidPathname = [
    "/login"
  ]

  const handleSubmit = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    navigate(`/search/${userInput}`);
    setUserInput("");
  };

  if (invalidPathname.includes(pathname)) return null;

  return (
    <nav className={"absolute z-50 h-28 w-screen flex justify-between items-center md:px-11 px-3"}>
      <div className={"flex items-center gap-2"}>
        <Sidebar/>
        <a href={"/"} className={"lg:block hidden h-auto lg:w-48 md:w-36 w-28"}>
          <img src={kurebiimage} alt={"logo"}/>
        </a>
      </div>
      <a href={"/"} className={"lg:hidden block h-auto lg:w-48 md:w-36 w-28"}>
        <img src={kurebiimage} alt={"logo"}/>
      </a>
      <div className={"lg:block w-96 hidden"}>
        <Input
          type="text" placeholder="Search"
          onChange={(event) => setUserInput(event.target.value)}
          onSubmit={(event) => handleSubmit(event)}
        />
      </div>
      <UserNavbar user={user}/>
    </nav>
  )
}
