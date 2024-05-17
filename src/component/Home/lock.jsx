import React, { useState, useEffect } from 'react';
import config from '../../config';
import { Container, Row, Col, Button, Card, Modal, Form, Table } from 'react-bootstrap';
import Header from '../../directives/Header'
import Footer from '../../directives/Footer'
import "../componentCss/home.css"
import toast, { Toaster } from 'react-hot-toast';

const Lock = () => {
  let unlockPassword = 'dev@3366#';
  const[password, setPassword] = useState('');
  const unlockNow = () => {
    
    if(password == ""){
      toast.error('Password required!');
      return;
    }
    if(password != unlockPassword){
      toast.error('Invalid password!');
      return;
    }
    window.location.href = config.BASE_URL;
  }
  return (
    <>
    <Toaster />
      <Container>
        <Row className='mt-5 pt-5 justify-content-center'>
      
          <Col md={6}>
            <Card className='p-5 mt-5 text-center rounded-4'>
              <Card.Title>Authentication Required</Card.Title>
              <Card.Body>
                <input type='text' style={{border: '1px solid'}} placeholder='Password' className='form-control' onChange={(e)=>setPassword(e.target.value)}></input>

                <br/>
                <Button variant='primary' className='px-4' onClick={unlockNow}>Unlock</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
 export default Lock;