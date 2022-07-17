import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
} from "reactstrap";

import { IconButton } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";

import imgCart from "./shopping-cart-solid.svg";

const Sell = () => {
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState([]);
  const [total, setTotal] = useState(0);

  const qrScanner = async () => {};

  const addSell = async () => {
    if (cart.length === 0) {
      alert("Seleccione pelo menos um producto!");
      return;
    }

    const d = {
      data: cart,
      total,
      user: localStorage.getItem("user"),
    };

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/stock/sell`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d),
      });

      alert("Venda registada!");
    } catch (error) {
      console.log("Erro ao registar venda", error);
    }
  };

  const addToCart = () => {
    if (cart.filter((c) => c.id === productId).length > 0) {
      alert("O producto já está no carinho, pode editar a quantidade!");
      return;
    }

    const arr = [
      ...cart,
      {
        k: Date.now().toString(),
        id: productId,
        quantity,
      },
    ];

    calculateTotal(arr);

    setCart([
      ...cart,
      {
        k: Date.now().toString(),
        id: productId,
        quantity,
      },
    ]);
  };

  const removeProduct = (id) => {
    const arr = cart.filter((c) => c.k !== id);
    calculateTotal(arr);
    setCart(arr);
  };

  const editQuantity = (id, newQuantity) => {
    const obj = cart.filter((o) => o.id === id)[0];
    obj.quantity = parseFloat(newQuantity);
    const newCart = [...cart.filter((c) => c.id !== id), obj];
    calculateTotal(newCart);
    setCart(newCart.sort((a, b) => a.k - b.k));
  };

  const getStock = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/stock/user/${localStorage.getItem(
        "user"
      )}/limit/${3}`
    );

    const json = await res.json();
    const docs = json.docs;
    setStock(docs);
    setProductId(docs[0]._id);
  };

  const calculateTotal = (arr) => {
    let tt = 0;

    for (let i = 0; i < arr.length; i++) {
      const q = parseFloat(arr[i].quantity);
      const p = parseFloat(stock.filter((s) => s._id === arr[i].id)[0].price);
      tt += p * q;
    }

    setTotal(tt);
  };

  useEffect(() => {
    getStock();
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
              <Label>Produco</Label>
              <Input
                type="select"
                onChange={(e) => setProductId(e.target.value)}
              >
                {stock.length > 0 &&
                  stock.map(({ _id, name }) => (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Quantidade</Label>
              <Input
                min={1}
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>|</Label>
              <Input
                type="button"
                value="Adicionar"
                color="primary"
                onClick={addToCart}
                style={{ background: "blue", color: "#fff" }}
              />
            </FormGroup>
          </Col>
        </Row>
      </Container>

      <div style={{ height: 270, overflowY: "scroll", padding: 10 }}>
        <Table bordered>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Quantidade</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 &&
              cart.map(({ id, quantity, k }) => (
                <tr key={k}>
                  <td>{stock.filter((s) => s._id === id)[0].name}</td>
                  <td>
                    <Input
                      min={1}
                      type="number"
                      value={quantity}
                      onChange={(e) => editQuantity(id, e.target.value)}
                    />
                  </td>
                  <td>
                    <IconButton>
                      <MdDelete onClick={() => removeProduct(k)} />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <img
          style={{
            display: cart.length === 0 ? "block" : "none",
            margin: "auto",
          }}
          src={imgCart}
          width={220}
          height={220}
        />
      </div>
      <p className="h4">
        <b>Total:</b> {total} Mt
      </p>
      <Button color="primary" onClick={addSell}>
        Registar venda
      </Button>
    </div>
  );
};

export default Sell;
