import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";

const Refferalbtn = () => {
    let { refCode } = useParams();

    return (
        <>



            {!refCode &&
                <span className='btn-primary refText btn-orange' >No REFERRAL LINK DETECTED, USE ONE FOR ADDITIONAL BENEFITS!</span>

            }
            {refCode &&
                <span className=' btn-success refText btn-green' >REFERRAL LINK DETECTED, ENJOY THE  BENEFITS!</span>
            }


        </>

    )
}

export default Refferalbtn;