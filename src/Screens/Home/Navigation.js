import { useState } from "react";
import "./Navigation.css";
import { IoHomeOutline } from "react-icons/io5";

const navs = [
  { id: 0, label: "Dashboard" },
  // { id: 11, label: "Data Collections" },
  { id: 4, label: "Task Manager" },
  // { id: 2, label: "Gestão de recursos humanos" },
  // { id: 3, label: "Gestão de desastres" },
  // { id: 5, label: "Gestão de dívidas" },
  // { id: 6, label: "Gestão de vendas" },
  // { id: 7, label: "Gestão de pesquisas" },
  // { id: 8, label: "Criação de convites" },
  // { id: 9, label: "Rastreador de despesas" },
  // { id: 10, label: "Bilhetes e convites" },
  { id: 11, label: "Stock e vendas" },
  { id: 12, label: "MusicSpot" },
];

const Navigation = ({ changeTab }) => {
  const lastNav = localStorage.getItem("last_nav");
  const [selected, setSelected] = useState(lastNav ? parseInt(lastNav) : 11);

  return (
    <div>
      {navs.map(({ id, label }) => (
        <div
          aria-disabled={true}
          disabled
          className={`navigation-item ${selected === id && "selected-item"}`}
          key={id}
          onClick={() => {
            setSelected(id);
            changeTab(id);
          }}
        >
          <IoHomeOutline style={{ display: id === 0 ? "flex" : "none" }} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default Navigation;
