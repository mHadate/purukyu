import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { Login, Logout, useAuthentication } from "../../hooks/authenication";
import { User } from "../../types/user";

export const Header = () => {
  const { user } = useAuthentication();
  return (
    <header id="header">
      <Avator user={user} />

      <div className="text-center m-10">
        <Link href="/" passHref>
          <Image
            src="/images/logo.png"
            width={250}
            height={81}
            alt=""
            className="cursor-pointer"
          />
        </Link>
      </div>
    </header>
  );
};
interface AvatorProps {
  user: User | null;
}

const Avator = ({ user }: AvatorProps) => {
  const [isViewMenu, setIsViewMenu] = useState(false);

  return (
    <>
      <div className="mb-6 flex flex-wrap justify-end">
        <div
          className="flex flex-wrap justify-end items-center p-1 bg-white rounded-full m-2 cursor-pointer"
          onClick={() => setIsViewMenu(!isViewMenu)}
        >
          {user ? (
            <div className="mr-4 text-sm  p-3">{user?.displayName}</div>
          ) : null}
          <Image
            src={user?.photoURL || "/images/icon-twitter.svg"}
            width={35}
            height={35}
            alt=""
            className="rounded-full cursor-pointer"
          />
        </div>
      </div>
      {isViewMenu && (
        <div className="relative">
          <div className="absolute right-3 bottom-0 -top-4">
            {user ? (
              <Button method={Logout}>ログアウト</Button>
            ) : (
              <Button method={Login}>ログイン</Button>
            )}
          </div>
        </div>
      )}
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
    className="rounded-lg bg-pink-200 text-white text-sm p-2 cursor-pointer hover:opacity-50"
  >
    {props.children}
  </button>
);
