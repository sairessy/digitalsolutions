import Sell from "./Sell";
import Statisic from "./Statisic";
import Stock from "./Stock";
import Tabs from "../../Components/Tabs";

const StockEVendas = () => {
  return (
    <div>
      <Tabs
        links={[
          { label: "Meu Stock" },
          { label: "Registar venda (POS)" },
          { label: "Estatísticas de venda" },
        ]}
        components={[<Stock />, <Sell />, <Statisic />]}
      />
    </div>
  );
};

export default StockEVendas;
