import Profile from "./gestao-de-stock/Profile";
import img from "./undraw_join_re_w1lh.svg";

const Welcome = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Profile />
      <img src={img} width="40%" height="70%" className="m-3" alt="img" />
    </div>
  );
};

export default Welcome;
