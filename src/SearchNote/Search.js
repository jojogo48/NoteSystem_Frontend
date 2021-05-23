import React from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import '../style.css'
import '../searchForm.css';

class Search extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {keyword:'',result: '',format:'all',category:'all',noteCategory:[]};


        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.render = this.render.bind(this);
    }

    onInputChangeHandler = (e) =>{
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });

    }
    async componentDidMount(){
            var that = this;
            var data ={token:window.localStorage.getItem("token")};
            await fetch('http://localhost:8080/noteCategory',{ method: 'post', headers: {'Content-Type': 'application/json'},body:JSON.stringify(data)}).then(function(response){
            response.json().then(function(data){
                that.setState({noteCategory:data});
              });
            });
    }
    onSubmitHandler(e){
        e.preventDefault();
        if(this.state.keyword === '')
            return;
        var data ={token:window.localStorage.getItem("token")};
        let url = (this.state.caseSensitive)? 'http://localhost:8080/notes/binaryname/':'http://localhost:8080/notes/name/';
        url =  url+this.state.keyword+"/"+this.state.category+"/"+this.state.format;
        console.log(url);
        fetch(url, { method: 'post', headers: {'Content-Type': 'application/json'},body:JSON.stringify(data)}
        ).then(res => {
            if(res.ok) {
                return res.json();
        }}).then(result => {
            this.setState({result:result});

        });
    }
    handleChange(event) {
       this.setState({category: event.target.value});
    }

    render() {
            let transRes;

            if(this.state.result)
            {

               const result = this.state.result;
               if(result.length ===0)
               {
                    transRes = (
                        <h2>No Result Found!!</h2>
                    );
               }else{
                    transRes = result.map((list) => {
                        return(
                        <tr key={list.id}>
                            <td>
                                {list.category_name}
                            </td>
                            <td>
                                { list.note_name}
                            </td>
                            <td>
                                { list.format}
                            </td>
                            <td>
                                {list.description}
                            </td>
                            <td>
                                <a  href={"http://localhost:8080/files/"+window.localStorage.getItem("token")+"/"+ list.id} target="_blank" rel="noreferrer"><Button variant="primary">開啟</Button></a>
                            </td>
                            <td>
                                 <a href={"http://localhost:8080/files/download/"+window.localStorage.getItem("token")+"/"+ list.id} ><Button variant="primary" rel="noreferrer">Download</Button></a>
                            </td>
                        </tr>
                        );
                    });
                       transRes = (
                                <Container>
                                        <Table hover >
                                            <thead>
                                                <tr>
                                                    <th>筆記本</th>
                                                    <th>名稱</th>
                                                    <th>格式</th>
                                                    <th>描述</th>
                                                    <th>Link</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {transRes}
                                            </tbody>
                                        </Table>
                                </Container>
                       );

               }

            }
            if(this.state.noteCategory !== 'undefined')
            {

               return (
                <div id="page">
                    <form onSubmit={this.onSubmitHandler} id="searchForm" >
                        <input type="text" name="keyword" onChange={this.onInputChangeHandler} id="searchText"/>
                        <input type="submit" id="searchBtn" value="搜尋" /><br/><br/>
                        <table style={{width:"100%"}}>
                            <tbody>
                            <tr>
                                <td>
                                    <label >筆記格式 :</label>
                                    <select name="format" value={this.state.format} onChange={this.onInputChangeHandler} className="searchSelect">
                                        <option value="all">All</option>
                                        <option value="text">Text</option>
                                        <option value="picture">Picture</option>
                                        <option value="pdf">Pdf</option>
                                    </select>
                                </td>
                                <td>

                                    <label >筆記類別 :</label>
                                    <select onChange={this.handleChange} name="category" className="searchSelect">
                                    <option value="all">All</option>
                                    {
                                            this.state.noteCategory.map((value,index2) => {
                                                return  (
                                                    <option key={value.categoryName} value={value.categoryName}>{value.categoryName}</option>
                                                )})
                                    }

                                    </select>
                                </td>
                                <td>
                                    <label htmlFor="caseSensitive">區分大小寫</label>
                                    <input type="checkbox" id="caseSensitive" name="caseSensitive" onChange={this.onInputChangeHandler} />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                    <br />
                    {transRes}
                </div>
                );
            }
    }
}
export default Search;