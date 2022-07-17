import { TextField, Button, createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Form } from "reactstrap";
import Logo from "../../Components/Logo";
import "./index.css";

const theme = createTheme({
  status: {
    danger: "#2bccb1",
  },
  palette: {
    primary: {
      main: "#4b0082",
      dark: "#888",
    },
  },
});

const Login = ({ changeAuth }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pass }),
    });

    const json = await res.json();

    if (json === null) {
      alert("Email ou senha inválida!");
    } else {
      localStorage.setItem("user", json.id);
      changeAuth(true);
    }
  };

  return (
    <div>
      <div className="logo">
        <Logo />
      </div>
      <Form className="form" onSubmit={handleLogin}>
        <ThemeProvider theme={theme}>
          <TextField
            className="mb-3"
            label="Email"
            type="email"
            color="primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="mb-3"
            label="Senha"
            type="password"
            color="primary"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <Button
            load={loading}
            size="large"
            color="primary"
            variant="contained"
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </ThemeProvider>
      </Form>
    </div>
  );
};

export default Login;
