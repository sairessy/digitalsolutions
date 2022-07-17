import { useState } from "react";
import Welcome from "../../Modules";
import StockEVendas from "../../Modules/gestao-de-stock";
import GestaoDeTarefas from "../../Modules/gestao-de-tarefas";
import MusicSpot from "../../Modules/music-spot";
import "./Main.css";
import Navigation from "./Navigation";

const Main = ({ changeAuth }) => {
  const lastNav = localStorage.getItem("last_nav");
  const [tab, setTab] = useState(lastNav ? parseInt(lastNav) : 11);

  const changeTab = (id) => {
    setTab(id);
    localStorage.setItem("last_nav", id);
  };

  return (
    <div className="main">
      <div className="aside">
        <Navigation changeTab={changeTab} />
      </div>
      <div className="section">
        {tab === 0 && <Welcome />}
        {tab === 4 && <GestaoDeTarefas changeAuth={changeAuth} />}
        {tab === 11 && <StockEVendas changeAuth={changeAuth} />}
        {tab === 12 && <MusicSpot changeAuth={changeAuth} />}
      </div>
    </div>
  );
};

export default Main;
