import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import {supabase} from "@/redux/auth/supabase.ts";
import {Box} from "@mui/material";

export default function Index() {
  return (
    <Box className={"max-w-lg mx-auto md:mt-40 mt-20 text-lg font-bold bg-white p-5 rounded-md"}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme={"white"}
        providers={["google"]}
        view={"sign_up"}
        socialLayout={"vertical"}
      />
    </Box>
  )
}