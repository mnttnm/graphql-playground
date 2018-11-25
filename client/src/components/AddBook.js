import React, { Component } from 'react';
import { graphql, compose} from 'react-apollo';
import {getAuthorsQuery, getBooksQuery, addBookMutation} from '../queries/queries';
import { empty } from 'apollo-link';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            genre: null,
            authorId: null,
            emptyBookError:false
        };
    }

    displayAuthors() {
        // you have to define which queryOutput you need.
        const {loading, authors} = this.props.getAuthorsQuery;
        if(loading){
            return( <option disabled>Loading authors </option> );
        } else {
            return authors.map(author => 
                <option value={ author.id } key={ author.id }>{author.name} </option>
            );
        }
    }

    submitForm(e) {
        e.preventDefault();
        console.log(this.state);
        const {name, genre, authorId} = this.state;

        if(name && genre && authorId) {
            // once the query is performed
            // fetch the values of new book array by
            // performing getBooksQuery Again
            this.props.addBookMutation({
                variables: {
                    name,
                    genre,
                    authorId
                },
                refetchQueries: [{ query: getBooksQuery }]
            });
            this.setState({emptyBookError:false});
        } else {
            this.setState({emptyBookError:true});
        }
    }

    render(){
        return (
            <div>
            {this.state.emptyBookError ? <p id="empty-form">Please fill in all the required fields</p>:""}
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={ (e) => this.setState({name: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={ (e) => this.setState({genre:e.target.value})}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) =>  this.setState({authorId: e.target.value})}>
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button>+</button>
            </form>
            </div>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
