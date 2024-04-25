import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useUserContext } from "@/shared/contexts/userContext.tsx";
import { Header } from "@/components/header.tsx";

export const Layout = () => {
  const { user } = useUserContext();
  return (
    <div>
      <Header user={user} />
      <main>
        <Outlet/>
      </main>
      <Toaster />
    </div>
  )
}