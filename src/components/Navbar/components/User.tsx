import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {proxyImage} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {supabase} from "@/redux/auth/supabase.ts";
import {useTheme} from "@/components/ui/theme-provider.tsx";
import { initStateType } from "@/type/Redux";

type UserNavbarProps = {
  user: initStateType
}

export default function UserNavbar({ user } : UserNavbarProps) {
  const { theme, setTheme } = useTheme();

  return user.userId ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className={"rounded-full h-9 w-9"}>
          <Avatar className={"h-9 w-9"}>
            <AvatarImage src={proxyImage(user.profileUrl)} alt={user.username}/>
            <AvatarFallback>{user.username.substring(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Bookmark</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>
            Dark Mode
            <DropdownMenuShortcut className={"opacity-100"}>
              <Switch
                id={"theme"}
                checked={theme === "dark"}
                onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}
              />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={() => supabase.auth.signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <a href={"/login"}>
      <Button variant={"default"}>Login</Button>
    </a>
  )
}