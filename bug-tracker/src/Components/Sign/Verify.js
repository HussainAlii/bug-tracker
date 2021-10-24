import React , {useState,useContext} from 'react'
import './Sign.css'

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { UserContext } from "../../Context/userContext";

function Verify() {
    const context = useContext(UserContext)
    const [code, setCode] = useState("");
    const [showMessage, setShowMessage] = useState([true,"Verification code has been sent to your email!","success"]);

    async function handleVerify(){
        setShowMessage(await context.verifyCode(code));
    }

    return (
        <div className="sign-container">
            <div class="login-form">
            <h3 style={{color:"gray", textAlign:"center"}}>Verification</h3>
                <input
                value={code}
                onChange={e=>{
                    if (e.target.value.length<5)
                        setCode(e.target.value);
                }}
                type="text"
                className="Input code"
                placeholder="Enter 4 digit Code"
                />


                <button disabled={code.length != 4} onClick={handleVerify}>Verify Code</button>
                
                {showMessage[0]&&
                <Alert severity={showMessage[2]}>
                <AlertTitle>{showMessage[2].charAt(0).toUpperCase()+showMessage[2].slice(1)}</AlertTitle>
                <strong>{showMessage[1]}</strong>
            </Alert>
            }
            </div>
        </div>
    )
}

export default Verify
