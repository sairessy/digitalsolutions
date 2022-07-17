import { useEffect, useState } from "react";

const Statisic = () => {
  const [total, setTotal] = useState(0);

  const getTotal = async () => {
    try {
      const res = await fetch(
        `${
          process.env.REACT_APP_API_URL
        }/stock/sell/total/user/${localStorage.getItem("user")}`
      );
      const json = await res.json();
      setTotal(json.total);
    } catch (err) {
      console.log("Erro", err);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  return (
    <div className="mt-2">
      <p className="h4">
        <b>Total:</b> {total} Mt
      </p>
    </div>
  );
};

export default Statisic;
