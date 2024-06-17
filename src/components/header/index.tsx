import Link from "next/link";

export const Header = () => {
  return (
    <header id="header">
      <div className="text-center my-10">
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
