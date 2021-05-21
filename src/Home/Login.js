import React,{useState} from "react";
import '../style.css';
import { Redirect} from "react-router-dom";

function Login(props)
{

    function useInput({type }) {
      const [value, setValue] = useState("");
      const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
      return [value, input];
    }
    const [username, userInput] = useInput({ type: "text" });
    const [password, passwordInput] = useInput({ type: "password" });


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
                window.localStorage.setItem("token", JSON.parse(request.responseText)["token"]);
                window.authed=true;
                props.history.push({
                    pathname : '/successful',
                    response:JSON.parse(request.responseText)
                });
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
        return (<Redirect to={{pathname: '/'}} />);
    }else{
        return(
            <form onSubmit={login}>
            {userInput} <br />
            {passwordInput}<br />
            <button type="submit" value="submit">Submit</button>
            </form>
        );
    }

}

export default Login;