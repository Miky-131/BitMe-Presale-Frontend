import React, { useState, useEffect } from 'react';
// import config from '../../config';
import { Container, Row, Col, Nav, Navbar, Button } from 'react-bootstrap';
import '../../component/componentCss/header.css';
import { authenticateUserAction } from '../../coreFile/action';
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { WalletConnectProvider } from '../../component/Home/WalletConnectProvider';
import config from '../../config';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletSelect } from '../../component/WalletSelect.jsx';


const Header = () => {
	const _useWallet = useWallet();
	const [isSticky, setIsSticky] = useState(false);
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const loginData = Cookies.get('bitmeUserLogin') ? JSON.parse(Cookies.get('bitmeUserLogin')) : null;


	useEffect(() => {
		if (loginData?.walletAddress) {
			setisLoggedIn(true);
		}
		const handleScroll = () => {
			const offset = window.scrollY;
			if (offset > 100) { // Change 100 to whatever offset you need
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		// Clean up the event listener
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		if (_useWallet.connected) {
			console.log({ _useWallet, connected: _useWallet.connected, publicKey: _useWallet?.publicKey?.toBase58() });
			loginUser(_useWallet?.publicKey?.toBase58())
		} else {
			console.log("_useWallet : disconnect")
			Cookies.remove('bitmeUserLogin');
      setisLoggedIn(false);
		}
	}, [_useWallet])


	const loginUser = async (publicKey) => {
		try {
			let Data = {
				walletAddress: publicKey
			}
			let res = await authenticateUserAction(Data);
			
			if (res.success) {
				// toast.success('Connected successfully!')
				Cookies.set('bitmeUserLogin', JSON.stringify(res.data));
				setisLoggedIn(true);
			}
		} catch (err) {
		}
	}

	return (
		<>
			<header className={`header ${isSticky ? 'sticky' : ''}`}>
				<Toaster />
				<Container>
					<Navbar expand="xl" className="">
						<Container>
							<Navbar.Brand href='javascript:void(0)'>
								<img src={`${config.BASE_URL}assets/images/logo/logo.png`} alt='mainLogo' className='mainLogo' width={`120px`} />
							</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="mx-auto">
									<Nav.Link href={`${config.BASE_URL}`}>Presale</Nav.Link>
									<Nav.Link target='__blank' href="https://bitme.ai/bitdex">BitDEX</Nav.Link>
									<Nav.Link target='__blank' href="https://bitme.ai/bitshare">BitSHARE</Nav.Link>
									<Nav.Link target='__blank' href="https://docs.bitme.ai/">Docs</Nav.Link>
								</Nav>
								<div className='headbtn wltBtn'>
									<WalletSelect />
								</div>

							</Navbar.Collapse>
						</Container>
					</Navbar>
				</Container>

			</header>

		</>
	)
}

export default Header;