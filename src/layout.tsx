import { ReactNode } from "react";
import { Header } from "./pages/components/header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = (props: LayoutProps) => (
  <>
    <Header />
    <div className="container mx-auto">
      <>{props.children}</>
    </div>
  </>
);
