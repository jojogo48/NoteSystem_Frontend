import React from "react";
import { Redirect} from "react-router-dom";
function Logout(props)
{
    if(localStorage.getItem("token") )
    {
        localStorage.removeItem("token");

        return (<>
            <Redirect to={{pathname: '/login'}} />
            <h2>成功登出</h2>
            </>
        );
    }
    return <><Redirect to={{pathname: '/login'}} /><h2>請先登入！！</h2></>
}
export default Logout;