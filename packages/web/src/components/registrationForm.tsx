import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";

// email, userName, firstName, lastName
const formSchema = z.object({
  email: z.string().email(),
  userName: z.string().min(3),
  firstName: z.union([z.string().min(3), z.undefined()]).optional(),
  lastName: z.union([z.string().min(3), z.undefined()]).optional(),
});

export type RegistrationFormData = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => void;
}

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      userName: "",
    },
  })

  async function handleOnSubmit(formData: RegistrationFormData) {
    onSubmit(formData);
  }

  return (
    <div className="w-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="text-left space-y-8">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

