import React from 'react';
import Container from 'react-bootstrap/Container'
class ChangeCategory extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {category:'',note:[]};
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    onSubmitHandler(e){
        e.preventDefault();

        var data = {};
        data['category'] = this.state.category;
        data['notes'] = this.state.note;
        data['token'] = window.localStorage.getItem("token");
        let url = 'http://localhost:8080/notes/change';
        fetch(url, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            if(res.ok) {
                return res.json();
        }}).then(value => {
            this.props.history.push({
                pathname : '/successful',
                response:value});

        });

    }
    onInputChangeHandler = (e) =>{
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        if( target.type === 'checkbox' && value)
        {
            var joined = this.state.note.concat(name);
            this.setState({
              note:joined
            });
        }else{
            var arr = this.state.note;
            var index = arr.indexOf(name)

            if (index !== -1) {
              arr.splice(index,1);

            }
            this.setState({
              note:arr
            });
        }


    }

    async componentDidMount(){
            var that = this;
            var data ={};
            data["token"]=window.localStorage.getItem("token");
            await fetch('http://localhost:8080/notes/category/未分類',{ method: 'post', headers: {'Content-Type': 'application/json'},body:JSON.stringify(data)}).then(function(response){
            response.json().then(function(data){
                that.setState({data:data});
              });
            });

            await fetch('http://localhost:8080/noteCategory',{ method: 'post', headers: {'Content-Type': 'application/json'},body:JSON.stringify(data)}).then(function(response){
            response.json().then(function(data){
                that.setState({noteCategory:data});
                if(data.length > 1)
                {
                        if(data[0].categoryName !== '未分類')
                        {
                            that.setState({category:data[0].id.toString()});
                        }else{
                            that.setState({category:data[1].id.toString()});
                        }

                }
              });
            });


    }
    handleChange(event) {
       this.setState({category: event.target.value});
    }

    render() {
        if(typeof this.state.data!= 'undefined' && typeof this.state.noteCategory!= 'undefined')
        {
            return (
            <Container>
            <div className="card" style={{width: 20+'rem',color:"black",margin:"10em auto"}}>
                <div className="card-body">
                <form onSubmit={this.onSubmitHandler}>
                    <label>
                    Category :&nbsp;
                    <select onChange={this.handleChange}>
                        {
                            this.state.noteCategory.map((value,index2) => {

                                if(value.categoryName === '未分類')
                                {
                                    return null;
                                }
                                return  (
                                    <option key={value.categoryName} value={value.id}>{value.categoryName}</option>
                                )})
                        }

                    </select>
                    </label>
                    <br />
                    <label> 未分類筆記 </label>
                    {
                        this.state.data.map((value,index2) => {
                            return (<div key={value.noteName}>
                                        <label >
                                            <input  name={value.id} type="checkbox" onChange={this.onInputChangeHandler} />
                                            {value.noteName}
                                        </label><br/>
                                    </div>
                                    )})
                    }
                    <br />

                    <input type="submit" />
                </form>
                </div>
            </div>
            </Container>

            );
        }


        return (<div>
        </div>);



    };
}

export default ChangeCategory;