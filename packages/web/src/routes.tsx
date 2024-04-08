import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "@/pages/main.page.tsx";
import { Layout } from "@/pages/layout.page.tsx";

export const router = createBrowserRouter([
 {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <MainPage /> },
    ],
  },
]);