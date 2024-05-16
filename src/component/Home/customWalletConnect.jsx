import React, { useState, useEffect } from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { authenticateUserAction } from '../../coreFile/action';
import { FaArrowRightLong } from "react-icons/fa6";

const CustomWalletConnectButton = ({ _useWallet, isLoggedIn, setisLoggedIn, loginData }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // useEffect(() => {
  //   if (_useWallet.connected) {
  //     console.log({ _useWallet, connected: _useWallet.connected, publicKey: _useWallet?.publicKey?.toBase58() });
  //     loginUser(_useWallet?.publicKey?.toBase58())
  //   } else {
  //     console.log("_useWallet : disconnect")
  //     Cookies.remove('bitmeUserLogin');
  //     setisLoggedIn(false);
  //   }
  // }, [_useWallet])


  // const loginUser = async (publicKey) => {
  //   try {
  //     let Data = {
  //       walletAddress: publicKey
  //     }
  //     let res = await authenticateUserAction(Data);
  //     if (res.success) {
  //       Cookies.set('bitmeUserLogin', JSON.stringify(res.data));
  //       setisLoggedIn(true);
  //     }
  //   } catch (err) {
  //   }
  // }

  return (
    <>
      {!isLoggedIn &&
        <Button variant='light-primary' className='me-2 btn-sm px-4 refer_and_earn' onClick={handleShow}>Connect Wallet</Button>
      }
      {isLoggedIn &&
        <Button variant='light-primary' className='me-2 btn-sm px-4 refer_and_earn'>
          {loginData.walletAddress.substr(0, 5)}....{loginData.walletAddress.slice(-5)}
        </Button>
      }

      <Modal show={show} onHide={handleClose} className='referral_earn' size='md' centered>
        <Modal.Header className='border-0'>
          <Modal.Title>Wallet Connect</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <ul className="walletlist list-group">
            {_useWallet.wallets
              .map((wallet) => (
                <li className="list-group-item border-0 p-0">

                  <Button
                  variant='primary'
                    key={wallet.adapter.name}
                    onClick={() => _useWallet.select(wallet.adapter.name)}
                    className='w-100 text-start'
                    size="lg"
                    fontSize="md"
                  >
                    <div className='d-flex justify-content-between'>
                      <div>
                        <Image
                          src={wallet.adapter.icon}
                          alt={wallet.adapter.name}
                          width={'25px'}
                          className='me-2'
                        />{wallet.adapter.name}
                      </div>
                      <div><FaArrowRightLong /></div>

                    </div>
                  </Button>


                </li>
              ))
            }
          </ul>
        </Modal.Body>
      </Modal>

    </>

  )
}

export default CustomWalletConnectButton;