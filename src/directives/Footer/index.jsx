import React from 'react';
import config from '../../config';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../component/componentCss/header.css'
import "../../component/componentCss/footer.css"
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter,FaLinkedinIn,FaInstagram } from "react-icons/fa6";



const Footer = () => {
    return (
        <>
            <footer className="page-footer font-small blue pt-4">
                <Container className="text-md-left">
                    <Row>
                        <Col lg={3}className="mt-md-0 mt-3">
                            <div className='footer-logo mb-2'>
                                <img src="assets/images/logo/logo.png" alt='mainLogo' className='mainLogo' width={`120px`} />
                            </div>
                            <p className='text-grey'>4140 Parker Rd. Allentown, New Mexico 31134</p>
                            <div className='social-icon'>
                                <h6 className='text-grey2 fw-normal mb-2'>Connect with us</h6>
                                <ul className="list-unstyled">
                                    <li className='d-inline-block'>
                                        <FaFacebookF fill='#d3d3d3'/>
                                    </li>
                                    <li className='d-inline-block'>
                                        <FaXTwitter fill='#d3d3d3'/>
                                    </li>
                                    <li className='d-inline-block'>
                                    <FaLinkedinIn fill='#d3d3d3'/>
                                    </li>
                                    <li className='d-inline-block'>
                                    <FaInstagram fill='#d3d3d3'/>
                                    </li>
                                </ul>

                            </div>
                        </Col>
                        <Col lg={9}>
                            <Row>
                                <Col lg={2} md={6} className="mb-md-0 mb-3">
                                    <div className='footer-block'>
                                    {/* <h5 className="text-uppercase">Links</h5> */}
                                    <ul className="list-unstyled mb-0">
                                        <li><a href="#!">About Us</a></li>
                                        <li><a href="#!">Careers</a></li>
                                        <li><a href="#!">Sitemap</a></li>
                                        <li><a href="#!">Credits</a></li>
                                    </ul>
                                    </div>
                                </Col>

                                <Col lg={4} md={6} className="mb-md-0 mb-3">
                                    <div className='footer-block'>
                                    {/* <h5 className="text-uppercase">Links</h5> */}
                                    <ul className="list-unstyled">
                                        <li><a href="#!">International Jobs Browse Jobs</a></li>
                                        <li><a href="#!">Career Advice Talent Network</a></li>

                                    </ul>
                                    </div>
                                </Col>
                                <Col lg={4} md={6} className="mb-md-0 mb-3">
                                    <div className='footer-block'>
                                    {/* <h5 className="text-uppercase">Links</h5> */}
                                    <ul className="list-unstyled mb-0">
                                        <li><a href="#!">Post Jobs Search Resumes</a></li>
                                        <li><a href="#!">Career Advice Talent Network</a></li>
                                        <li><a href="#!">All jobs</a></li>
                                        <li><a href="#!">All cities</a></li>
                                        <li><a href="#!">All companies</a></li>
                                    </ul>
                                    </div>
                                </Col>
                                <Col lg={2} md={6} className="mb-md-0 mb-3">
                                    <div className='footer-block'>
                                    {/* <h5 className="text-uppercase">Links</h5> */}
                                    <ul className="list-unstyled mb-0">
                                        <li><a href="#!">Help Center</a></li>
                                        <li><a href="#!">Customer Support Accessibility</a></li>
                                        <li><a href="#!">Security & Fraud</a></li>
                                        <li><a href="#!">Privacy Policy UPDATED!</a></li>
                                        <li><a href="#!">Terms & Conditions</a></li>
                                    </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <hr className="clearfix w-100 mt-3 pb-0" />

                        <div className="footer-copyright pt-0 pb-3">
                            <div className='d-md-flex justify-content-between'>
                                <div >
                                   <span className='text-grey2'>© 2024 Hirepay. All rights reserved.</span>
                                </div>
                                <div className='text-right'>
                                    <span>info@hirepay.com</span>
                                </div>

                            </div>
                            
                        </div>
                    </Row>
                </Container>



            </footer>
        </>
    )
}

export default Footer;
