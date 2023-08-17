import {Button, IconButton, Menu, MenuHandler, MenuItem, MenuList} from "@material-tailwind/react";
import {AccountCircle} from "@mui/icons-material";
import {supabase} from "../../../redux/auth/supabase.ts";

const Logout = () => {
  supabase.auth.signOut().then((error) => console.log(error));
}

export const NotLoggedIn = () => {
  return (
    <a href={"/login"}>
      <Button className={"text-black bg-white"}>Login</Button>
    </a>
  )
};

export const LoggedIn = () => {
  return (
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
        <MenuItem className={"bg-red-700 text-white font-bold"} onClick={Logout}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  )
}