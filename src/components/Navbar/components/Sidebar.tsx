import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MenuIcon} from "lucide-react";
import kurebiimage from "@/assets/kurebiverse.png";

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MenuIcon/>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className={"w-72"}>
        <SheetHeader className={"flex items-center"}>
          <SheetTitle className={"h-auto w-28"}>
            <img src={kurebiimage} alt={"logo"}/>
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            Popular
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}