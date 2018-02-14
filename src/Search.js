import React from 'react'
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import BookItem from "./shared/BookItem";

class Search extends React.Component {

    state = {
        loading: false,
        items: [],
    };

    onShelfChange = (book, shelf) => {
        this.setState({loading: true});
        BooksAPI.update(book, shelf).then(data => {
            book.shelf = shelf;
            this.setState({
                loading: false
            });
            this.props.onShelfChange(book, shelf);
        })
    };

    searchBook(book) {
        if (book) {
            this.setState({loading: true, items: []});
            BooksAPI.search(book).then(data => {
                const mappedData = this.mapBookJsonToData(data);
                this.setState({loading: false, items: mappedData});
            }, error => {
                console.warn(error)
            })
        }
    }

    mapBookJsonToData = (books) => {
        if (books && books.length) {
            return books.map(book => {
                const found = this.props.books.find(item => item.id === book.id);
                if (found) {
                    book.shelf = found.shelf;
                } else {
                    book.shelf = 'none';
                }
                return book;
            });
        }
    };


    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                               onChange={(event) => this.searchBook(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.loading && (<p>Loading...</p>)}
                    <ol className="books-grid">
                        {this.state.items && !!this.state.items.length && this.state.items.map((book, index) =>
                            <BookItem book={book} key={index} onShelfChange={this.onShelfChange}/>)}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;