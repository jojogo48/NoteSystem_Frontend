import React from "react";
import {Link} from "react-router-dom";

class StoreNote extends React.Component
{
    render() {
             return (
                 <div>
                     <Link to="/storeNote/upload">
                         <button>上傳筆記</button>
                     </Link>
                     <Link to="/storeNote/write">
                         <button>撰寫筆記</button>
                     </Link>
                     <Link to="/storeNote/list">
                         <button>查看所有筆記</button>
                     </Link>
                 </div>)
        };
}

export default StoreNote;