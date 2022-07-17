import Tabs from "../../Components/Tabs";
import Musics from "./Musics";

const MusicSpot = () => {
  return (
    <div>
      <Tabs
        links={[{ label: "Minhas Músicas" }, { label: "Perfil" }]}
        components={[<Musics />, <></>]}
      />
    </div>
  );
};

export default MusicSpot;
