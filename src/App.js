import "./App.css";
import "@shopify/polaris/build/esm/styles.css";
import FetchApi from "./FetchApi";

function App() {
  return (
    <div className="">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign:"center"
        }}
      >
        <FetchApi />
      </div>
    </div>
  );
}

export default App;
