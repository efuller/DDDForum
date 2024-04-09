import { RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import { router } from "@/routes.tsx";
import { UserProvider } from "@/shared/contexts/userContext.tsx";

import './index.css'
import './App.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
