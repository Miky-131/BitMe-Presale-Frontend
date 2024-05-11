import React, { useState, useEffect } from 'react';
import config from '../../config';
import { Container, Row, Col, Button, Card, Form, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import Header from '../../directives/Header'
import Footer from '../../directives/Footer'
import toast, { Toaster } from 'react-hot-toast';
import Cookies from "js-cookie";
import { useWallet } from '@solana/wallet-adapter-react';
import usePresale from "../../hooks/usePresale";
import { authenticateUserAction } from '../../coreFile/action';
import { IoIosArrowDown } from "react-icons/io";
import '../componentCss/bitdex.css'
import "../componentCss/home.css"

const Bitdex = () => {
	const _useWallet = useWallet();
	const [isLoggedIn, setisLoggedIn] = useState(false);

	useEffect(() => {
		if (_useWallet.connected) {
			console.log({ _useWallet, connected: _useWallet.connected, publicKey: _useWallet?.publicKey?.toBase58() });
			loginUser(_useWallet?.publicKey?.toBase58())
		} else {
			setisLoggedIn(false);
			console.log("_useWallet : disconnect")
			Cookies.remove('bitmeUserLogin');
		}
	}, [_useWallet, isLoggedIn])

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
			<Header isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />
			<Toaster />
			<div className='main'>
				<section className='presale py-5'>
					<Container>
						<Row className='justify-content-center'>
							<Col lg={10}>
								<div className='mb-5 text-center'>
									<h6 class="mb-0 fw-bold text-uppercase mb-4">bitdex <sub className='bottom-0'>v.1</sub></h6>
									<h6 class="mb-0 fw-bold text-uppercase mb-4">
										Access a multi-blockchain decentralized exchange where $BITME holders can trade a broad range
										of cryptocurrencies with no fees, powered by AI to ensure the best rates and efficient trading.
									</h6>
									<h6 class="mb-0 fw-bold text-uppercase">Launching May 21st</h6>
								</div>
							</Col>

						</Row>
						<Row className='justify-content-center'>

							<Col xl={5}>
								<div className='formBox'>
									<Card className='p-2  mb-2 position-relative'>
										<div class="boxOverlay"></div>
										<Row>
											<div className='payment_block sameHeight'>

												<Col xl={12} className='mb-2'>
													<div className='card-style1'>
														<Card className='p-2'>
															<div className='d-flex justify-content-between mb-1'>
																<label className="small text-uppercase text-light-primary">You Pay</label>
															</div>
															<Form.Group className=" position-relative mb-1" controlId="formBasicEmail">
																<Form.Control type="number" className='border-0 rounded-2' />
																<h6 className='mb-0 fw-bold d-flex align-items-center position-absolute copybtn bg-transparent me-2'>BITME<img src={`${config.BASE_URL}assets/images/bitme.png`} width={`16px`} className='ms-1' /></h6>
															</Form.Group>
															<div className='d-flex justify-content-between mb-1 px-2'>
																<label className="small text-uppercase text-light-primary">Max</label>
																<label className="small text-uppercase text-light-primary">Balance: 0.0</label>
															</div>
														</Card>

													</div>
												</Col>
												<Col xl={12} className='mb-2'>
													<div className='card-style1'>
														<Card className='p-2'>
															<div className='d-flex justify-content-between mb-1'>
																<label className="small text-uppercase text-light-primary">You Receive</label>
															</div>
															<Form.Group className=" position-relative mb-1" controlId="formBasicEmail">

																<Form.Control type="number" className='border-0 rounded-2' />
																<Button className='position-absolute input-dropdown top-0 end-0 bottom-0 mb-0 fw-bold d-flex align-items-center'>
																	BTC&nbsp;<img src={`${config.BASE_URL}assets/images/Bitcoin.png`} width={`16px`} className='ms-1' />&nbsp;<IoIosArrowDown />
																</Button>

																{/* <DropdownButton
																	variant="default"
																	title="Bitme"
																	id="input-group-dropdown-1"
																	className='mb-0 fw-bold d-flex align-items-center position-absolute input-dropdown top-0 end-0 bottom-0'
																>
																	<Dropdown.Item href="#">Action</Dropdown.Item>
																	<Dropdown.Item href="#">Another action</Dropdown.Item>
																	<Dropdown.Item href="#">Something else here</Dropdown.Item>
																	<Dropdown.Divider />
																	<Dropdown.Item href="#">Separated link</Dropdown.Item>
																</DropdownButton> */}
																{/* <h6 className='mb-0 fw-bold d-flex align-items-center position-absolute copybtn bg-transparent me-2'>BITME<img src={`${config.BASE_URL}assets/images/bitme.png`} width={`16px`} className='ms-1' /></h6> */}

															</Form.Group>

															<div className='d-flex justify-content-between mb-1 px-2'>
																<label className="small text-uppercase text-light-primary">Max</label>
																<label className="small text-uppercase text-light-primary">Balance: 0.0</label>
															</div>

														</Card>

													</div>
												</Col>
												<Col lg={12} className=''>
													<Button
														className='text-uppercase w-100 mb-2'

														disabled
													>
														Continue
													</Button>
													<div className='text-uppercase text-center fw-medium lh-sm small mb-2'>
														by clicking continue, you agree to our terms and conditions
													</div>
													<div className='card-style1'>
														<Card className='p-2'>
															<div className='small fw-medium text-uppercase text-center lh-sm'>For more information about BitDEX, please consult
																the <a target='__blank' href='https://docs.bitme.ai/' className='text-primary'>documentation</a> section.</div>
														</Card>
													</div>

												</Col>


											</div>
										</Row>


									</Card>

								</div>
							</Col>

						</Row>

					</Container>
				</section>
			</div>

		</>
	)
}

export default Bitdex;
