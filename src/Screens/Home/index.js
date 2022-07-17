import Header from "./Header";
import Main from "./Main";
import "./index.css";

const Home = ({ changeAuth }) => {
  return (
    <div className="page">
      <Header changeAuth={changeAuth} />
      <Main />
    </div>
  );
};

export default Home;
