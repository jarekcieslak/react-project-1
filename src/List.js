import React from "react";
import { Link } from "react-router-dom";
import { BookShelf } from "./shared/BookShelf";

export class BookList extends React.Component {


    render() {
        const books = this.props.books;
        const status = this.props.status;
        const onShelfChange = this.props.onShelfChange;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {status === 'loading' && (<p>Loading...</p>)}
                    {status === 'error' && (<p>Error connecting to API.</p>)}
                    {status === 'data' && books && !!books.length &&
                    <div>
                        <BookShelf
                            books={books.filter(book => book.shelf === 'currentlyReading')}
                            title={'Currently reading'}
                            onShelfChange={onShelfChange}
                        ></BookShelf>
                        <BookShelf
                            books={books.filter(book => book.shelf === 'wantToRead')}
                            title={'Want to Read'}
                            onShelfChange={onShelfChange}
                        ></BookShelf>
                        <BookShelf
                            books={books.filter(book => book.shelf === 'read')}
                            title={'Read'}
                            onShelfChange={onShelfChange}
                        ></BookShelf>
                    </div>
                    }
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookList;