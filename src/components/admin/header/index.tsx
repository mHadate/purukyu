import Image from "next/image";
import { Navbar } from "react-bulma-components";

export const AdminHeader = () => (
  <Navbar className="mt-4">
    <Navbar.Brand>
      <Image src="/images/logo.png" width={180} height={57} alt="" />
    </Navbar.Brand>
  </Navbar>
);
