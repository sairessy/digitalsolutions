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
} from "reactstrap";
import { Button } from "@mui/material";
import "../../index.css";
import Task from "./Task";
import "./Task.css";

const GestaoDeTarefas = () => {
  const [tasks, setTasks] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todoDescriprion, setTodoDescritption] = useState("");

  const toggle = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const getTodos = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/todo/tasks/user/${localStorage.getItem(
        "user"
      )}`
    );
    const json = await res.json();
    setTasks(json);
  };

  const addTodo = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/todo/tasks/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoDescriprion,
          user: localStorage.getItem("user"),
        }),
      }
    );

    const json = await res.json();

    setTodoDescritption("");
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <div className="section-title">
        <p>Gestão de tarefas</p>
        <Button variant="contained" onClick={toggle}>
          Nova tarefa
        </Button>
      </div>
      <div className="tasks mt-2">
        {tasks.length > 0 &&
          tasks.map(({ _id, done, todoDescriprion, createdAt }) => (
            <Task
              key={_id}
              getTodos={getTodos}
              _done={done}
              id={_id}
              title={todoDescriprion}
              date={createdAt}
            />
          ))}
      </div>

      <div>
        <Modal isOpen={modalIsOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Nova tarefa</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="exampleEmail">Descrição da tarefa</Label>
              <Input
                value={todoDescriprion}
                onChange={(e) => setTodoDescritption(e.target.value)}
              />
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
              onClick={addTodo}
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

export default GestaoDeTarefas;
