import React from "react";

function Logout(props)
{
    if(localStorage.getItem("token") )
    {
        localStorage.removeItem("token");
        return (
            <h2>成功登出</h2>
        );
    }
    return <h2>請先登入！！</h2>
}
export default Logout;