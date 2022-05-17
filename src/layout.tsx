import { ReactNode } from "react";
import { Header } from "./components/header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = (props: LayoutProps) => (
  <>
    <Header />
    <div className="container">
      <>{props.children}</>
    </div>
  </>
);
