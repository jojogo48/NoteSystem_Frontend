import React from 'react';

class CreateCategory extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    }


    onInputChangeHandler = (e) =>{
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });

    }

    async onSubmitHandler(e){
        e.preventDefault();

        var data = {};
        data['category_name'] = this.state.categoryName;
        e.preventDefault();



        let url = 'http://localhost:8080/noteCategory/create';
        await fetch(url, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            if(res.ok) {
                return res.json();
        }}).then(newNoteCategory => {
            if(typeof newNoteCategory.categoryName != 'undefined')
            {
                this.props.history.push({
                    pathname : '/successful',
                    response:newNoteCategory
            });
            }else{
                console.log( newNoteCategory);
            }
        });
    }

    render() {
                 return (
                 <div>
                    <form onSubmit={this.onSubmitHandler}>
                        <label htmlFor="categoryName">Category Name</label><br />
                        <input type="text" name="categoryName" onChange={this.onInputChangeHandler} />
                        <input type="submit" />
                    </form>
                 </div>);
        }
}
export default CreateCategory;