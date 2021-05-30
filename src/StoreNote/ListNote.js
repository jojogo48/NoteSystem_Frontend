import React,{useState} from "react";
import 'bootstrap/dist/js/bootstrap.js'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import '../style.css'
import Modal from 'react-bootstrap/Modal'
class ListNote extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {show:false};
        this.componentDidMount = this.componentDidMount.bind(this);
    }


    componentDidMount(){
            var tokenData = {};
            tokenData["token"]=window.localStorage.getItem("token");
            var that = this;
            fetch('http://localhost:8080/notes/category/'+this.props.match.params.category,{ method: 'post', headers: {'Content-Type': 'application/json'},body:JSON.stringify(tokenData)}).then(function(response){
            response.json().then(function(data){
                that.setState({data:data});
              });
            });

    }
    render() {

            if(typeof this.state.data != 'undefined')
            {
                return (

                  <Container>
                        <h2 style={{paddingTop:"50px"}}>{this.props.match.params.category}</h2>
                        <Table hover >
                            <thead>
                                <tr>
                                    <th>Note Name</th>
                                    <th>Format</th>
                                    <th>Description</th>
                                    <th>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(this.state.data).map((key,index)=>{
                                      return (
                                            <tr key={index}>
                                                <td>
                                                    { this.state.data[key].noteName}
                                                </td>
                                                <td>
                                                    { this.state.data[key].format}
                                                </td>
                                                <td>
                                                    {this.state.data[key].description}
                                                </td>
                                                <td>
                                                    <a  href={"http://localhost:8080/files/"+window.localStorage.getItem("token")+"/"+ this.state.data[key].id} target="_blank" rel="noreferrer"><Button variant="primary">開啟</Button></a>
                                                </td>
                                                <td>
                                                     <a href={"http://localhost:8080/files/download/"+window.localStorage.getItem("token")+"/"+ this.state.data[key].id} ><Button variant="primary" rel="noreferrer">Download</Button></a>
                                                </td>
                                                <td>
                                                    <DeleteBtn  variant="danger" deleteId={this.state.data[key].id}/>
                                                </td>
                                            </tr>
                                         );
                                    })
                                }
                            </tbody>
                        </Table>
                  </Container>
            );}


            return (
<div>
</div>
            );
    };
}

function DeleteBtn(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = (id)=>{
    setShow(false);
    var tokenData = {};
    tokenData["token"]=window.localStorage.getItem("token");
    fetch('http://localhost:8080/notes/delete/'+id,{ method: 'post', headers: {'Content-Type': 'application/json'},body:JSON.stringify(tokenData)}).then(function(response){

    });
        window.location.reload();
  }
  return (
    <>
      <Button variant={props.variant} onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose} style={{color:"black"}}>
        <Modal.Header closeButton>
          <Modal.Title>刪除</Modal.Title>
        </Modal.Header>
        <Modal.Body>確定要刪除此筆記</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉
          </Button>
          <Button variant={props.variant} onClick={()=>handleDelete(props.deleteId)}>
            刪除
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ListNote;