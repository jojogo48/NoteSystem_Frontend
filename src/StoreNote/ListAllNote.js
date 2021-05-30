import React,{useState} from "react";
import 'bootstrap/dist/js/bootstrap.js'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import '../style.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
class ListAllNote extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {};
        this.componentDidMount = this.componentDidMount.bind(this);
    }



    componentDidMount(){
            var tokenData = {};
            tokenData["token"]=window.localStorage.getItem("token");
            var that = this;
            fetch('http://localhost:8080/notes/categories',{ method: 'post', headers: {'Content-Type': 'application/json'},body:JSON.stringify(tokenData)}).then(function(response){
            response.json().then(function(data){
                console.log(data);
                that.setState({data:data});
              });
            });

    }
    render() {

            if(typeof this.state.data != 'undefined')
            {
                return (
                    <Container>
                        {
                            Object.keys(this.state.data).map((key,index)=>{
                              return (<div key={key}>


                              <h2 style={{paddingTop:"50px"}}>{key}</h2>
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
                                          this.state.data[key].map((value)=>{
                                            return (
                                                  <tr key={value.id}>
                                                      <td className="td-fixed-20">
                                                          { value.noteName}
                                                      </td>
                                                      <td >
                                                          { value.format}
                                                      </td>
                                                      <td className="td-fixed-40">
                                                          {value.description}
                                                      </td>
                                                      <td>
                                                          <a  href={"http://localhost:8080/files/"+window.localStorage.getItem("token")+"/"+ value.id} target="_blank" rel="noreferrer"><Button variant="primary">開啟</Button></a>
                                                      </td>
                                                      <td>
                                                           <a href={"http://localhost:8080/files/download/"+window.localStorage.getItem("token")+"/"+ value.id} ><Button variant="primary" rel="noreferrer">Download</Button></a>
                                                      </td>
                                                      <td>
                                                           <DeleteBtn  variant="danger" deleteId={value.id}/>
                                                      </td>
                                                  </tr>
                                               );
                                          })
                                      }
                                  </tbody>
                              </Table></div>);
                            })
                        }
                    </Container>
                  );
            }


            return (
            <div>
            </div>
            );};
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
export default ListAllNote;