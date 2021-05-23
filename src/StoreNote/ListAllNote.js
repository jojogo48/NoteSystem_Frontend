import React from "react";
import 'bootstrap/dist/js/bootstrap.js'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import '../style.css'
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
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                  <Row>
                    <Col sm={2}>
                      <ListGroup>
                                    {

                                        Object.keys(this.state.data).map((key,index)=>{
                                          return (
                                                <ListGroup.Item action key={index} href={'#'+key}>
                                                {key}
                                                </ListGroup.Item>
                                             );
                                        })
                                    }
                      </ListGroup>
                    </Col>
                    <Col sm={10}>
                      <Tab.Content>

                                    {
                                        Object.keys(this.state.data).map((key,index)=>{
                                          return (
                                                <Tab.Pane eventKey={'#'+key} key={key}><CardDeck><Container><Row>
                                                  {
                                                        this.state.data[key].map((value)=>
                                                        {
                                                            return(
                                                            <Col  key={value.id} >
                                                            <Card style={{color:"black"}}>
                                                                <Card.Body>
                                                                  <Card.Title>{value.noteName}</Card.Title>
                                                                  <Card.Text>

                                                                  </Card.Text>
                                                                </Card.Body>
                                                                <Card.Footer>
                                                                  <small className="text-muted"></small>
                                                                </Card.Footer>
                                                            </Card>
                                                            </Col>

                                                              );
                                                        })
                                                  }
                                                  </Row>
                                                  </Container></CardDeck>
                                                </Tab.Pane>


                                          );
                                        })

                                    }

                        <Tab.Pane eventKey="#link2">
                          asdfadfdfad
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>);
            }


            return (
            <div>
            </div>
            );};
}
export default ListAllNote;