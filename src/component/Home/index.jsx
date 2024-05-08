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
import { authenticateUserAction } from '../../coreFile/action';
import { useParams } from "react-router-dom";
import WallletConnect from './solfareWalletConnect';
import usePresale from "../../hooks/usePresale";

const now = 0;


const Home = () => {
	const loginData = Cookies.get('bitmeUserLogin') ? JSON.parse(Cookies.get('bitmeUserLogin')) : null;
	let { encAddress } = useParams();
	const [show, setShow] = useState(false);
	const [refLink, setRefLink] = useState('');
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const [solBalance, setSolBalance] = useState(0);
	const { buyToken, balance, price_per_token, buyAmount } = usePresale();

	const onBuyToken = async () => {
		if (solBalance < 0.1) {
		  toast.warning("Please check SOL balance again.");
		  return;
		}
		buyToken(solBalance, solBalance * price_per_token);
	  };
	

	useEffect(() => {
		if (loginData?.walletAddress) {
			setisLoggedIn(true);
			setRefLink(`https://app.bitme.ai/presale/app/${btoa(loginData.walletAddress)}`);
		}
	}, [loginData]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const copyToClipboard = () => {
		copy(refLink);
		toast.success("Copied!");
		navigator.clipboard.writeText(refLink);
	};

	const columns = [
		{
			name: 'time',
			width: '25%',
			height: '20px',
			selector: row => row.time,
		},
		{
			name: 'token price',
			width: '20%',
			height: '20px',
			selector: row => row.tokenprice,
		},
		{
			name: 'address',
			width: '35%',
			height: '20px',
			selector: row => row.address,
		},
		{
			name: 'amount',
			height: '20px',
			selector: row => row.amount,
		}

	];

	const data = [
		{
			id: 1,
			time: '2024/05/15',
			tokenprice: '$0.02',
			address: '12po...Bg43',
			amount: '0.0 bitme'
		},
		{
			id: 2,
			time: '2024/05/15',
			tokenprice: '$0.02',
			address: '12po...Bg43',
			amount: '0.0 bitme'
		},
		{
			id: 3,
			time: '2024/05/15',
			tokenprice: '$0.02',
			address: '12po...Bg43',
			amount: '0.0 bitme'
		},
		{
			id: 4,
			time: '2024/05/15',
			tokenprice: '$0.02',
			address: '12po...Bg43',
			amount: '0.0 bitme'
		},
		{
			id: 5,
			time: '2024/05/15',
			tokenprice: '$0.02',
			address: '12po...Bg43',
			amount: '0.0 bitme'
		},
		{
			id: 6,
			time: '2024/05/15',
			tokenprice: '$0.02',
			address: '12po...Bg43',
			amount: '0.0 bitme'
		},



	];
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
			<Header />
			<Toaster />
			<div className='main'>
				<section className='presale py-5'>
					<Container>

						<div className='d-lg-flex justify-content-between align-items-center'>
							<div className='mb-4'>
								<h6 className='text-uppercase text-primary mb-0 '>bitme presale details</h6>

							</div>

							<div className='text-end'>
								<Button variant='light-primary' className='me-3 btn-sm px-4 mb-4' onClick={handleShow}>
									{!encAddress &&
										<span className='me-4 btn-primary refText btn-orange' >No REFERRAL LINK DETECTED, USE ONE FOR ADDITIONAL BENEFITS!</span>
									}
									{encAddress &&
										<span className='me-4 btn-success refText btn-green' >REFERRAL LINK DETECTED, ENJOY THE  BENEFITS!</span>
									}
									REFER AND EARN</Button>
								<Button onClick={() => redirectTo('https://t.me/Bitme_ai')} variant='light-primary' className='me-3 btn-sm px-4 mb-4'>JOIN COMMUNITY</Button>
							</div>
						</div>
						<div>
							<Row>
								<Col lg={8} className='mb-2 pe-lg-2'>
									<Card className='p-2  mb-2'>
										<div className='d-md-flex'>
											<div className='card-style1 me-2 w-100'>
												<Card className='p-2 pb-0 price-detail-card'>
													<Row>
														<Col lg={6} className='mb-2'>
															<div className='me-2 mb-2'>
																<span className='text-light-primary text-uppercase small fw-medium'>actual price</span>
																<h6 className='text-primary'>$0.02 (0.00004 SOL)</h6>
															</div>
														</Col>
														<Col lg={6} className='mb-2'>
															<span className='text-light-primary text-uppercase small fw-medium'>actual price</span>
															<h6 className='text-primary'>$0.02 (0.00004 SOL)</h6>
														</Col>
														<Col lg={6} className='mb-2'>
															<div className='me-2 mb-2'>
																<span className='text-light-primary text-uppercase small fw-medium'>actual price</span>
																<h6 className='text-primary'>$0.02 (0.00004 SOL)</h6>
															</div>
														</Col>
														<Col lg={6} className='mb-2'>
															<div className='mb-2'>
																<span className='text-light-primary text-uppercase small fw-medium'>actual price</span>
																<h6 className='text-primary'>$0.02 (0.00004 SOL)</h6>
															</div>
														</Col>
													</Row>

												</Card>

											</div>
											<div className='card-style1 w-100 '>
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

									</Card>
									<Card className='p-2'>
										<div className='d-md-flex'>
											<div className='card-style1 w-100'>
												<Card className='p-2 pb-0 price-detail-card'>
													<Row>
														<Col lg={12} className='mb-2'>
															<center>
																&nbsp;
															</center>
															<div className='chart-draw'>
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
								</Col>

								<Col lg={4} className='ps-lg-0'>
									<Card className='p-2 pb-0 mb-2'>

										<Row>
											<Col lg={6} className='mb-2'>
												<div className='card-style1'>
													<Card className='p-2'>
														<label className="small text-uppercase text-light-primary">Start</label>
														<h6 className='mb-0 fw-bold'>15 May 2024, 08:00</h6>
													</Card>
												</div>
											</Col>
											<Col lg={6} className='mb-2'>
												<div className='card-style1'>
													<Card className='p-2'>
														<label className="small text-uppercase text-light-primary">Ending in</label>
														<h6 className='mb-0 fw-bold'>05 : 00 : 00 : 00</h6>
													</Card>
												</div>
											</Col>
											<Col lg={6} className='mb-2'>
												<div className='card-style1'>
													<Card className='p-2'>
														<label className="small text-uppercase text-light-primary">launch token</label>
														<h6 className='mb-0 fw-bold d-flex align-items-center'><img src={`${config.BASE_URL}assets/images/bitme.png`} width={`16px`} className='me-2' />BITME</h6>
													</Card>
												</div>
											</Col>
											<Col lg={6} className='mb-2'>
												<div className='card-style1'>
													<Card className='p-2'>
														<label className="small text-uppercase text-light-primary">STATUS</label>
														<h6 className='mb-0 text-uppercase'>waiting</h6>
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
														<label className="small text-uppercase text-light-primary">Total allocation</label>
														<div className='d-flex justify-content-between mb-2'>
															<h6 className='mb-0 fw-bold d-flex align-items-center'>0 / 500 000 000 BITME <img src={`${config.BASE_URL}assets/images/bitme.png`} width={`16px`} className='ms-1' /></h6>
															<h6 className='mb-0 fw-bold'>0%</h6>
														</div>
														<ProgressBar now={now} label={`${now}%`} />
													</Card>
												</div>
											</Col>
										</Row>

									</Card>
									<Card className='p-2  mb-2'>

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
											{/* <div className='connect_block'>
												<Col lg={12} className=' mb-2'>
													<Button disabled className='text-uppercase w-100'>Connect Solana</Button>

												</Col>
												<Col lg={12} className=''>
													<div className='mb-0 small text-uppercase fw-medium mb-2 text-center lh-sm'>
														You need to connect your external wallet that contains your
														Solana, such as Phantom Wallet or Solflare, to continue.
													</div>
													<div className='card-style1'>
														<Card className='p-2'>
															<div className='small fw-medium text-uppercase text-center lh-sm'>For more information on the presale, the Bitme
																project, or how its services work, please
																consult the <a href='#' className='text-primary'>documentation</a> section.</div>
														</Card>
													</div>
												</Col>
											</div> */}
											<div className='payment_block'>
												<Col lg={12} className='mb-2'>
													<div className='card-style1'>
														<Card className='p-2'>
															<div className='d-flex justify-content-between mb-1'>
																<label className="small text-uppercase text-light-primary">You Pay</label>
															</div>
															<Form.Group className=" position-relative mb-1" controlId="formBasicEmail">
																{/* <Form.Control type="text" value='0' className='border-0 rounded-2' /> */}
																<input
																	type="number"
																	value={Number(solBalance).toString()}
																	onChange={(e) => {
																		setSolBalance(Number(e.target.value));
																	}}
																	className='border-0 rounded-2'
																/>
																<h6 className='mb-0 fw-bold d-flex align-items-center position-absolute copybtn bg-transparent me-2'>SOL<img src={`${config.BASE_URL}assets/images/solana.png`} width={`16px`} className='ms-1' /></h6>
															</Form.Group>
															<div className='text-end'>
																<label className="small text-uppercase text-light-primary">Balance {(Number(balance) / 10 ** 9).toFixed(2)}</label>
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
																<input
																	value={Number(solBalance * price_per_token).toFixed(2)}
																	className='border-0 rounded-2'
																/>
																<h6 className='mb-0 fw-bold d-flex align-items-center position-absolute copybtn bg-transparent me-2'>TBITME<img src={`${config.BASE_URL}assets/images/bitme.png`} width={`16px`} className='ms-1' /></h6>
															</Form.Group>
															<div className='d-flex justify-content-between mb-1 px-2'>
																{/* <label className="small text-uppercase text-light-primary">Max</label> */}
																<label className="small text-uppercase text-light-primary">Balance {Number(buyAmount) / 10 ** 9}</label>
															</div>

														</Card>
													</div>
												</Col>
												<Col lg={12} className=''>
													<Button 
														className='text-uppercase w-100 mb-2'
														onClick={onBuyToken}
													>
														BUY
													</Button>
													<div className='text-uppercase text-center fw-medium lh-sm xs-small'>
														by clicking confirm, you agree to our terms and conditions
													</div>

												</Col>

											</div>
											{/* <div className='redeem_block'>

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

											</div> */}

										</Row>

									</Card>
								</Col>
							</Row>
						</div>
						<div >
							<Row>
								<Col lg={6} className='mb-2 pe-lg-2'>
									<div className='card-style1'>
										<Card className='p-2'>
											<label className="small text-uppercase text-light-primary">Purchase History</label>
											<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase'>Real-time list of $bitme purchases</h6>

										</Card>
									</div>
								</Col>
								<Col lg={6} className='mb-2 ps-lg-0'>
									<div className='card-style1'>
										<Card className='p-2'>
											<label className="small text-uppercase text-light-primary">details</label>
											<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase'>All the details related to Bitme and the presale.</h6>

										</Card>
									</div>
								</Col>
								<Col lg={6} className='mb-2 pe-lg-2'>
									<div className='card-style1'>
										<Card className='p-2 pb-3'>
											<DataTable
												pagination
												columns={columns}
												data={data}
												theme="solarized"
											/>

										</Card>
									</div>
								</Col>
								<Col lg={6} className='mb-2 ps-lg-0'>
									<div className='card-style1'>
										<Card className='p-2'>
											<div className='mb-3'>
												<label className="small text-uppercase text-light-primary">token address</label>
												<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-wrap'>ARwjDQRry2CmF2RPKL19ZRmAwg852ZGQWtLMQ3jRtKKt</h6>
											</div>
											<div className='mb-3'>
												<label className="small text-uppercase text-light-primary">token symbol</label>
												<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-wrap'>bitme</h6>
											</div>
											<div className='mb-3'>
												<label className="small text-uppercase text-light-primary">project token quantity</label>
												<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-wrap'>1,000,000,000 bitme</h6>
											</div>
											<div className='mb-3'>
												<label className="small text-uppercase text-light-primary">Quantity available for the presale</label>
												<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-wrap'>500,000,000 bitme</h6>
											</div>
											<div className='mb-3'>
												<label className="small text-uppercase text-light-primary">start / end price</label>
												<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-wrap'>0.02 usd / 0.10 USD</h6>
											</div>
											<div className='mb-3'>
												<label className="small text-uppercase text-light-primary">Start time</label>
												<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-wrap'>2024/05/15 08:00 (Local time)</h6>
											</div>
											<div className='mb-3'>
												<label className="small text-uppercase text-light-primary">end time</label>
												<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-wrap'>2024/05/20 08:00 (local time)</h6>
											</div>
											<div className=''>
												<label className="small text-uppercase text-light-primary">duration</label>
												<h6 className='mb-0 fw-bold d-flex align-items-center text-uppercase text-wrap'>5 days</h6>
											</div>
										</Card>
									</div>
								</Col>
							</Row>
						</div>
					</Container>
				</section>
			</div>
			{!loginData ?
				<Modal show={show} onHide={handleClose} className='referral_earn' size='mg'>
					<Modal.Header className='border-0'>
					</Modal.Header>
					<Modal.Body className='p-4'>
						<div className='text-center' style={{ marginTop: "-35px" }}>
							<h2>Refer & Earn</h2>
							<p>Connect wallet first to generate your unique referral link for Bitme</p>
							<div className='referral_link border border-2 p-4 rounded-4 border-primary'>
								<div className='d-md-flex align-items-center'>
									<h1 className='mb-0'>50%</h1>
									<div class="v-line mx-3"></div>
									<p className='text-start mb-0'>Share your unique referral link and earn up to 50% of the redeem fees generated.</p>
								</div>
							</div>


						</div>
						<br />
						<WallletConnect isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}></WallletConnect>
					</Modal.Body>
				</Modal>
				:
				<Modal show={show} onHide={handleClose} className='referral_earn' size='mg'>
					<Modal.Header className='border-0'>
					</Modal.Header>
					<Modal.Body className='p-4'>
						<div className='text-center' style={{ marginTop: "-35px" }}>
							<h2>Refer & Earn</h2>
							<p>Your unique referral link for Bitme</p>
							<div className='referral_link border border-2 p-4 rounded-4 border-primary'>
								<Form.Group className="mb-3 position-relative" controlId="formBasicEmail">
									<Form.Control type="text" value={refLink} className='bg-white border-0 rounded-4' readOnly />
									<Button variant='default' onClick={copyToClipboard} className='position-absolute copybtn'><FaRegClone /></Button>
								</Form.Group>
								<div className='d-md-flex align-items-center'>
									<h1 className='mb-0'>50%</h1>
									<div class="v-line mx-3"></div>
									<p className='text-start mb-0'>Share your unique referral link and earn up to 50% of the redeem fees generated.</p>
								</div>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			}
		</>
	)
}

export default Home;
