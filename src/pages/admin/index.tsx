import Router from "next/router";
import { FormEvent, useState } from "react";
import { Form, Button, Columns } from "react-bulma-components";
import { apiAgent } from "../../services/adminApi";
import "bulma/css/bulma.min.css";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { Field, Label, Control, Input } = Form;

  const login = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    const credentical = await apiAgent.post("/login", body);
    if (credentical) {
      apiAgent.setHeaders({ Authorization: `Bearer ${credentical}` });
      Router.push("/admin/dashboard");
      localStorage.setItem("credentical", credentical);
    } else {
      setError(true)
    }
  };

  const isValid = () => {
    const reg =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const emailValid = reg.test(email);
    return emailValid === true && password !== "";
  };

  return (
    <form onSubmit={login}>
      <Columns>
        <Columns.Column size={6} offset={3}>
          {error && (
            <Field className="has-background-danger has-text-white p-3 rounded-md">
              メールアドレスまたはパスワードが違います
            </Field>
          )}
          <Field>
            <Label>メールアドレス:</Label>
            <Control>
              <Input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Control>
          </Field>
          <Field>
            <Label>パスワード:</Label>
            <Control>
              <Input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Control>
          </Field>
          <Button color="primary" disabled={!isValid()}>
            ログイン
          </Button>
        </Columns.Column>
      </Columns>
    </form>
  );
};

export default Home;
