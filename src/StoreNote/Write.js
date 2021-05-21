import React from "react";
import '../style.css';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


class Upload extends React.Component
{
    handleShow(){
            this.setState({show:true});

    }
    handleClose(){
            this.setState({show:false});
            console.log(this.state.noteDescription);

    }

    constructor(props) {
        super(props);
        this.state = {format: 'text'};
        this.state = {show: false};
        this.state = {noteDescription:""}
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
        this.myRef = React.createRef();
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }



   /* onSubmitHandler(e){
        const formData = new FormData();
        formData.append('noteName', this.state.noteName);
        formData.append('note', this.state.note);
    }*/

    onInputChangeHandler = (e) =>{
        const target = e.target;
        var value = target.innerHTML
        if(value.length === 0)
        {
            value = target.value;
        }
        const name = target.getAttribute('name');
        this.setState({
          [name]: value
        });
    }
    onSubmitHandler = (e)=>{
        e.preventDefault();
        if(this.state.noteName !=='undefined' && this.state.noteTextarea!=='undefined'){
        const formData = new FormData();
        var date = new Date();
        var  uploadFileName = date.getFullYear().toString()+date.getMonth().toString()+date.getDate().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
        formData.append('noteName', this.state.noteName);
        formData.append('format', "html");
        formData.append('file', new Blob([ this.state.noteTextarea ], { type: 'text/plain' }),uploadFileName+'.html');
        formData.append('noteDescription',this.state.noteDescription);
        formData.append('token', window.localStorage.getItem("token"));
        formData.append('categoryId', 0);

        fetch('http://localhost:8080/upload', {
            method: 'post',
            body: formData
        }).then((response) => response.json())
        .then(newNote => {
            if(typeof newNote.id != 'undefined')
            {
                this.props.history.push({
                    pathname : '/successful',
                    response:newNote
                });
            }else{
                console.log(newNote);
            }

        });
        }else{
        alert("NOTE NAME CAN'T BE EMPTY");
        }

    }


    render() {
            return (
                    <form onSubmit={this.onSubmitHandler} id="noteForm" className="writeForm">

                      <div className="notebook-paper">
                            <header htmlFor="noteTextarea">
                              <h1 contentEditable="true" id="noteName" name="noteName" onInput={this.onInputChangeHandler} />
                            </header>
                            <pre ref= {this.myRef} name="noteTextarea" className="content" contentEditable="true" id="noteTextarea" placeholder="Enter text here..."   onInput={this.onInputChangeHandler}>
                            </pre>

                      </div>

                      <div className="notebook-submit">
                      <>
                         <Button variant="primary" onClick={this.handleShow} className="notebook-submit-button btn btn-primary">
                           Save
                         </Button>
                         <Modal show={this.state.show} onHide={this.handleClose}>
                           <Modal.Header closeButton>
                             <Modal.Title style={{color:"black"}}>Add Some Description</Modal.Title>
                           </Modal.Header>
                           <Modal.Body>
                                <textarea name="noteDescription" style={{width:"100%"}} rows="5" onChange={this.onInputChangeHandler}></textarea>
                           </Modal.Body>
                           <Modal.Footer>
                             <Button variant="secondary" onClick={this.handleClose}>
                               Close
                             </Button>
                             <Button type="submit" variant="primary" onClick={this.onSubmitHandler}>
                               Save
                             </Button>
                           </Modal.Footer>
                         </Modal>
                      </>
                      </div>
                    </form>
            )
    }
}

export default Upload;