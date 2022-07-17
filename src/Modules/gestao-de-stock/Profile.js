import { useEffect, useState } from "react";
import { Col, Container, FormGroup, Input, Label, Row } from "reactstrap";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  const getUser = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/user/${localStorage.getItem("user")}`
    );

    const json = await res.json();

    setEmail(json.email);
    setCompanyName(json.companyName ? json.companyName : "");
  };

  const editProfile = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/user/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          user: localStorage.getItem("user"),
        }),
      });

      alert("Perfil actualizado!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <Container
        className="mt-2"
        style={{
          border: "1px solid #ddd",
          background: "#fcfcfc",
          borderRadius: 5,
        }}
      >
        <Row>
          <Col>
            <FormGroup>
              <Label>Nome da empresa</Label>
              <Input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" value={email} disabled />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>|</Label>
              <Input
                type="button"
                value="Salvar"
                color="primary"
                style={{ background: "blue", color: "#fff" }}
                onClick={editProfile}
              />
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
