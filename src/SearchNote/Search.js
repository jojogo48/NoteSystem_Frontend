import React from "react";


class Search extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {result: ''};
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
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

    onSubmitHandler(e){
        e.preventDefault();
        let url = (this.state.caseSensitive)? 'http://localhost:8080/notes/binaryname/':'http://localhost:8080/notes/name/';
        fetch(url+this.state.keyword, {
            method: 'get'
        }).then(res => {
            if(res.ok) {
                return res.json();
        }}).then(result => {
            this.setState({result:result});
        });
    }
    render() {
            let transRes;
            if(this.state.result)
            {

               const result = this.state.result;
               transRes = result.map((list) => {
                    return(
                    <li key={list.id}><a href={"http://localhost:8080/files/"+list.id}>{list.noteName}</a></li>
                    );
               });
            }

            return (
            <div>
                <form method="get" onSubmit={this.onSubmitHandler}>
                    <input type="text" name="keyword" onChange={this.onInputChangeHandler} />
                    <input type="checkbox" id="caseSensitive" name="caseSensitive" onChange={this.onInputChangeHandler} />
                    <label htmlFor="caseSensitive">Case-sensitive</label><br />
                    <input type="submit" />
                </form>
                <ul>
                    {transRes}
                </ul>
            </div>
            )
    }
}
export default Search;