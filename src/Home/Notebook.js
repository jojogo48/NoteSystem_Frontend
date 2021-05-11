import React from "react";
import { Link} from "react-router-dom";
import '../style.css'

class Notebook extends React.Component
{
    render(){return (

                      <div>
                         <div className="moleskine-notebook">
                          <Link  to={this.props.url}>
                           <div className={"notebook-cover "+this.props.cover}>
                             <div className="notebook-skin "><span>{this.props.name}</span></div>
                           </div>
                           <div className={"notebook-page "+this.props.skin}></div>
                         </Link>
                         </div>
                      </div>
    )};
}
export default Notebook;