// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import config from './config';
import Home from './component/Home';
import Bitdex from './component/Bitdex';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

import { useMemo } from 'react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-unsafe-burner';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import Lock from './component/Home/lock';

function App() {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = "https://mainnet.helius-rpc.com/?api-key=2d5226a1-a06a-4b96-a766-2ab2c0fcd68d";

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
      new UnsafeBurnerWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );


  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect >
          <WalletModalProvider >
            <BrowserRouter>
              <Routes>
                {/* <Route path={`${config.BASE_URL}`} element={<Lock />} />
                <Route path={`${config.BASE_URL}dev-home`} element={<Home />} /> */}
                <Route path={`${config.BASE_URL}`} element={<Home />} />
                <Route path={`${config.BASE_URL}bitdex`} element={<Bitdex />} />
                <Route path={`${config.BASE_URL}presale/app/:refCode`} element={<Home />} />
              </Routes>
            </BrowserRouter>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
