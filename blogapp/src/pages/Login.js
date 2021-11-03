import React, { useRef, useContext } from 'react'
import './loginandreg.css'
import { Context } from '../context/Context'
import axios from 'axios'

function Login() {
    //useRef hook 
    const userRef = useRef()
    const passwordRef = useRef()

    const {dispatch} = useContext(Context)

    //function to login user
    const loginUser = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" });
        try {
            const response = await axios.post('/auth/login', {
                username: userRef.current.value,
                password: passwordRef.current.value
            })
            console.log("success")
            dispatch({ type: "LOGIN_SUCCESS",payload:response.data});
   
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE" });
            console.log("failed")
        }
    }
    return (
        <>
            <div>
                <div className="box">
                    <h2 id="head">Login</h2>
                    <form>
                        <input type="text" name="text" className="email"
                            placeholder="Username"
                            ref={userRef} />
                        <div id="emailcheck"></div>
                        <input type="password" name="password" id="pass" placeholder="Password"
                            ref={passwordRef} />
                        <div id="passcheck"></div>
                        {/* <input type="checkbox" id="pos" onclick="myFunction()" /> */}
                        <input type="button" onClick={loginUser} id="sub" className="btn" value="Login" />
                    </form>
                    <hr></hr>
                    <p id="para"> Forgot Password ? </p>

                </div>
            </div>
        </>
    )
}

export default Login
