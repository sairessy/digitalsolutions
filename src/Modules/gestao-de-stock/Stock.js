import { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Table,
  Button,
} from "reactstrap";
import { IconButton, TextField } from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";

const Stock = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [stock, setStock] = useState([]);
  const [total, setTotal] = useState(0);
  const toggle = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const searchProduct = async (text) => {
    if (text === "") {
      getStock();
      return;
    }

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/stock/${localStorage.getItem(
        "user"
      )}/search/${text.toLowerCase()}`
    );

    const json = await res.json();
    setStock(json.docs);
    setTotal(0);
  };

  const getStock = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/stock/user/${localStorage.getItem(
        "user"
      )}/limit/${3}`
    );

    const json = await res.json();
    setStock(json.docs);
    setTotal(json.total);
  };

  const addStock = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/stock/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        user: localStorage.getItem("user"),
      }),
    });

    setName("");
    setprice("");
    getStock();
  };

  useEffect(() => {
    getStock();
  }, []);

  return (
    <div>
      <div className="mt-2 p-2">
        <div
          className="justify-content-between mb-2"
          style={{
            display: "flex",
          }}
        >
          <TextField
            label="Pesquisar"
            size="small"
            className="my-2"
            onChange={(e) => searchProduct(e.target.value)}
          />
          <Button color="primary" style={{ height: 40 }} onClick={toggle}>
            Novo producto
          </Button>
        </div>

        <div className="mt-2" style={{ height: 270, overflowY: "scroll" }}>
          <Table bordered>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Preço (Mt)</th>
                {/* <th>Total de vendas (Mt)</th> */}
                <th>Acções</th>
              </tr>
            </thead>
            <tbody>
              {stock.length > 0 &&
                stock.map(({ _id, name, price }) => (
                  <tr key={_id}>
                    <td>{name}</td>
                    <td>{price}</td>
                    {/* <td>126.247,00</td> */}
                    <td>
                      <IconButton
                        style={{ background: "indigo", marginRight: 10 }}
                      >
                        <MdDelete size={12} color="white" />
                      </IconButton>
                      <IconButton style={{ background: "indigo" }}>
                        <MdEdit size={12} color="white" />
                      </IconButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        {/* <Pagination count={Math.round(total / rowsPerPage)} className="mt-3" /> */}
      </div>

      <div>
        <Modal isOpen={modalIsOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Nova tarefa</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="exampleEmail">Nome</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
              <FormFeedback>You will not be able to see this</FormFeedback>
              <FormText>
                {/* Example help text that remains unchanged. */}
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Preço</Label>
              <Input value={price} onChange={(e) => setprice(e.target.value)} />
              <FormFeedback>You will not be able to see this</FormFeedback>
              <FormText>
                {/* Example help text that remains unchanged. */}
              </FormText>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              style={{ marginRight: 10 }}
              variant="contained"
              color="primary"
              onClick={addStock}
            >
              Adicionar
            </Button>
            <Button variant="contained" onClick={toggle}>
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Stock;
