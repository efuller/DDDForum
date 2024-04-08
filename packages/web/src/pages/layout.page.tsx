import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <div>
            <header><h1>Domain-Driven Designers</h1></header>
            <main>
              <Outlet />
            </main>
        </div>
    )
}