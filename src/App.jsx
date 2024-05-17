// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import config from './config';
import Home from './component/Home';
import { WalletConnectProvider } from "./component/Home/WalletConnectProvider";
import Bitdex from './component/Bitdex';

function App() {
  return (
    <>
      <WalletConnectProvider>
        <BrowserRouter>
          <Routes>
            <Route path={`${config.BASE_URL}`} element={<Home />} />
            <Route path={`${config.BASE_URL}/bitdex`} element={<Bitdex />} />
            <Route path={`${config.BASE_URL}presale/app/:refCode`} element={<Home />} />
          </Routes>
        </BrowserRouter>
      </WalletConnectProvider>
    </>
  );
}

export default App;
