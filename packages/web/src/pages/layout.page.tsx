import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import { Button } from "@/components/ui/button.tsx";
import { UserData, useUserContext } from "@/shared/contexts/userContext.tsx";
import LogoImage from '../assets/dddforumlogo.png';

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

const HeaderActionButton = ({ user }: { user: UserData | null }) => {
  const { setUser } = useUserContext();

  return (
    <div>
      {
        user && user.userName ? (
          <Button onClick={() => setUser({
            id: 0,
            userName: '',
            email: '',
            firstName: '',
            lastName: ''
          })}>
            {`${user.userName} / Logout`}
          </Button>
        ) : (
          <Button asChild>
            <Link to='/join'>Join</Link>
          </Button>
        )
      }
    </div>
  )
};

const shouldShowActionButton = (user: UserData) => {
  return user && user.userName;
}

export const Header = ({user}: { user: UserData }) => (
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