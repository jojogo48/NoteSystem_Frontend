import { Link} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import '../style.css';
import Accordion from 'react-bootstrap/Accordion';
import NoteLogo from '../notebook.svg';

export default function Sidebar(props){

    return (
        <Nav  defaultActiveKey="/home" className="flex-column   sidebar ">
         <Link to="/">
            <object data={NoteLogo} type="image/svg+xml" className='img'>Error</object>
         </Link>
         <Accordion>
             <Accordion.Toggle as={NavLink} className='white'  eventKey="0" >
                儲存筆記
             </Accordion.Toggle>

             <Accordion.Collapse eventKey="0" className="navbar-link">
                <Nav.Link className='dark' as={Link} to="/storeNote/upload" ><span className="inner-circle"></span><span>上傳筆記</span></Nav.Link>
             </Accordion.Collapse>
             <Accordion.Collapse eventKey="0" className="navbar-link">
                <Nav.Link className='dark' as={Link} to="/storeNote/write" ><span className="inner-circle"></span><span >撰寫筆記</span></Nav.Link>
             </Accordion.Collapse>
             <Accordion.Collapse eventKey="0" className="navbar-link">
                <Nav.Link className='dark' as={Link} to="/storeNote/list"><span className="inner-circle"></span><span >查看所有筆記</span></Nav.Link>
             </Accordion.Collapse>
         </Accordion>
         <Accordion>
             <Accordion.Toggle as={NavLink}  className='white' eventKey="1" >
                分類筆記
             </Accordion.Toggle>
             <Accordion.Collapse  eventKey="1" className="navbar-link">
                <Nav.Link className='dark' as={Link} to="/classification/create" ><span className="inner-circle"></span><span>創立分類</span></Nav.Link>
             </Accordion.Collapse>
             <Accordion.Collapse  eventKey="1" className="navbar-link">
                <Nav.Link className='dark' as={Link} to="/classification/classify" ><span className="inner-circle"></span><span>分類筆記</span></Nav.Link>
             </Accordion.Collapse>
         </Accordion>
         <Accordion>
             <Accordion.Toggle as={NavLink} className='white' eventKey="2" >
                搜尋筆記
             </Accordion.Toggle>
             <Accordion.Collapse   eventKey="2" className="navbar-link">
                <Nav.Link className='dark' as={Link} to="/search" ><span className="inner-circle"></span><span>搜尋</span></Nav.Link>
             </Accordion.Collapse>
         </Accordion>

        </Nav>
    );
};