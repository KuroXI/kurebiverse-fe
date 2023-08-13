import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Box, Button} from "@mui/material";
import {AccountCircle, Cancel, Menu as MenuIcon, Search} from "@mui/icons-material";
import {Input, IconButton, MenuHandler, Menu, MenuList, MenuItem} from "@material-tailwind/react";
import kurebiimage from "../../assets/kurebiverse.png";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavbarSolid, setIsNavbarSolid] = useState(false);

  const handleMenuOpen = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 50;
      setIsNavbarSolid(scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      component={"nav"}
      className={`md:fixed sticky top-0 left-0 z-[99] h-max w-screen rounded-none py-2 px-4 lg:py-3 ${
        isNavbarSolid ? "bg-[#121212]/50 backdrop-blur-md" : "bg-transparent"
      }`}>
      <Box className={"flex items-center justify-between"}>
        <Box className={"flex flex-row gap-4 items-center"}>
          <Box onClick={handleMenuOpen} className={"flex items-center text-white lg:text-3xl md:text-2xl text-xl"}>
            <MenuIcon fontSize={"inherit"} className={"cursor-pointer"}/>
          </Box>
          <NavLink to={"/"}>
            <Box className={"overflow-hidden relative flex justify-center items-center py-2"}>
              <img
                src={kurebiimage}
                alt={"KurebiVerse"}
                className={"lg:w-[150px] md:w-[130px] sm:w-[120px] w-[110px] bg-contain"}
              />
            </Box>
          </NavLink>
        </Box>
        <Box className={"flex flex-row gap-8 items-center "}>
          <Box className={"relative flex w-full max-w-[45rem] md:visible invisible"}>
            <Input
              label={"Search"}
              variant={"standard"}
              color={"white"}
              containerProps={{ className: "min-w-0" }}
            />
            <IconButton size={"sm"} variant={"text"} className={"!absolute right-1 top-1 rounded text-white"}>
              <Search/>
            </IconButton>
          </Box>
          <Box>
            <Menu>
              <MenuHandler>
                <IconButton size={"lg"} variant={"text"} className={"rounded text-white"}>
                  <AccountCircle />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Watch List</MenuItem>
                <MenuItem>Settings</MenuItem>
                <hr className={"my-3"} />
                <MenuItem className={"bg-red-700 text-white font-bold"}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
        <Box
          className={`z-40 bg-[#121212]/80 absolute top-0 h-screen w-[250px] ${
            mobileMenuOpen ? "left-0" : "-left-full"
          } flex flex-col justify-start items-center py-5 transition-all ease-in-out duration-500`}
        >
          <Cancel
            onClick={handleMenuOpen}
            className={"absolute top-[10px] right-[10px] text-white cursor-pointer"}
          />
          <Box className={"mt-10"}>
            <Box className={"relative flex justify-center items-center w-full max-w-[45rem]"}>
              <Input label={"Search"} variant={"standard"} color={"white"}/>
              <IconButton size={"sm"} variant={"text"} className={"!absolute right-1 top-1 rounded text-white"}>
                <Search/>
              </IconButton>
            </Box>
            <Box className={"flex flex-col justify-center items-center gap-7 mt-10 md:hidden"}>
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
                <Button className={"bg-[#222222] w-40"}>Upcoming Episodes</Button>
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
  )
}