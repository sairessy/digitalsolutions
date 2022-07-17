import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Table,
} from "reactstrap";

const Musics = () => {
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [musics, setMusics] = useState("");

  const getMusics = async () => {
    const res = await fetch(
      `${
        process.env.REACT_APP_API_URL
      }/music_spot/musics/user/${localStorage.getItem("user")}`
    );

    const json = await res.json();

    setMusics(json);
  };

  const handleFile = async (e) => {
    let files = e.target.files;
    const ext = files[0].name.split(".").at(-1);
    const size = files[0].size;

    const toBase64 = () =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const dataUrl = await toBase64();
    setFile({ dataUrl, size, ext });
  };

  const uploadMusic = async () => {
    const data = {
      ...file,
      title,
      price,
      desc,
      user: localStorage.getItem("user"),
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/music_spot/music/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMusics();
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
              <Label>Ficheiro MP3</Label>
              <Input type="file" onChange={(e) => handleFile(e)} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Título</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título da música"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Descrição</Label>
              <Input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Descrição da música"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Público</Label>
              <Input type="select" onChange={(e) => setPrice(e.target.value)}>
                <option value={0}>Free</option>
                <option value={1}>Premium</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>|</Label>
              <Input
                type="button"
                value="Adicionar"
                color="primary"
                style={{ background: "indigo", color: "#fff" }}
                onClick={uploadMusic}
              />
            </FormGroup>
          </Col>
        </Row>
      </Container>

      <div className="mt-2" style={{ height: 270, overflowY: "scroll" }}>
        <Table bordered>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Público</th>
              <th>Acções</th>
            </tr>
          </thead>
          <tbody>
            {musics.length > 0 &&
              musics.map(({ _id, title, price, url }) => (
                <tr key={_id}>
                  <td>
                    <a target="_blank" href={url}>
                      {title}
                    </a>
                  </td>
                  <td>{price.toString() === "0" ? "Free" : "Premium"}</td>
                  <td>
                    <IconButton
                      style={{ background: "indigo", marginRight: 10 }}
                    >
                      <MdDelete size={12} color="white" />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Musics;
