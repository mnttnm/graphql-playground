import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetail extends Component {
    displayBookDetail(){
        const { book } = this.props.data;
        if(book){
            return(
                <div>
                    <h2>Book: { book.name }</h2>
                    <p>Genre: { book.genre }</p>
                    <p>Author: { book.author.name }</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        { book.author.books.map(item => {
                            return <li key={item.id}>{ item.name }</li>
                        })}
                    </ul>
                </div>
            );
        } else {
            return( <div>No book selected...</div> );
        }
    }
    render(){
        return(
            <div id="book-details">
                { this.displayBookDetail() }
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    //whenever new props come fire the function again
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetail);