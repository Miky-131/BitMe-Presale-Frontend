import React, { useState, useEffect } from 'react';
// import config from '../../config';
import { Button } from 'react-bootstrap';
import '../../component/componentCss/header.css';
import { authenticateUserAction } from '../../coreFile/action';
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';


import Solflare from '@solflare-wallet/sdk';
const WallletConnect = ({ isLoggedIn, setisLoggedIn }) => {

  const [connecting, setConnecting] = useState(false);
  const loginData = Cookies.get('bitmeUserLogin') ? JSON.parse(Cookies.get('bitmeUserLogin')) : null;
  const wallet = new Solflare();

  useEffect(() => {
    if (loginData?.walletAddress) {
      setisLoggedIn(true);
    }
  }, []);

  const userLogin = async () => {
    try {
      setConnecting(true);
      wallet.connect();
    } catch (err) {
      setConnecting(false);
      console.log(err)
    }
  };

  const userLogout = async () => {
    try {
      // wallet.on('disconnect', () => {
      console.log('disconnected');
      Cookies.remove('bitmeUserLogin');
      setisLoggedIn(false);
      // });
    } catch (err) {
      console.log(err)
    }
  };

    wallet.on('connect', async () => {
    try {
      console.log('connected', wallet.publicKey.toString());
      let Data = {
        walletAddress: wallet.publicKey
      }
      let res = await authenticateUserAction(Data);
      if (res.success) {
        toast.success('Connected successfully!')
        Cookies.set('bitmeUserLogin', JSON.stringify(res.data));
        setisLoggedIn(true);
      }
      setConnecting(false);
    } catch (err) {
      setConnecting(false);
    }
  });

  return (
    <>
      {!isLoggedIn &&
        <>
          {connecting &&
            <Button
              variant="primary"
              className="w-100"
              disabled
            >
              <Spinner animation="border" size="sm" />
            </Button>
          }
          {!connecting &&
            <Button
              variant="primary"
              className="w-100"
              onClick={userLogin}
            >
              Connect Wallet
            </Button>
          }
        </>
      }
      {isLoggedIn &&
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            {loginData.walletAddress.substr(0, 6)}....{loginData.walletAddress.slice(-6)}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="javascript:;" onClick={userLogout}>Disconnect</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      }
    </>
  )
}

export default WallletConnect;