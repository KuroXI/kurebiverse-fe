import kurebiimage from "../../assets/kurebiverse.png";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/icons";
import { SyntheticEvent } from "react";
import { supabase } from "@/redux/auth/supabase";
import { Header } from "./components/Header";
import { Toaster } from "@/components/ui/toaster";

type AuthenticationProps = {
  type: string;
};

export const Authentication = ({ type }: AuthenticationProps) => {
  async function loginWithOAuth(event: SyntheticEvent) {
    event.preventDefault();
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen max-w-sm mx-auto relative animate-slideUp">
      <a href="/">
        <img src={kurebiimage} alt="logo" className="w-80" />
      </a>
      <Card className="w-full">
        <CardHeader>
          <Header type={type} />
        </CardHeader>
        <CardContent className="flex flex-col gap-6 w-full">
          {type === "login" && <Login />}
          {type === "register" && <Register />}
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" onClick={loginWithOAuth}>
            <GoogleIcon className="mr-2 h-4 w-4" />
            Google
          </Button>
        </CardContent>
        <Toaster />
      </Card>
    </div>
  );
};
