import React, { Component } from 'react';
import { graphql} from "react-apollo";
import {getBooksQuery} from '../queries/queries';
import BookDetail from './BookDetail';

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBook:null
        };
    }
    displayBooks() {
        const {loading, books} = this.props.data;
        if(loading) {
            return <div>Loading Books.....</div>;
        } else {
            return books.map((book) => 
                 <li key={book.id} onClick={(e) => this.setState({selectedBook:book.id})}> {book.name} </li>
            );
        }
    };

  render() {
    return (
      <div>
          <ul id="book-list">
          {this.displayBooks()}
          </ul>
            {/* {this.state.selectedBook?<BookDetail book={this.state.selectedBook}/> : <div></div>} */}
            <BookDetail bookId={this.state.selectedBook}/>
      </div>
    );
  }
}

// this injects the data from the g-query to the 
// component props
export default graphql(getBooksQuery)(BookList);