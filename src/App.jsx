// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import config from './config';
import Home from './component/Home';
import { WalletConnectProvider } from "./component/Home/WalletConnectProvider";

function App() {
  return (
    <>
      <WalletConnectProvider>
        <BrowserRouter>
          <Routes>
            <Route path={`${config.BASE_URL}`} element={<Home />} />
            <Route path={`${config.BASE_URL}presale/app/:encAddress`} element={<Home />} />
          </Routes>
        </BrowserRouter>
      </WalletConnectProvider>
    </>
  );
}

export default App;
