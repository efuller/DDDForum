import { RegistrationFormData } from "@/components/registrationForm.tsx";

const baseUrl = 'http://localhost:3000';

export const apiClient = {
  async register(registrationData: RegistrationFormData) {
    const response = await fetch(`${baseUrl}/users/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });

    if (!response.ok) {
      throw new Error('Failed to register');
    }

    return response.json();
  }
}