import React from 'react';
import { Link} from "react-router-dom";

class Classification extends React.Component
{
    render() {
                 return (
                 <div>
                     <Link to="/classification/create">
                         <button>創立分類</button>
                     </Link>
                     <Link to="/classification/classify">
                         <button>分類筆記</button>
                     </Link>
                 </div>);
        }
}

export default Classification;