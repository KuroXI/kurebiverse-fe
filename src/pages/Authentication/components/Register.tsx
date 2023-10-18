import { Form } from "@/components/ui/form";
import { supabase } from "@/redux/auth/supabase";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthButton } from "./AuthButton";
import { Field } from "./Field";
import { useToast } from "@/components/ui/use-toast";

export const Register = () => {
  const { toast } = useToast();

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
    
    if (error) toast({ description: error.message });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onRegister)} className="grid gap-2">
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
        <Field
          control={form.control}
          name="confirmPassword"
          isSubmitting={form.formState.isSubmitting}
        />
        <AuthButton
          isSubmitting={form.formState.isSubmitting}
          name="Register"
        />
      </form>
    </Form>
  );
};
