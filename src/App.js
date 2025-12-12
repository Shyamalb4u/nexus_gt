import { Route, Routes, HashRouter } from "react-router-dom";
import Home from "./home/Home";
import Sign from "./home/Sign";
import Wallet from "./account/Wallet";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/sign" element={<Sign />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
