import React from "react";


class Search extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {keyword:'',result: '',format:'pdf',category:'',noteCategory:[],advanceSearch:false};


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
                if(data.length>0)
                {
                    that.state.category = data[0].categoryName;
                }
              });
            });
    }
    onSubmitHandler(e){
        e.preventDefault();

        var data ={token:window.localStorage.getItem("token")};
        let url = (this.state.caseSensitive)? 'http://localhost:8080/notes/binaryname/':'http://localhost:8080/notes/name/';
        url = (this.state.advanceSearch)? url+this.state.keyword+"/"+this.state.category+"/"+this.state.format : url+this.state.keyword;

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
               transRes = result.map((list) => {
                    return(
                    <li key={list.id}><a href={"http://localhost:8080/files/"+window.localStorage.getItem("token")+"/"+list.id}>{list.noteName}</a></li>
                    );
               });
            }
            if(this.state.noteCategory !== 'undefined')
            {
            return (
            <div>
                <form method="get" onSubmit={this.onSubmitHandler}>
                    <input type="text" name="keyword" onChange={this.onInputChangeHandler} />
                    <input type="checkbox" id="caseSensitive" name="caseSensitive" onChange={this.onInputChangeHandler} />
                    <label htmlFor="caseSensitive">Case-sensitive</label><br />
                    <input type="checkbox" id="advanceSearch"  name="advanceSearch" onChange={this.onInputChangeHandler} />
                    <label htmlFor="advanceSearch">進階搜索</label><br />
                     <select name="format" value={this.state.format} onChange={this.onInputChangeHandler}>
                         <option value="text">text</option>
                         <option value="picture">picture</option>
                         <option value="pdf">pdf</option>
                     </select><br />
                    <select onChange={this.handleChange} name="category">
                    {
                            this.state.noteCategory.map((value,index2) => {
                                return  (
                                    <option key={value.categoryName} value={value.categoryName}>{value.categoryName}</option>
                                )})
                    }

                    </select><br />

                    <input type="submit" />
                </form>
                <ul>
                    {transRes}
                </ul>
            </div>
            );
            }
    }
}
export default Search;