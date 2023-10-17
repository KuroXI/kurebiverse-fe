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
import { SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";

export const Register = () => {
  const schema = z
    .object({
      email: z.string().email(),
      password: z.string().min(1, "The password is required"),
      confirmPassword: z.string().min(1),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password does not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function onRegister(values: z.infer<typeof schema>) {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (error) toast.error(error.message);
  }

  async function loginWithOAuth(event: SyntheticEvent) {
    event.preventDefault();
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription className="flex flex-row space-x-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?
          </p>
          <a href="/login" className="text-primary text-sm">
            Sign In
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onRegister)} className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    Email
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} disabled={form.formState.isSubmitting} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    Password
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    Confirm Password
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full mt-6" type="submit">
              {form.formState.isSubmitting && (
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up
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
