import { Button } from "@/components/ui/button.tsx";

export const RegisterPage = () => {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}