import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { RegistrationForm, RegistrationFormData } from "@/components/registrationForm.tsx";
import { apiClient } from "@/shared/apiClient";
import { useUserContext } from "@/shared/contexts/userContext.tsx";

export const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const { setUser} = useUserContext();

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setLoading(true);
      const result = await apiClient.register(data);

      if (result.success) { toast.success('Account registered successfully');
        setUser(result.data);
        setTimeout(() => {
          setLoading(false);
          navigate('/');
        }, 3000);
      } else {
        toast.error('There was an error registering the account');
      }
    } catch (e) {
      toast.error('There was an error registering the account');
      console.error(`There was an error registering the account, ${e}`);
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