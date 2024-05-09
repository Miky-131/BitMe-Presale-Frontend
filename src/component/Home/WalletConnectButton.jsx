// import React, { FC, useEffect, useMemo } from 'react';
// import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';


// // Default styles that can be overridden by your app
// require('@solana/wallet-adapter-react-ui/styles.css');


// export const Wallet = () => {
//     const _useWallet = useWallet();
//     useEffect(() => {
//         if (_useWallet.connected) {
//             console.log({ _useWallet, connected: _useWallet.connected, publicKey: _useWallet?.publicKey?.toBase58() });
//         } else {
//             console.log("_useWallet : disconnect")
//         }
//         // _useWallet.connect()
//     }, [_useWallet])
 

  
//     return (
//         <>
//             <WalletMultiButton  />
//         </>
//     );
// };