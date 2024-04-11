import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import LogoImage from '../assets/dddforumlogo.png';
import { Toaster } from "sonner";
import { useUserContext } from "@/shared/contexts/userContext.tsx";

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
      user && user.userName ? (
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

const shouldShowActionButton = (user: any) => {
  return user && user.userName;
}

export const Header = ({user}: {user: any}) => (
  <header className="p-4 border flex items-center content-between flex-wrap">
    <Logo/>
    <TitleAndSubmission/>
    {
      shouldShowActionButton(user) ? (
        <HeaderActionButton user={user}/>
      ) : <HeaderActionButton user={null} />
    }
  </header>
)

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