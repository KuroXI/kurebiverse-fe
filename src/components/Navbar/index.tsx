import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { Menu, Face, Search, ArrowDropDown, Cancel } from "@mui/icons-material";
import "./styles.scss";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const [isNavbarSolid, setIsNavbarSolid] = useState(false);

  const handleMenuOpen = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchOpen = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
      component="nav"
      className={`fixed top-0 left-0 w-full ${
        isNavbarSolid ? "bg-[#121212]" : "bg-transparent"
      } flex justify-between items-center px-10 py-2`}
    >
      <Box className="md:hidden" onClick={handleMenuOpen}>
        <Menu className="text-white cursor-pointer" />
      </Box>
      <NavLink to="/">
        <h1 className="text-[#B4EA43] xl:text-5xl lg:text-4xl md:text-3xl text-2xl pt-2 select-none">
          Kurebiverse
        </h1>
      </NavLink>
      <Box className="hidden md:flex justify-center items-center gap-3">
        <form className="relative">
          <input
            placeholder="Search Anime"
            className="py-2 pl-2 pr-10 w-48 focus:outline-none"
          />
          <Box className="absolute top-[7px] right-[5px]">
            <Search className="text-[#779c27] cursor-pointer" />
          </Box>
        </form>
        <Box>
          <Face className="text-white" />
          <ArrowDropDown className="text-white" />
        </Box>
      </Box>
      <Box className="md:hidden">
        <Search className="text-white cursor-pointer" />
      </Box>
      <Box
        className={`md:hidden bg-gradient-to-tl from-[#B4EA43]/10 absolute top-0 h-screen w-2/3 ${
          mobileMenuOpen ? "left-0" : "-left-full"
        } backdrop-blur-lg flex flex-col justify-start items-center py-5`}
      >
        <h1 className="text-[#B4EA43] text-2xl">Kurebiverse</h1>
        <Box className="mt-10">
          <form className="flex justify-center items-center gap-3 w-full">
            <input
              placeholder="Search Anime"
              className="py-2 px-1 w-48 focus:outline-none"
            />
            <button type="submit">
              <Search className="text-white cursor-pointer" />
            </button>
          </form>
          <Box className="flex flex-col justify-center items-center gap-7 mt-10 md:hidden">
            <NavLink to="/" onClick={handleMenuOpen}>
              <Button className="bg-[#222222] w-40">Recent Animes</Button>
            </NavLink>
            <NavLink to="/" onClick={handleMenuOpen}>
              <Button className="bg-[#222222] w-40">Trending Animes</Button>
            </NavLink>
            <NavLink to="/" onClick={handleMenuOpen}>
              <Button className="bg-[#222222] w-40">Popular Animes</Button>
            </NavLink>
            <NavLink to="/" onClick={handleMenuOpen}>
              <Button className="bg-[#222222] w-40">Upcoming Episodes</Button>
            </NavLink>
            <Cancel
              onClick={handleMenuOpen}
              className="absolute top-[10px] right-[10px] text-white cursor-pointer"
            />
          </Box>
        </Box>
      </Box>
      <Box
        className={`md:hidden absolute top-0 h-screen w-1/3 smooth-transition ${
          mobileMenuOpen ? "right-0" : "-right-full"
        }`}
        onClick={handleMenuOpen}
      ></Box>
    </Box>
  );
};

export { Navbar };
