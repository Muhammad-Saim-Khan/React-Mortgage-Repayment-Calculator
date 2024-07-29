import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Cal from "./Cal";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Cal />
    </>
  );
}

export default App;
