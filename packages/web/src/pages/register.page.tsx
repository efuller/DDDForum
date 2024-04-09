import { RegistrationForm } from "@/components/registrationForm.tsx";

export const RegisterPage = () => {
  return (
    <div className="py-10">
      <h1 className="pb-8 text-4xl">Register</h1>
      <div className="flex justify-center w-full">
        <RegistrationForm />
      </div>
    </div>
  );
}