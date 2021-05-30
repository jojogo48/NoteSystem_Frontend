import React,{useState} from "react";
import '../style.css';
import { Redirect} from "react-router-dom";
import loginIcon from "../login.png"
function Login(props)
{

    function useInput({type,placeholder}) {
      const [value, setValue] = useState("");
      const input = <input value={value} className="loginInput" onChange={e => setValue(e.target.value)} type={type} placeholder={placeholder} required/>;
      return [value, input];
    }

    const [username, userInput] = useInput({ type: "text",placeholder:"login"});
    const [password, passwordInput] = useInput({ type: "password",placeholder:"password"});
    const [message, setMessage] = useState("");

    const login = (e) => {
            e.preventDefault();
            var data = {};
            data['account'] = username;
            data['password'] = btoa(password);
            //e.preventDefault();

            var request = new XMLHttpRequest();
            request.open('POST', 'http://localhost:8080/login', false);  // `false` makes the request synchronous
            request.setRequestHeader('content-type', 'application/json');
            request.send(JSON.stringify(data));
            if (request.status === 200) {
                if(JSON.parse(request.responseText)["token"]){
                    window.localStorage.setItem("token", JSON.parse(request.responseText)["token"]);
                    window.authed=true;
                    window.location.reload();
                }else{
                    setMessage("帳號或密錯誤");
                }

            }

    };
    if(window.localStorage.getItem("token") != null){
        var sendData = {};
        sendData["token"]=window.localStorage.getItem("token");

        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:8080/checkToken', false);  // `false` makes the request synchronous
        request.setRequestHeader('content-type', 'application/json');
        request.send(JSON.stringify(sendData));
        if (request.status === 200) {
            window.authed = JSON.parse(request.responseText)["successful"];
        }
    }

    if(window.authed)
    {
        if(typeof(props.location.state)!== 'undefined')
        {
             return (<Redirect to={{pathname: props.location.state.from.pathname}} />);
        }else{
            return(<Redirect to={{pathname: "/"}} />);
        }

    }else{
        return(
            <div className="wrapper">

            <div id="formContent">
            <img src={loginIcon} id="icon" alt="User Icon" />
            <form onSubmit={login}>
            {userInput} <br />
            {passwordInput}<br />
            <button type="submit" value="submit" className="loginBtn">登入</button>
            <div style={{color:"red"}}>
                {message}
            </div>
            </form>

            <div id="formFooter">
              <a className="underlineHover" href="/">Forgot Password?</a>
            </div>
            </div>
            </div>
        );
    }

}

export default Login;