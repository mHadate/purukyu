import { ReactNode } from "react";
import { AdminHeader as Header } from "../../components/admin/header";
import { Container, Section } from "react-bulma-components";
import "bulma/css/bulma.min.css";

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: LayoutProps) => (
  <Container>
    <Header />
    <Section>
      <>{children}</>
    </Section>
  </Container>
);

export default AdminLayout