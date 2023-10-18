import { Form } from "@/components/ui/form";
import { supabase } from "@/redux/auth/supabase";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AuthButton } from "./AuthButton";
import { Field } from "./Field";
import { useToast } from "@/components/ui/use-toast";

export const Login = () => {
  const { toast } = useToast();

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "The password is required"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function onLogin(values: z.infer<typeof schema>) {
    const { error } = await supabase.auth.signInWithPassword(values);
    
    if (error) toast({ description: error.message });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLogin)} className="grid gap-2">
        <Field
          control={form.control}
          name="email"
          isSubmitting={form.formState.isSubmitting}
        />
        <Field
          control={form.control}
          name="password"
          isSubmitting={form.formState.isSubmitting}
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

        <AuthButton isSubmitting={form.formState.isSubmitting} name="Login" />
      </form>
    </Form>
  );
};
