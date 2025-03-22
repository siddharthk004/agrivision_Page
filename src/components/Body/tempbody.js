//import TEMP from "../../assets/images/Temp1png.png";
import CARD from "../card/card";
const TempBody = () => {
  //return <img src={TEMP} alt="Temp Body" />;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CARD />
    </div>
  );
};
export default TempBody;
