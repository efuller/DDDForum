import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import LogoImage from '../assets/dddforumlogo.png';
import { Toaster } from "sonner";

const Logo = () => (
  <div>
    <img className="h-14" src={LogoImage} alt="DDD Forum Logo"/>
  </div>
);

const TitleAndSubmission = () => (
  <div className="flex-1">
    <h1 className="text-4xl">Domain-Driven Designers</h1>
    <p>Where awesome domain driven designers are made</p>
    <Link className="underline hover:opacity-80" to='/submit'>Submit</Link>
  </div>
);

const HeaderActionButton = ({ user }: { user: any }) => (
  <div>
    {
      user ? (
        <Button>
          {`${user.userName} / Logout`}
        </Button>
      ) : (
        <Button asChild>
          <Link to='/join'>Join</Link>
        </Button>
      )
    }
  </div>
);

const shouldShowActionButton = (pathName: string) => {
  return pathName !== '/join';
}

export const Header = ({user}: {user: any}) => (
  <header className="p-4 border flex items-center content-between flex-wrap">
    <Logo/>
    <TitleAndSubmission/>
    {
      shouldShowActionButton(window.location.pathname) ? (
        <HeaderActionButton user={user}/>
      ) : null
    }
  </header>
)

export const Layout = () => {
  return (
    <div>
      <Header user={null} />
      <main>
        <Outlet/>
      </main>
      <Toaster />
    </div>
  )
}