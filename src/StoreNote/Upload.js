import React from "react";
import '../upload.css'
class Upload extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {format: 'text',noteDescription:""};
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    }

    componentDidMount(){

        const actualBtn = document.getElementById('actual-btn');

        const fileChosen = document.getElementById('file-chosen');
        actualBtn.addEventListener('change', function(){
          fileChosen.innerHTML = this.files[0].name
        })

    }
    onFileChangeHandler = (e) => {
            this.setState({
                selectedFile: e.target.files[0]
            });
    };

    onSubmitHandler(e){
        e.preventDefault();
        const formData = new FormData();

        //var  uploadFileName = date.getFullYear().toString()+date.getMonth().toString()+date.getDate().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
        formData.append('noteName', this.state.noteName);
        formData.append('format', this.state.format);
        formData.append('file', this.state.selectedFile);
        formData.append('token', window.localStorage.getItem("token"));
        formData.append('noteDescription',this.state.noteDescription);
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


    }

    onInputChangeHandler = (e) =>{
        const target = e.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        if(typeof(value) === 'string' && value.length === 0)
        {
            value = target.innerHTML;
        }
        const name = target.name;

        this.setState({
          [name]: value
        });

    }


    render() {
            /*return (
            <div className="upload-wrapper">
                <form  onSubmit={this.onSubmitHandler} method="POST">
                    <table>
                        <tbody>
                            <tr>
                                <td>File to upload:</td><td><input type="file" name="file" onChange={this.onFileChangeHandler} /></td>
                            </tr>
                            <tr>
                                <td>Note Name</td><td><input type="text" name="noteName"  onChange={this.onInputChangeHandler} /></td>
                            </tr>
                            <tr>
                                <td>
                                    Choose note format
                                </td>
                                <td>
                                    <select name="format" value={this.state.format} onChange={this.onInputChangeHandler}>
                                        <option value="text">text</option>
                                        <option value="picture">picture</option>
                                        <option value="pdf">pdf</option>
                                    </select>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    Note Description
                                </td>
                                <td>
                                    <textarea name="noteDescription" rows="5" onChange={this.onInputChangeHandler}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td></td><td><input type="submit" value="Upload" /></td>
                            </tr>

                        </tbody>
                    </table>
                </form>
            </div>);*/
            return (
            <div className="Upload-container">
              <div className="Upload-card"></div>
              <div className="Upload-card">
                <h1 className="title">Upload</h1>
                <form onSubmit={this.onSubmitHandler} method="POST">
                  <div className="input-container">

                  </div>
                  <div className="input-container">

                  </div>
                  <div className="input-container">
                    <label style={{color:"black",fontSize:"23px"}}>筆記名稱
                    <input style={{width:"100%"}}  name="noteName" onChange={this.onInputChangeHandler} required="required" />
                    </label>
                    <pre style={{color:"black",fontSize:"23px"}}>
                        筆記描述<br />
                        <textarea name="noteDescription" rows="5" style={{width:"100%"}} onChange={this.onInputChangeHandler}></textarea>

                    </pre>
                    <pre style={{color:"black",fontSize:"23px"}}>筆記格式 :
                    <select name="format" value={this.state.format} onChange={this.onInputChangeHandler}>
                        <option value="text">text</option>
                        <option value="picture">picture</option>
                        <option value="pdf">pdf</option>
                    </select>
                    </pre>
                    <pre  style={{color:"black",fontSize:"23px"}}>
                    <label>檔案上傳 :</label>
                    <label htmlFor="actual-btn" className="actual-btn" id="file-chosen">Choose File

                    </label>
                    <input type="file" id="actual-btn" name="file" onChange={this.onFileChangeHandler} hidden/>

                    </pre>
                  </div>

                  <div className="button-container">
                    <button type="submit"><span>Go</span></button>
                  </div>
                </form>
              </div>
            </div>

            );
        }
}

export default Upload;