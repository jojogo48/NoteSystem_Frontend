import React from "react";
import { BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Home from './Home/Home';
import Successful from './Home/Successful';
import StoreNote from './StoreNote/StoreNote';
import Upload from './StoreNote/Upload';
import Search from './SearchNote/Search';
import Write from './StoreNote/Write'
import ListNote from './StoreNote/ListNote';
import Classification from './Classification/Classification';
import CreateCategory from './Classification/CreateCategory';
import ChangeCategory from './Classification/ChangeCategory';
import Sidebar from './Home/Sidebar';
import './style.css';

class App extends React.Component
{
    render() {
             return (
                <Router>
                    <Sidebar />
                    <div className='main'>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/storeNote" component={StoreNote} />
                        <Route exact path="/storeNote/upload" component={Upload} />
                        <Route exact path="/storeNote/write" component={Write} />
                        <Route exact path="/storeNote/list" component={ListNote} />
                        <Route exact path="/classification" component={Classification} />
                        <Route exact path="/classification/create" component={CreateCategory} />
                        <Route exact path="/classification/classify" component={ChangeCategory} />
                        <Route exact path="/search" component={Search} />
                        <Route exact path="/successful" component={Successful} />
                    </Switch>
                    </div>
                </Router>
              )
        }
}

export default App;




