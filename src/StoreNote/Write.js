import React from "react";
import '../style.css';


class Upload extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {format: 'text'};
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
        this.myRef = React.createRef();

    }

    onSubmitHandler(e){
        const formData = new FormData();
        formData.append('noteName', this.state.noteName);
        formData.append('note', this.state.note);
    }

    onInputChangeHandler = (e) =>{
        const target = e.target;
        const value = target.innerHTML;
        const name = target.getAttribute('name');
        this.setState({
          [name]: value
        });

    }
    onSubmitHandler = (e)=>{
        e.preventDefault();
        if(this.state.noteName !='undefined' && this.state.noteTextarea!='undefined'){
        const formData = new FormData();
        var date = new Date();
        var  uploadFileName = date.getFullYear().toString()+date.getMonth().toString()+date.getDate().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
        formData.append('noteName', this.state.noteName);
        formData.append('format', "text");
        formData.append('file', new Blob([ this.state.noteTextarea ], { type: 'text/plain' }),uploadFileName+'.txt');

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
                              <h1 contentEditable="true" id="noteName" name="noteName" onInput={this.onInputChangeHandler}></h1>
                            </header>
                            <pre ref= {this.myRef} name="noteTextarea" className="content" contentEditable="true" id="noteTextarea" placeholder="Enter text here..."   onInput={this.onInputChangeHandler}>
                            </pre>

                      </div>

                      <div className="notebook-submit">
                      <button type="submit" value="Submit" className="notebook-submit-button btn btn-primary">Save</button>
                      </div>
                    </form>
            )
    }
}

export default Upload;