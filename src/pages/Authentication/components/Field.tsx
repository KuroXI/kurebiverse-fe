import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";

export const Field = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  isSubmitting,
}: {
  control: Control<TFieldValues>;
  name: TName;
  isSubmitting: boolean;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center justify-between capitalize">
            {name}
            <FormMessage />
          </FormLabel>
          <FormControl>
            <Input {...field} disabled={isSubmitting} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
