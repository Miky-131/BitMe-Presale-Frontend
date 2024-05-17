import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, Button, Form, Image } from 'react-bootstrap';
import '../../component/componentCss/header.css';
import { authenticateUserAction } from '../../coreFile/action';
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { WalletConnectProvider } from '../../component/Home/WalletConnectProvider';
import config from '../../config';
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletSelect } from '../../component/WalletSelect.jsx';
import { FaXTwitter, FaTelegram } from "react-icons/fa6";
// import CustomWalletConnectButton from '../../component/Home/customWalletConnect.jsx';

const Header = ({ isLoggedIn, setisLoggedIn }) => {
	const _useWallet = useWallet();
	let { refCode } = useParams();
	const [isSticky, setIsSticky] = useState(false);
	const loginData = Cookies.get('bitmeUserLogin') ? JSON.parse(Cookies.get('bitmeUserLogin')) : null;
	let path = window.location.pathname;

	useEffect(() => {
		if (loginData?.walletAddress) {
			setisLoggedIn(true);
		}
	}, [isLoggedIn]);

	useEffect(() => {
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
			loginUser(_useWallet?.publicKey?.toBase58())
		} else {
			console.log("_useWallet : disconnect")
			setisLoggedIn(false);
			Cookies.remove('bitmeUserLogin');
		}
	}, [_useWallet])

	const loginUser = async (publicKey) => {
		try {
			let Data = {
				walletAddress: publicKey,
				refCode: refCode ? refCode : ''
			}
			let res = await authenticateUserAction(Data);

			if (res.success) {
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
							<Navbar.Brand href='https://bitme.ai' target='__blank'>
								<img src={`${config.BASE_URL}assets/images/logo/logo.png`} alt='mainLogo' className='mainLogo' width={`120px`} />
							</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="mx-auto">
									<Nav.Link href={`${config.BASE_URL}`} className={(path == "/" || path.match('presale')) && 'active'}>Public Sale</Nav.Link>
									<Nav.Link href={`${config.BASE_URL}bitdex`} className={path.match('bitdex') && 'active'} >BitDEX</Nav.Link>
									<Nav.Link target='__blank' href="https://bitme.ai/bitshare">BitSHARE</Nav.Link>
									<Nav.Link target='__blank' href="https://docs.bitme.ai/">Docs</Nav.Link>
									{/* <Nav.link>
										<div className="social-icons" >
											<a href="https://twitter.com/Bitme_ai" target="_blank" rel="noopener" className="social-icons__link" data-v-1ee40361><svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99003 21.75H1.68003L9.41003 12.915L1.25403 2.25H8.08003L12.793 8.481L18.244 2.25ZM17.083 19.77H18.916L7.08403 4.126H5.11703L17.083 19.77Z" fill="currentColor" />
											</svg>
											</a><a href="https://t.me/Bitme_ai" target="_blank" rel="noopener" className="social-icons__link" data-v-1ee40361><svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M12 0C5.37097 0 0 5.37097 0 12C0 18.629 5.37097 24 12 24C18.629 24 24 18.629 24 12C24 5.37097 18.629 0 12 0ZM17.8935 8.22097L15.9242 17.5016C15.779 18.1597 15.3871 18.3194 14.8403 18.0097L11.8403 15.7984L10.3935 17.1919C10.2339 17.3516 10.0984 17.4871 9.78871 17.4871L10.0016 14.4339L15.5613 9.41129C15.8032 9.19839 15.5081 9.07742 15.1887 9.29032L8.31774 13.6161L5.35645 12.6919C4.7129 12.4887 4.69839 12.0484 5.49194 11.7387L17.0613 7.27742C17.5984 7.08387 18.0677 7.40806 17.8935 8.22097Z" fill="currentColor" />
											</svg>
											</a>
										</div>
									</Nav.link> */}
								</Nav>
								<div className="d-flex me-2 fs-4 social-link">
									<div className='me-3'><a href='https://twitter.com/Bitme_ai' target='__blank' className=''><FaXTwitter /></a></div>
									<div className='me-3'><a href='https://t.me/Bitme_ai' target='__blank' className=''><FaTelegram /></a></div>
								</div>
								<div className='headbtn wltBtn wltBtn'>
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