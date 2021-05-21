import React from "react";
import 'bootstrap/dist/js/bootstrap.js'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import '../style.css'
class ListNote extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {};
        this.componentDidMount = this.componentDidMount.bind(this);
        this.openLink = this.openLink.bind(this);
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

    openLink(url){
        window.open(url, '_blank');
        /*fetch(url,{method: 'get'})
          .then(response => {

              const filename =  response.headers.get('Content-Disposition').split("attachment; filename*=UTF-8''");
              window.open(filename, '_blank');
              console.log( response.headers.get('Content-Disposition').split("attachment; filename*=UTF-8''"));
            });*/


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
export default ListNote;