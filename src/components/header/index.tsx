import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { login, logout } from "../../services/firebase";
import { User } from "../../types/user";

export const Header = () => {
  const { user } = useAuthContext();
  return (
    <header id="header">
      <Avator user={user} />

      <div className="text-center mb-10">
        <Link href="/" passHref>
          <a>
            <img
              src="/images/logo.png"
              width={200}
              alt=""
              className="cursor-pointer ml-auto mr-auto"
            />
          </a>
        </Link>
      </div>
    </header>
  );
};

interface AvatorProps {
  user: User | null | undefined;
}

const Avator = ({ user }: AvatorProps) => {
  const [isViewMenu, setIsViewMenu] = useState(false);

  const onClickLogout = () => {
    logout();
    setIsViewMenu(!isViewMenu);
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap justify-end container mx-auto ">
        <div
          className="flex flex-wrap justify-end items-center p-1 bg-white rounded-full m-2 cursor-pointer"
          onClick={() => setIsViewMenu(!isViewMenu)}
        >
          {user && <div className="mr-4 text-sm  p-3">{user?.displayName}</div>}
          <Image
            src={user?.photoURL || "/images/icon-twitter.svg"}
            width={35}
            height={35}
            alt=""
            className="rounded-full cursor-pointer"
          />
        </div>
        {isViewMenu && (
          <div className="relative">
            <div className="absolute right-0 w-36 text-right -bottom-8">
              {user ? (
                <Button method={onClickLogout}>ログアウト</Button>
              ) : (
                <Button method={login}>ログイン</Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

interface ButtonProps {
  method: () => void;
  children: ReactNode;
}

const Button = (props: ButtonProps) => (
  <button
    onClick={() => props.method()}
    className="rounded-lg bg-pink-200 text-white text-sm p-2 pr-4 pl-4 cursor-pointer hover:opacity-50"
  >
    {props.children}
  </button>
);
