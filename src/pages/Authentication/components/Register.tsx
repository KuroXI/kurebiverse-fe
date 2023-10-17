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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

  return (
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
  );
};
