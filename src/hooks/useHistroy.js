import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";

export default function useHistory() {
    const { publicKey } = useWallet();
    const [getAuthToken, setGetAuthToken] = useState();
    useEffect(() => {
        // POST request using fetch inside useEffect
        if (publicKey?.toString().length > 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletAddress: publicKey.toBase58() })
            };
            fetch('https://espsofttech.org:8182/api/authenticate', requestOptions)
                .then(response => response.json())
                .then(data => setGetAuthToken(data.data.authToken));
        }
    }, [publicKey]);

    const saveData = async( authtoken, walletaddress, amounttopay, amountreceive) => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': authtoken,
                'My-Custom-Header': 'foobar'
            },
            body: JSON.stringify({ walletAddress: walletaddress, amountYouPay: amounttopay, amountYouReceive: amountreceive })
        };
        fetch('https://espsofttech.org:8182/api/submitTransaction', requestOptions)
            .then(response => response.json())
    }

    return {
        getAuthToken,
        saveData
    }
}