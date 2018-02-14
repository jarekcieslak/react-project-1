import React from "react";
import BookItem from "./BookItem";

export class BookShelf extends React.Component {


    render() {
        const books = this.props.books;
        const title = this.props.title;
        const onShelfChange = this.props.onShelfChange;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books && !!books.length && books.map(book =>
                            <BookItem key={book.id} book={book} onShelfChange={onShelfChange}></BookItem>)}
                    </ol>
                </div>
            </div>
        )
    }

}