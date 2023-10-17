import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SpinnerIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { supabase } from "@/redux/auth/supabase";
import { LogInIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLogin)} className="grid gap-2">
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
                <Input {...field} disabled={form.formState.isSubmitting} />
              </FormControl>
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
  );
};
