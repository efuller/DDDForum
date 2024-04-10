import { RegistrationForm, RegistrationFormData } from "@/components/registrationForm.tsx";
import { apiClient } from "@/shared/apiClient";

export const RegisterPage = () => {
  const onSubmit = async (data: RegistrationFormData) => {
    try {
      await apiClient.register(data);
    } catch (e) {
      console.error(`There was an error registering the account, ${e}`);
    }
  }

  return (
    <div className="py-10">
      <h1 className="pb-8 text-4xl">Register</h1>
      <div className="flex justify-center w-full">
        <RegistrationForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}