import Image from "next/image";
import { ReactNode, useState } from "react";
import { useAuthentication, Login, Logout } from "../../../hooks/authenication";
import { User } from "../../../types/user";

export const Header = () => {
  const { user } = useAuthentication();
  return (
    <header id="header">
      <Avator user={user || null} />
    </header>
  );
};

interface AvatorProps {
  user: User | null;
}

const Avator = ({ user }: AvatorProps) => {
  const [isViewMenu, setIsViewMenu] = useState(false);

  return (
    <div className="mb-6 border-b border-rose-800">
      <div
        className="pt-4 flex flex-wrap justify-end items-center pb-4 pr-4"
        onClick={() => setIsViewMenu(!isViewMenu)}
      >
        <div className="mr-4 text-sm">{user?.displayName}</div>
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
          <div className="absolute right-0 bottom-0 top-3">
            {user ? (
              <Button method={Logout}>ログアウト</Button>
            ) : (
              <Button method={Login}>ログイン</Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface ButtonProps {
  method: () => void;
  children: ReactNode;
}

const Button = (props: ButtonProps) => (
  <button
    onClick={() => props.method()}
    className="rounded-lg bg-red-400 text-white text-sm p-2 cursor-pointer"
  >
    {props.children}
  </button>
);
