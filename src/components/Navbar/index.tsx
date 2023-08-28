import { FormEvent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { Cancel, Menu as MenuIcon, Search } from "@mui/icons-material";
import { Input, IconButton } from "@material-tailwind/react";
import kurebiimage from "../../assets/kurebiverse.png";
import { LoggedIn, NotLoggedIn } from "./components/ProfileMenu.tsx";
import { useSelector } from "react-redux";
import { User } from "@supabase/supabase-js";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { user } = useSelector((state: { user: { user: User } }) => state.user);
  const navigate = useNavigate();

  const handleMenuOpen = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search/${userInput}`);
    setUserInput("");
  };

  const handleChangeInput = (value: string) => {
    setUserInput(value);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <Box
      component={"nav"}
      className={`sticky top-0 left-0 z-[99] h-max w-screen rounded-none py-2 px-4 lg:py-3 bg-[#121212]/50 backdrop-blur-md`}
    >
      <Box className={"flex items-center justify-between"}>
        <Box className={"flex flex-row gap-4 items-center"}>
          <Box
            onClick={handleMenuOpen}
            className={
              "flex items-center text-white lg:text-3xl md:text-2xl text-xl"
            }
          >
            <MenuIcon fontSize={"inherit"} className={"cursor-pointer"} />
          </Box>
          <NavLink to={"/"}>
            <Box
              className={
                "overflow-hidden relative flex justify-center items-center py-2"
              }
            >
              <img
                src={kurebiimage}
                alt={"KurebiVerse"}
                className={
                  "lg:w-[150px] md:w-[130px] sm:w-[120px] w-[110px] bg-contain"
                }
              />
            </Box>
          </NavLink>
        </Box>
        <Box className={"flex flex-row gap-8 items-center "}>
          <Box
            className={
              "relative flex w-full max-w-[55rem] md:visible invisible"
            }
          >
            <form onSubmit={(event) => handleSubmit(event)}>
              <Input
                label={"Search"}
                variant={"standard"}
                color={"white"}
                containerProps={{ className: "min-w-0" }}
                value={userInput}
                onChange={(event) => handleChangeInput(event.target.value)}
              />
              <IconButton
                size={"sm"}
                variant={"text"}
                className={"!absolute right-1 top-1 rounded text-white"}
                type="submit"
              >
                <Search />
              </IconButton>
            </form>
          </Box>
          <Box>{user ? <LoggedIn /> : <NotLoggedIn />}</Box>
        </Box>
        <Box
          className={`z-40 bg-[#121212]/80 absolute top-0 h-screen w-[250px] ${
            mobileMenuOpen ? "left-0" : "-left-full"
          } flex flex-col justify-start items-center py-5 transition-all ease-in-out duration-500`}
        >
          <Cancel
            onClick={handleMenuOpen}
            className={
              "absolute top-[10px] right-[10px] text-white cursor-pointer"
            }
          />
          <Box className={"mt-10"}>
            <Box
              className={
                "relative flex justify-center items-center w-full max-w-[45rem]"
              }
            >
              <form onSubmit={(event) => handleSubmit(event)}>
                <Input
                  label={"Search"}
                  variant={"standard"}
                  color={"white"}
                  value={userInput}
                  onChange={(event) => handleChangeInput(event.target.value)}
                />
                <IconButton
                  size={"sm"}
                  variant={"text"}
                  className={"!absolute right-1 top-1 rounded text-white"}
                  type="submit"
                >
                  <Search />
                </IconButton>
              </form>
            </Box>
            <Box
              className={
                "flex flex-col justify-center items-center gap-7 mt-10"
              }
            >
              <NavLink to={"/"} onClick={handleMenuOpen}>
                <Button className={"bg-[#222222] w-40"}>Recent Animes</Button>
              </NavLink>
              <NavLink to={"/"} onClick={handleMenuOpen}>
                <Button className={"bg-[#222222] w-40"}>Trending Animes</Button>
              </NavLink>
              <NavLink to={"/"} onClick={handleMenuOpen}>
                <Button className={"bg-[#222222] w-40"}>Popular Animes</Button>
              </NavLink>
              <NavLink to={"/"} onClick={handleMenuOpen}>
                <Button className={"bg-[#222222] w-40"}>
                  Upcoming Episodes
                </Button>
              </NavLink>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        onClick={handleMenuOpen}
        className={`w-screen h-screen fixed inset-0 bg-[#121212]/50 backdrop-blur-[4px] transition-opacity ease-in-out duration-1000 ${
          mobileMenuOpen ? "visible" : "invisible hidden"
        }`}
      />
    </Box>
  );
}
