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

    return response.json();
  },

  async getRecentPosts() {
    const response = await fetch(`${baseUrl}/posts?sort=recent`);

    if (!response.ok) {
      throw new Error('Failed to fetch recent posts');
    }

    return response.json();
  }
}