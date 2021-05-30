import React from "react";
import { BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Home from './Home/Home';
import Successful from './Home/Successful';
import StoreNote from './StoreNote/StoreNote';
import Upload from './StoreNote/Upload';
import Search from './SearchNote/Search';
import Write from './StoreNote/Write'
import ListNote from './StoreNote/ListNote';
import ListAllNote from './StoreNote/ListAllNote';
import Classification from './Classification/Classification';
import CreateCategory from './Classification/CreateCategory';
import ChangeCategory from './Classification/ChangeCategory';
import Sidebar from './Home/Sidebar';
import Login from './Home/Login';
import './style.css';
import PrivateRoute from './PrivateRoute';
import Logout from './Home/Logout';

window.authed = false;

class App extends React.Component
{

    render() {
             return (
                <Router>
                    <Sidebar />
                    <div className='main'>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/logout" component={Logout} />
                        <PrivateRoute exact path="/" component={Home} location={this.props.location}/>
                        <PrivateRoute exact path="/storeNote" component={StoreNote} location={this.props.location}/>
                        <PrivateRoute exact path="/storeNote/upload" component={Upload} location={this.props.location}/>
                        <PrivateRoute exact path="/storeNote/write" component={Write} location={this.props.location}/>
                        <PrivateRoute exact path="/storeNote/list/:category" component={ListNote} location={this.props.location}/>
                        <PrivateRoute exact path="/storeNote/list/" component={ListAllNote} location={this.props.location}/>
                        <PrivateRoute exact path="/classification" component={Classification} location={this.props.location}/>
                        <PrivateRoute exact path="/classification/create" component={CreateCategory} location={this.props.location}/>
                        <PrivateRoute exact path="/classification/classify" component={ChangeCategory} location={this.props.location}/>
                        <PrivateRoute exact path="/search" component={Search} location={this.props.location}/>
                        <PrivateRoute exact path="/successful" component={Successful} location={this.props.location}/>
                    </Switch>
                    </div>
                </Router>
              )
        }
}

export default App;




