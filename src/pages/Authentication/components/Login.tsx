import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GoogleIcon, SpinnerIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/redux/auth/supabase";
import { LogInIcon } from "lucide-react";
import { SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const Login = () => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "The password is required"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function onLogin(values: z.infer<typeof schema>) {
    const { error } = await supabase.auth.signInWithPassword(values);
    if (error) toast.error(error.message);
  }

  async function loginWithOAuth(event: SyntheticEvent) {
    event.preventDefault();
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription className="flex flex-row space-x-2">
          <p className="text-sm text-muted-foreground">
            Don't have an account?
          </p>
          <a href="/register" className="text-primary text-sm">
            Sign Up
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLogin)} className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={form.formState.isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={form.formState.isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember Me</Label>
              </div>
              <a href="/forgot-password" className="text-primary text-sm">
                Forgot Password?
              </a>
            </div>
            <Button className="w-full mt-6" type="submit">
              {form.formState.isSubmitting ? (
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogInIcon className="mr-2 h-4 w-4" />
              )}
              Login
            </Button>
          </form>
        </Form>
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
        <Button
          variant="outline"
          onClick={loginWithOAuth}
          disabled={form.formState.isSubmitting}
        >
          <GoogleIcon className="mr-2 h-4 w-4" />
          Google
        </Button>
      </CardContent>
      <Toaster richColors />
    </Card>
  );
};
