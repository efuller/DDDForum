import { RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css';
import { router } from "@/routes.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
