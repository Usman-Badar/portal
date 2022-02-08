import React from 'react';

function frmLogin(props) {
    return (
        <>

            <div className="Emp_Login2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgb(26, 34, 38)" fill-opacity="1" d="M0,160L120,181.3C240,203,480,245,720,245.3C960,245,1200,203,1320,181.3L1440,160L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg>
                <div className="Emp_Login2_Div">
                <h1 className="font-weight-bolder text-center">SEABOARD</h1>
                    <div className="Emp_Login2_Div_Box">
                        <div className="Emp_Login2_Grid">
                            <div className="ClickDiv1" onClick={props.LoginShow}>
                                <p className="mb-0">Login Id</p>
                            </div>
                            <div className="ClickDiv2">
                                <p className="mb-0">Password</p>
                            </div>
                            <div className="HideDiv">
                                <p className="mb-0">Login Id</p>
                            </div>
                        </div>
                        <div className="LoginDiv">
                            <form onSubmit={props.Login_Div2}>
                                <input className="w-100 mb-3 form-control border bg-light" value={props.UserData.LoginID} onChange={props.OnChangeHandler} name="LoginID" required id="standard-basic" label="Login Id" variant="standard" />
                                <div className="w-100 text-right py-3">
                                    <button type='submit' variant="contained" className="w-100 btn" style={{ backgroundColor: "#0db8de", color: "white" }}>Next</button>
                                </div>
                            </form>
                        </div>
                        <div className="PassDiv">
                            <form onSubmit={props.OnUserLogin}>
                                <input className="w-100 mb-3 form-control border bg-light" value={props.UserData.LoginPass} onChange={props.OnChangeHandler} name="LoginPass" required label="Password" type="password" autoComplete="current-password" variant="standard" />
                                <div className="w-100 text-right py-3"><button type="submit" variant="contained" className="w-100 btn" style={{ backgroundColor: "#0db8de", color: "white" }}>Login</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default frmLogin;