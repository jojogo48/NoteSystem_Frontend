import React from "react";
import { Link } from "react-router-dom";
class Successful extends React.Component
{
    render() {
                let newNote =this.props.location.response;
                if(typeof newNote == 'undefined'){
                        return(
                        <div>
                            <Link to="/"><button>回到首頁</button></Link>
                        </div>);
                }
                if(typeof newNote.id !== 'undefined')
                {
                    return (
                        <div>
                            <div>ID : {newNote.id}</div>
                            <div>NoteName : {newNote.noteName}</div>
                            <div>Format : {newNote.format}</div>
                            <div>class : {newNote.categoryName}</div>
                            <Link to="/"><button>回到首頁</button></Link>
                        </div>);
                }else if(typeof newNote.categoryName !== 'undefined'){
                    return (
                        <div>
                            <div>CategoryName : {newNote.categoryName}</div>
                            <Link to="/"><button>回到首頁</button></Link>
                        </div>);
                }else if((typeof newNote.message !== 'undefined')){
                    return (
                        <div>
                            <div>{newNote.message}</div>
                            <Link to="/"><button>回到首頁</button></Link>
                        </div>);
                }else{
                    return (
                        <div>
                            <div>{newNote.error}</div>
                            <Link to="/"><button>回到首頁</button></Link>
                        </div>);
                }


        }
}
export default Successful;
