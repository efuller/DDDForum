import { RegistrationForm, RegistrationFormData } from "@/components/registrationForm.tsx";
import { apiClient } from "@/shared/apiClient";
import { toast } from "sonner";
import { useState } from "react";

export const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setLoading(true);
      await apiClient.register(data);
    } catch (e) {
      toast.error('There was an error registering the account');
      console.error(`There was an error registering the account, ${e}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-10">
      <h1 className="pb-8 text-4xl">Register</h1>
      <div className="flex justify-center w-full">
        <RegistrationForm loading={loading} onSubmit={onSubmit} />
      </div>
    </div>
  );
}