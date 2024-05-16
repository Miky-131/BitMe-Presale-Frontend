import React, { useState, useEffect } from 'react';
import config from '../../config';
import { Container, Row, Col, Button, Card, Modal, Form, Table } from 'react-bootstrap';
import Header from '../../directives/Header'
import Footer from '../../directives/Footer'
import "../componentCss/home.css"
import DataTable, { createTheme } from 'react-data-table-component';
import { FaRegClone } from "react-icons/fa";
import copy from 'copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Cookies from "js-cookie";
// import { authenticateUserAction } from '../../coreFile/action';
// import { Navigate, useParams } from "react-router-dom";

import usePresale from "../../hooks/usePresale";
// import ReverseTimer from './startTimer';
import Refferalbtn from './refferalbtn'
import '../componentCss/modal.css'
import '../componentCss/responsive.css'
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletSelect } from '../WalletSelect';
import { PRESALE_PROGRAM_PUBKEY } from "../../hooks/constants";
import useSolPrice from '../../hooks/useSolPrice';
import EndTimer from './endTimer';
import StartTimer from './startTimer';
import { getTrxHistoryAction } from '../../coreFile/action';

const now = 0;


const Home = () => {
	const _useWallet = useWallet();
	const loginData = Cookies.get('bitmeUserLogin') ? JSON.parse(Cookies.get('bitmeUserLogin')) : null;
	// let { refCode } = useParams();
	const [saleIs, setSaleIs] = useState('WAITING');
	const [saleStartIs, setSaleStartIs] = useState('RUNNING');
	const [isRedeemEnable, setIsRedeemEnable] = useState(false);
	const [data, setTrxHistory] = useState([]);
	const [price, setPrice] = useState(0)


	const [show, setShow] = useState(false);
	const [refLink, setRefLink] = useState('');
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const [solBalance, setSolBalance] = useState(0);
	const { buyToken, balance, price_per_token, buyAmount, totalBuyAmount, entireBuyAmount, startTime, endTime } = usePresale();

	let soldBitMe_per = parseFloat((totalBuyAmount * 100) / 500000000).toFixed(5);
	const currentTime = Date.now();
	// var startTimeType = new Date(parseInt(startTime * 1000));
	// const startTimeDate = startTimeType.toUTCString();
	// var endTimeType = new Date(parseInt(endTime * 1000));
	// const endTimeDate = endTimeType.toUTCString();
	// const duration = (endTime - startTime) / (3600 * 24);

	let startTimeDate = '2024/05/16  08:00 AM';
	let endTimeDate = '2024/05/21  08:00 AM';
	let duration = '5';
	// const referAddress = "8tFunKMZagDsCRgKusmtdNPcPW2ReEzr7RvuV5hK6kbD";
	let referAddress = loginData?.referredBy ? loginData?.referredBy : '';
	const onBuyToken = async () => {
		if (solBalance < 0.1) {
			toast.warning("Please check SOL balance again.");
			return;
		}
		buyToken(solBalance, referAddress, _useWallet);
	};

	const setMaxValue = () => {
		let maxBalance = (Number(balance) / 10 ** 9).toFixed(2);
		setSolBalance(maxBalance)
	}

	var url = "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd";
	useEffect(() => {
		const getPrice = async() => {
			fetch(url)
			.then(response => response.json())
			.then(data => setPrice(data.solana.usd))
		}
		getPrice()
	}, [])

	useEffect(() => {
		getTrxHistory()
	}, []);
	const getTrxHistory = async () => {
		try {
			let res = await getTrxHistoryAction();
			if (res.success) {
				setTrxHistory(res.data);
			}
		} catch (err) {
			console.log('getTrxHistory', err)
		}
	}

	useEffect(() => {
		if (loginData?.walletAddress) {
			setisLoggedIn(true);
			setRefLink(`https://app.bitme.ai/presale/app/${loginData.refCode}`);
		}
	}, [loginData, isLoggedIn]);

	useEffect(() => {
		// console.log(_useWallet.wallets)
		if (_useWallet.connected) {
			setisLoggedIn(true);
			// loginUser(_useWallet?.publicKey?.toBase58())
		} else {
			setisLoggedIn(false);
			console.log("_useWallet : disconnect")
			Cookies.remove('bitmeUserLogin');
		}
	}, [_useWallet, isLoggedIn])

	// const loginUser = async (publicKey) => {
	// 	try {
	// 		let Data = {
	// 			walletAddress: publicKey,
	// 			refCode : refCode ? refCode : ''
	// 		}
	// 		let res = await authenticateUserAction(Data);
	// 		if (res.success) {
	// 			// toast.success('Connected successfully!')
	// 			Cookies.set('bitmeUserLogin', JSON.stringify(res.data));
	// 			setisLoggedIn(true);
	// 		}
	// 	} catch (err) {
	// 	}
	// }

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const copyToClipboard = () => {
		copy(refLink);
		toast.success("Copied!");
		navigator.clipboard.writeText(refLink);
	};

	const columns = [
		{
			name: 'Time',
			width: '25%',
			height: '20px',
			cell: (item) => {
        return `${item?.datetime}`;
      },
		},
		{
			name: 'Address',
			width: '50%',
			height: '20px',
			cell: (item) => {
        return `${item?.walletAddress}`;
      },
		},
		{
			name: 'Amount',
			width: '20%',
			height: '20px',
			cell: (item) => {
        return `${item?.amountYouReceive} BITME`;
      },
		},
	]

	// const columns = [
	// 	{
	// 		name: 'time',
	// 		width: '25%',
	// 		height: '20px',
	// 		selector: row => row.time,
	// 	},
	// 	{
	// 		name: 'token price',
	// 		width: '20%',
	// 		height: '20px',
	// 		selector: row => row.tokenprice,
	// 	},
	// 	{
	// 		name: 'address',
	// 		width: '35%',
	// 		height: '20px',
	// 		selector: row => row.address,
	// 	},
	// 	{
	// 		name: 'amount',
	// 		height: '20px',
	// 		selector: row => row.amount,
	// 	}
	// ];

	// const data = [
	// {
	// 	id: 1,
	// 	time: '2024/05/15',
	// 	tokenprice: '$0.02',
	// 	address: '12po...Bg43',
	// 	amount: '0.0 bitme'
	// },
	// {
	// 	id: 2,
	// 	time: '2024/05/15',
	// 	tokenprice: '$0.02',
	// 	address: '12po...Bg43',
	// 	amount: '0.0 bitme'
	// },
	// {
	// 	id: 3,
	// 	time: '2024/05/15',
	// 	tokenprice: '$0.02',
	// 	address: '12po...Bg43',
	// 	amount: '0.0 bitme'
	// },
	// {
	// 	id: 4,
	// 	time: '2024/05/15',
	// 	tokenprice: '$0.02',
	// 	address: '12po...Bg43',
	// 	amount: '0.0 bitme'
	// },
	// {
	// 	id: 5,
	// 	time: '2024/05/15',
	// 	tokenprice: '$0.02',
	// 	address: '12po...Bg43',
	// 	amount: '0.0 bitme'
	// },
	// {
	// 	id: 6,
	// 	time: '2024/05/15',
	// 	tokenprice: '$0.02',
	// 	address: '12po...Bg43',
	// 	amount: '0.0 bitme'
	// },
	// ];

	createTheme('solarized', {
		text: {
			primary: 'rgb(100 48 37)',
			secondary: '#643025',
			fontWeight: '500'
		},
		background: {
			default: 'transparent',
		},
		context: {
			background: '#cb4b16',
			text: '#FFFFFF',
		},
		divider: {
			default: 'transparent',
		},
		action: {
			button: 'rgba(0,0,0,.54)',
			hover: 'rgba(0,0,0,.08)',
			disabled: 'rgba(0,0,0,.12)',
		},
	}, 'dark');

	const redirectTo = (url) => {
		window.open(url, '_blank');
	}


	return (
		<>
			<Header isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />
			<Toaster />
			<div className='main'>
				<section className='presale py-5'>
					<Container>
						<div className='mb-3'>
							<h6 className='text-uppercase text-primary mb-0 '>Bitme Public Sale Details</h6>
						</div>
						<Row className='align-items-end'>
							<Col xl={12} className='referralBtn mobileShow'>
								<div >
									<Button variant='light-primary' className='messageBtn mb-3'>
										<Refferalbtn />
									</Button>
								</div>
							</Col>
						</Row>
						<div className='align-items-end d-flex justify-content-between'>

							<div >
								<div className='referralBtn d-xl-flex'>
									<div>
										<Button variant='light-primary' className='me-2 btn-sm px-4 mb-3 refer_and_earn text-nowrap' onClick={handleShow}>

											REFER AND EARN</Button>
									</div>
									<div className='desktopShow'>
										<Button variant='light-primary' className='messageBtn mb-3 norefInfo'>
											<Refferalbtn />
										</Button>
									</div>


								</div>
							</div>
							<div xl={3} md={4} sm={4} xs={6}>
								<div className='text-end  how_to_buy'>

									{/* <Button onClick={() => redirectTo('https://t.me/Bitme_ai')} variant='light-primary' className='me-3 btn-sm px-4 mb-4'>JOIN COMMUNITY</Button> */}
									<a href='https://docs.bitme.ai/intro-token/tokenomics' target="_blank" className='text-uppercase me-3 bg-transparent text-decoration-underline border-0 px-0 mb-1 howtobuy d-inline-block'>Tokenomics</a>

									<a href='https://docs.bitme.ai/bitme/public-sale-of-usdbitme#bitme-public-sale-quick-start-guide' target="_blank" className='text-uppercase me-3 bg-transparent text-decoration-underline border-0 px-0 mb-3 howtobuy d-inline-block'>how to buy?</a>
								</div>
							</div>

						</div>
						{/* <div className='d-lg-flex justify-content-between align-items-center referralBtn'>

							<div>
								<Button variant='light-primary' className='me-2 btn-sm px-4 mb-3' onClick={handleShow}>

									REFER AND EARN</Button>
								<Button variant='light-primary' className='messageBtn mb-3' onClick={handleShow}>
									{!refCode &&
										<span className='btn-primary refText btn-orange' >No REFERRAL LINK DETECTED, USE ONE FOR ADDITIONAL BENEFITS!</span>

									}
									{refCode &&
										<span className=' btn-success refText btn-green' >REFERRAL LINK DETECTED, ENJOY THE  BENEFITS!</span>
									}
								</Button>


							</div>
							<div className='text-end'>

							
								<a href='#' className='text-uppercase text-primary me-3 bg-transparent text-decoration-underline border-0 px-0 mb-3'>how to buy?</a>
							</div>
						</div> */}
						<div>
							<Row>
								<Col xl={8} className='mb-2 pe-xl-2'>
									<Card className='p-2'>

										<div className='card-style1 me-2 w-100 mb-2'>
											<Card className='p-2'>
												<label className="small text-uppercase text-light-primary">details</label>
												<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase'>All the details related to Bitme and the Public Sale.</h6>

											</Card>

										</div>
										<div className='card-style1 w-100 '>
											<Card className='p-2'>
												<div className='mb-3'>
													<label className="small text-uppercase text-light-primary">token address</label>
													<h6 className='mb-0 fw-bold d-flex align-items-center text-break'>
														<a style={{ color: '#643025' }} target="_blank" href={`https://solscan.io/token/${config.TOKEN_CONTRACT}#holders`}> {config.TOKEN_CONTRACT} </a>
														{/* <a style={{ color: '#643025' }} target="_blank" href={`https://solscan.io/token/${PRESALE_PROGRAM_PUBKEY.toString()}`}> {PRESALE_PROGRAM_PUBKEY.toString()} </a> */}
													</h6>
												</div>
												<div className='mb-3'>
													<label className="small text-uppercase text-light-primary">token symbol</label>
													<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-break'>bitme</h6>
												</div>
												<div className='mb-3'>
													<label className="small text-uppercase text-light-primary">project token quantity</label>
													<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-break'>1,000,000,000 bitme</h6>
												</div>
												<div className='mb-3'>
													<label className="small text-uppercase text-light-primary">Quantity available for the public sale</label>
													<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-break'>500,000,000 bitme</h6>
												</div>
												<div className='mb-3'>
													<label className="small text-uppercase text-light-primary">start / end price</label>
													<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-break'>7500 BITME per SOL / 1500 BITME per SOL</h6>
												</div>
												<div className='mb-3'>
													<label className="small text-uppercase text-light-primary">Start time</label>
													<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-break'>{startTimeDate} </h6>
												</div>
												<div className='mb-3'>
													<label className="small text-uppercase text-light-primary">end time</label>
													<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-break'>{endTimeDate} </h6>
												</div>
												<div className=''>
													<label className="small text-uppercase text-light-primary">duration</label>
													<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-break'>{duration} days</h6>
												</div>
											</Card>

										</div>


									</Card>

								</Col>

								<Col xl={4} className='ps-xl-0'>
									<div className='formBox'>
										<Card className='p-2 pb-0 mb-2'>

											<Row>
												<Col lg={6} className='mb-2 pe-xl-1'>
													<div className='card-style1 '>
														<Card className='p-2'>
															<label className="small text-uppercase text-light-primary">Start In</label>
															<StartTimer saleStartIs={saleStartIs} setSaleStartIs={setSaleStartIs} setSaleIs={setSaleIs} />
														</Card>
													</div>
												</Col>
												<Col lg={6} className='mb-2 ps-xl-1'>
													<div className='card-style1 '>
														<Card className='p-2'>
															<label className="small text-uppercase text-light-primary">Ending in</label>
															<h6 className='mb-0 fw-bold'>
																<EndTimer saleStartIs={saleStartIs} saleIs={saleIs} setSaleIs={setSaleIs} setIsRedeemEnable={setIsRedeemEnable} />

															</h6>
														</Card>
													</div>
												</Col>
												<Col lg={6} className='mb-2 pe-xl-1'>
													<div className='card-style1'>
														<Card className='p-2'>
															<label className="small text-uppercase text-light-primary">launch token</label>
															<h6 className='mb-0 fw-bold d-flex align-items-center'><img src={`${config.BASE_URL}assets/images/bitme.png`} width={`16px`} className='me-2' />BITME</h6>
														</Card>
													</div>
												</Col>
												<Col lg={6} className='mb-2 ps-xl-1'>
													<div className='card-style1'>
														<Card className='p-2'>
															<label className="small text-uppercase text-light-primary">STATUS</label>
															{saleIs == 'WAITING' &&
																<h6 className='mb-0 text-uppercase'>
																	<span style={{ borderRadius: '50%', height: '13px', width: '13px', backgroundColor: 'gray', display: 'inline-block', marginRight: '5px' }}></span> waiting</h6>
															}
															{saleIs == 'LIVE' &&
																<h6 className='mb-0 text-uppercase'>
																	<span style={{ borderRadius: '50%', height: '13px', width: '13px', backgroundColor: 'green', display: 'inline-block', marginRight: '5px' }}></span> live</h6>
															}
															{saleIs == 'ENDED' &&
																<h6 className='mb-0 text-uppercase'>
																	<span style={{ borderRadius: '50%', height: '13px', width: '13px', backgroundColor: 'gray', display: 'inline-block', marginRight: '5px' }}></span> ended</h6>
															}
														</Card>
													</div>
												</Col>

												{/* <Col lg={6} className='mb-2'>
													<div className='card-style1'>
														<Card className='p-2'>
															<label className="small text-uppercase text-light-primary">raising token</label>
															<h6 className='mb-0 fw-bold d-flex align-items-center'><img src='assets/images/solana.png' width={`16px`} className='me-1' />SOL</h6>
														</Card>
													</div>
												</Col>
												<Col lg={6} className='mb-2'>
													<div className='card-style1'>
														<Card className='p-2'>
															<label className="small text-uppercase text-light-primary">blockchain</label>
															<h6 className='mb-0 text-uppercase'> solana</h6>
														</Card>
													</div>
												</Col>
												<Col lg={6} className='mb-2'>
													<div className='card-style1'>
														<Card className='p-2'>
															<label className="small text-uppercase text-light-primary">you committed</label>
															<div className='d-flex justify-content-between'>
																<h6 className='mb-0 fw-bold'>0</h6>
																<h6 className='mb-0 fw-bold d-flex align-items-center'>SOL<img src='assets/images/solana.png' width={`16px`} className='ms-1' /></h6>
															</div>
														</Card>
													</div>
												</Col>
												<Col lg={6} className='mb-2'>
													<div className='card-style1'>
														<Card className='p-2'>
															<label className="small text-uppercase text-light-primary">your allocation</label>
															<div className='d-flex justify-content-between'>
																<h6 className='mb-0 fw-bold'>0</h6>
																<h6 className='mb-0 fw-bold d-flex align-items-center'>BITME<img src='assets/images/bitme.png' width={`16px`} className='ms-1' /></h6>
															</div>
														</Card>
													</div>
												</Col> */}

												<Col lg={12} className='mb-2'>
													<div className='card-style1'>
														<Card className='p-2'>
															<label className="small text-uppercase text-light-primary">Tokens Released</label>
															<div className='d-flex justify-content-between mb-2'>
																<h6 className='mb-0 fw-bold d-sm-flex align-items-center'>{new Intl.NumberFormat().format(totalBuyAmount)} / 500,000,000 BITME <img src={`${config.BASE_URL}assets/images/bitme.png`} width={`16px`} className='ms-1' /></h6>
																<h6 className='mb-0 fw-bold'>{new Intl.NumberFormat().format(totalBuyAmount / (5 * 10 ** 6))}%</h6>
															</div>
															<ProgressBar now={now} label={`${now}%`} />
														</Card>
													</div>
												</Col>
											</Row>

										</Card>
										<Card className='p-2  mb-2 position-relative'>

											{startTime * 1000 > currentTime &&
												<div className='boxOverlay'></div>
											}

											{isLoggedIn && saleIs != 'LIVE' && !isRedeemEnable &&
												<>
													{/* <div className='boxOverlay'></div> */}
												</>
											}

											<Row>
												{/* <Col lg={6} className='mb-2'>
													<div className='card-style1'>
														<Card className='p-2'>
															<div className='d-flex justify-content-between mb-1'>
																<label className="small text-uppercase text-light-primary">You Pay</label>
																<label className="small text-uppercase text-light-primary">Max</label>
															</div>
															<Form.Group className=" position-relative mb-1" controlId="formBasicEmail">
																<Form.Control type="text" value='0' className='bg-white border-0 rounded-2' />
																<h6 className='mb-0 fw-bold d-flex align-items-center position-absolute copybtn bg-transparent'>SOL<img src='assets/images/solana.png' width={`16px`} className='ms-1' /></h6>

															</Form.Group>
															<div className='text-end'>
																<label className="small text-uppercase text-light-primary">Balance 0.0</label>
															</div>
														</Card>
													</div>
												</Col>
												<Col lg={6} className='mb-2'>
													<div className='card-style1'>
														<Card className='p-2'>
															<div className='d-flex justify-content-between mb-1'>
																<label className="small text-uppercase text-light-primary">You Get</label>

															</div>
															<Form.Group className=" position-relative mb-1" controlId="formBasicEmail">
																<Form.Control type="text" value='0' className='bg-white border-0 rounded-2' />
																<h6 className='mb-0 fw-bold d-flex align-items-center position-absolute copybtn bg-transparent'>SOL<img src='assets/images/bitme.png' width={`16px`} className='ms-1' /></h6>
															</Form.Group>
															<div className='text-end'>
																<label className="small text-uppercase text-light-primary">Balance 0.0</label>
															</div>
														</Card>
													</div>
												</Col> */}
												{!isLoggedIn &&
													<div className='connect_block'>
														<Col lg={12} className=' mb-2'>

															<div className='headbtn wltBtn'>
																<WalletSelect />
															</div>
														</Col>
														<Col lg={12} className=''>
															<div className='mb-0 small text-uppercase fw-medium mb-2 text-center lh-sm'>
																You need to connect your external wallet that contains your
																Solana, such as Phantom Wallet or Solflare, to continue.
															</div>
															<div className='card-style1'>
																<Card className='p-2'>
																	<div className='small fw-medium text-uppercase text-center lh-sm'>For more information on the public sale, the Bitme
																		project, or how its services work, please
																		consult the <a target='__blank' href='https://docs.bitme.ai/' className='text-primary'>documentation</a> section.</div>
																</Card>
															</div>
														</Col>
													</div>
												}
												{(isLoggedIn && (saleIs === "WAITING" || saleIs === "LIVE")) &&
													<div className='payment_block sameHeight'>
														<Col lg={12} className='mb-2'>
															<div className='card-style1'>
																<Card className='p-2'>
																	<div className='d-flex justify-content-between mb-1'>
																		<label className="small text-uppercase text-light-primary">You Pay</label>
																	</div>
																	<Form.Group className=" position-relative mb-1" controlId="formBasicEmail">
																		<Form.Control type="number" value={Number(solBalance).toString()} onChange={(e) => {
																			setSolBalance(Number(e.target.value));
																		}} className='border-0 rounded-2' />
																		{/* <input
																		type="number"
																		value={Number(solBalance).toString()}
																		onChange={(e) => {
																			setSolBalance(Number(e.target.value));
																		}}
																		className='border-0 rounded-2'
																	/> */}
																		<h6 className='mb-0 fw-bold d-flex align-items-center position-absolute copybtn bg-transparent me-2'>SOL<img src={`${config.BASE_URL}assets/images/solana.png`} width={`16px`} className='ms-1' /></h6>
																	</Form.Group>
																	<div className='d-flex justify-content-between mb-1 px-2'>
																		<label className="small text-uppercase text-light-primary" style={{ cursor: 'pointer' }} onClick={setMaxValue}>Max</label>
																		<label className="small text-uppercase text-light-primary">Balance {new Intl.NumberFormat().format(Number(balance) / 10 ** 9)}</label>
																	</div>

																</Card>
															</div>
														</Col>
														<Col lg={12} className='mb-2'>
															<div className='card-style1'>
																<Card className='p-2'>
																	<div className='d-flex justify-content-between mb-1'>
																		<label className="small text-uppercase text-light-primary">You Get</label>
																	</div>
																	<Form.Group className=" position-relative mb-1" controlId="formBasicEmail">
																		<Form.Control type="number" value={new Intl.NumberFormat().format(solBalance * price_per_token)} className='border-0 rounded-2' />
																		{/* <input
																		value={Number(solBalance * price_per_token).toFixed(2)}
																		className='border-0 rounded-2'
																	/> */}
																		<h6 className='mb-0 fw-bold d-flex align-items-center position-absolute copybtn bg-transparent me-2'>BITME<img src={`${config.BASE_URL}assets/images/bitme.png`} width={`16px`} className='ms-1' /></h6>
																	</Form.Group>
																	<div className='d-flex justify-content-between mb-1 px-2'>
																		<label className="small text-uppercase text-light-primary">&nbsp;</label>
																		<label className="small text-uppercase text-light-primary">Balance {new Intl.NumberFormat().format(Number(buyAmount) / 10 ** 9)}</label>
																	</div>

																</Card>
															</div>
														</Col>
														<Col lg={12} className=''>
															<Button
																className='text-uppercase w-100 mb-2'
																onClick={onBuyToken}
															>
																Confirm
															</Button>
															<div className='text-uppercase text-center fw-medium lh-sm xs-small'>
																by clicking confirm, you agree to our <a href='https://docs.bitme.ai/ressources/terms-of-use' style={{ color: '#643025' }} target='__blank'>terms of use</a>
															</div>

														</Col>

													</div>
												}
												{isLoggedIn && saleIs == "ENDED" &&
													<div className='redeem_block'>

														<Col lg={12} className='mb-2'>
															<div className='card-style1'>
																<Card className='p-2'>
																	<div className='d-flex justify-content-between mb-1'>
																		<label className="small text-uppercase text-light-primary">you redeem</label>

																	</div>

																	<div className='d-flex justify-content-between mb-1 px-2'>
																		<h6 className='mb-0 fw-bold d-flex align-items-center'>0</h6>
																		<h6 className='mb-0 fw-bold d-flex align-items-center'>BITME<img src='assets/images/bitme.png' width={`16px`} className='ms-2' /></h6>
																	</div>

																</Card>
															</div>
														</Col>
														<Col lg={12} className=''>
															<Button disabled className='text-uppercase w-100 mb-2'>Redeem</Button>
															<div className='text-uppercase text-center fw-medium lh-sm xs-small'>
																Claiming will only be enabled 2 hours after launchpad ends
															</div>

														</Col>

													</div>
												}

											</Row>

										</Card>
									</div>
								</Col>
							</Row>
						</div>
						<div >
							<Row>
								<Col lg={12} className=' pe-xl-2'>
									<Card className='p-2 mb-2'>
										<div className='d-xl-flex'>
											<div className='card-style1 me-2 w-100'>
												<Card className='p-2 pb-0 mb-2 price-detail-card'>
													<Row>
														<Col xl={6} md={6} className='mb-2'>
															<div className='me-2'>
																<span className='text-light-primary text-uppercase small fw-medium'>actual price</span>
																<h6 className='text-primary fw-bold'>{price_per_token / 10} BITME / {1 / 10} SOL</h6>
															</div>
														</Col>
														<Col xl={6} md={6} className='mb-2'>
															<div className='me-2'>
																<span className='text-light-primary text-uppercase small fw-medium'>funds raised</span>
																<h6 className='text-primary fw-bold'>{new Intl.NumberFormat().format(entireBuyAmount)} SOL</h6>
															</div>
														</Col>
														<Col xl={6} md={6} className='mb-2'>
															<div className='me-2'>
																<span className='text-light-primary text-uppercase small fw-medium'>bitme sold / available</span>
																<h6 className='text-primary mb-0 fw-bold'>{totalBuyAmount} / 500,000,000</h6>
															</div>
														</Col>
														<Col xl={6} md={6} className='mb-2'>
															<div className=''>
																<span className='text-light-primary text-uppercase small fw-medium'>liquidity pool</span>
																<h6 className='text-primary mb-0 fw-bold'>${new Intl.NumberFormat().format(entireBuyAmount * price)} ({entireBuyAmount} SOL)</h6>
															</div>
														</Col>
													</Row>

												</Card>

											</div>
											<div className='card-style1 w-100 mb-2 '>
												<Card className='p-2 price-detail-card'>
													<span className='text-light-primary text-uppercase small fw-medium'>chart</span>
													<ul className='list-group'>
														<li className='list-group-item p-0 bg-transparent border-0 text-uppercase fw-medium small'><div className='d-flex'><div><div className='orange colorBox me-2'></div></div>orange line represents the value of the token at its launch.</div></li>
														<li className='list-group-item p-0 bg-transparent border-0 text-uppercase fw-medium small'><div className='d-flex'><div><div className='brown colorBox me-2'></div></div>brown blocks indicate the selling price of BITME at certain tiers.</div></li>
														<li className='list-group-item p-0 bg-transparent border-0 text-uppercase fw-medium small'><div className='d-flex'><div><div className='darkbrown colorBox me-2'></div></div>dark brown line indicates the number of BITME sold up to now.</div></li>
														<li className='list-group-item p-0 bg-transparent border-0 text-uppercase fw-medium small'><div className='d-flex'><div><div className='red colorBox me-2'></div></div>red line represents the soft cap (10M)</div></li>

													</ul>
												</Card>

											</div>
										</div>
										<Card className=''>
											<div className='d-md-flex'>
												<div className='card-style1 w-100'>
													<Card className='p-2 pb-0 price-detail-card'>
														<Row>
															<Col lg={12} className='mb-2'>
																<center>
																	&nbsp;
																</center>
																<div className='chart-draw position-relative'>
																	<div className='chartFixed'>
																		<div className='chart-line' style={{ width: soldBitMe_per + '%' }}></div>
																	</div>
																	<img src={`${config.BASE_URL}assets/images/chartdiagram.png`} />
																</div>
															</Col>
														</Row>

													</Card>
												</div>

												{/* <div className='card-style1 w-100'>
												<Card className='p-2 price-detail-card'>
													<span className='text-light-primary text-uppercase small'>chart</span>
													<ul className='list-group'>
														<li className='list-group-item p-0 bg-transparent border-0 text-uppercase fw-medium small'>orange line represents the value of the token at its launch.</li>
														<li className='list-group-item p-0 bg-transparent border-0 text-uppercase fw-medium small'>brown blocks indicate the selling price of BITME at certain tiers.</li>
														<li className='list-group-item p-0 bg-transparent border-0 text-uppercase fw-medium small'>dark brown line indicates the number of BITME sold up to now.</li>
														<li className='list-group-item p-0 bg-transparent border-0 text-uppercase fw-medium small'>red line represents the soft cap (10M)</li>

													</ul>
												</Card>

											</div> */}
											</div>

										</Card>

									</Card>

								</Col>

								{/* <Col lg={6} className='mb-2 ps-lg-0'>
									<div className='card-style1'>
										<Card className='p-2'>
											<label className="small text-uppercase text-light-primary">details</label>
											<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase'>All the details related to Bitme and the presale.</h6>

										</Card>
									</div>
								</Col> */}
								<Col lg={12} className='mb-2 pe-xl-2'>
									<Card className='p-2'>

										<div className='card-style1 me-2 w-100 mb-2'>
											<Card className='p-2'>
												<label className="small text-uppercase text-light-primary">Purchase history</label>
												<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase'>Real-time list of $bitme purchases</h6>

											</Card>

										</div>
										<div className='card-style1 w-100'>
											<Card className='p-2 pb-3'>
												<DataTable
													pagination
													columns={columns}
													data={data}
													theme="solarized"
												/>

											</Card>

										</div>


									</Card>

								</Col>

							</Row>
						</div>
					</Container>
				</section>
			</div>
			{!isLoggedIn ?
				<Modal show={show} onHide={handleClose} className='referral_earn' size='md' centered>
					<Modal.Header className='border-0'>
						<Modal.Title>Refer and Earn</Modal.Title>
					</Modal.Header>
					<Modal.Body className='p-4'>
						<div className='text-center'>
							<h5 className='mb-4'>Connect your wallet to generate your
								unique referral link for the Bitme</h5>
							<div className='referral_link border border-2 p-4 rounded-4 border-primary'>
								<div className='d-flex align-items-center'>
									<h1 className='mb-0 me-3'>50%</h1>
									{/* <div class="v-line mx-3"></div> */}
									<div className='text-start mb-0 small'>Share your unique referral link and earn 50% of the redeem fees generated by the buyers.</div>
								</div>
							</div>
						</div>
						<br />
						<div className='headbtn wltBtn modelBtn' >
							{/*  onClick={() => setShow(false)} */}
							<center>
								<WalletSelect />
							</center>
						</div>
						{/* <WallletConnect isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}></WallletConnect> */}
					</Modal.Body>
				</Modal>
				:
				<Modal show={show} onHide={handleClose} className='referral_earn' size='md' centered>
					<Modal.Header className='border-0'>
						<Modal.Title>Refer and Earn</Modal.Title>
					</Modal.Header>
					<Modal.Body className='p-4 pb-0'>
						<div className='text-center'>
							{/* <h2>Refer & Earn</h2> */}
							<h5 className='mb-4'>Your unique referral link for Bitme</h5>
							<div className='referral_link border border-2 p-4 rounded-4 border-primary'>
								<Form.Group className="mb-3 position-relative" controlId="formBasicEmail">
									<Form.Control type="text" value={refLink.slice(0, 40) + '...'} readOnly className='bg-white border-0' />
									<Button variant='default' onClick={copyToClipboard} className='position-absolute copybtn bg-transparent text-primary border-0'><FaRegClone /></Button>
								</Form.Group>
								<div className='d-flex align-items-center'>
									<h1 className='mb-0 me-3'>50%</h1>
									{/* <div class="v-line mx-3"></div> */}
									<div className='text-start mb-0 small'>Share your unique referral link and earn 50% of the redeem fees generated by the buyers. </div>
								</div>

							</div>
							<p className='py-3 mb-0 promotnalText'>
								{/* <a href={`${config.BASE_URL}/assets/images/bit-ref-link.png`} download >Download promotional image</a> */}
								<a href={`/assets/images/bit-ref-link.png`} download >Download promotional image</a>  {/* Live */}
							</p>
						</div>
					</Modal.Body>
				</Modal>
			}
		</>
	)
}

export default Home;
