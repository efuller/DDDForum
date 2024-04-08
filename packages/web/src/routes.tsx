import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "@/pages/main.page.tsx";

export const router = createBrowserRouter([
 {
    path: "/",
    element: <MainPage />,
  },
]);