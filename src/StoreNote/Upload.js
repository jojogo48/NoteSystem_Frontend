import React from "react";

class Upload extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {format: 'text'};
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
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
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });

    }


    render() {
            return (
            <div>
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
                                        <option value="video">video</option>
                                        <option value="picture">picture</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td></td><td><input type="submit" value="Upload" /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>);
        }
}

export default Upload;