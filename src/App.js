import React from 'react'
import './App.css'
import Search from "./Search";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { BookList } from "./List";

class BooksApp extends React.Component {
    state = {
        books: [],
        status: 'loading'
    };

    getAllBooks() {
        this.setState({
            status: 'loading'
        });

        BooksAPI.getAll()
            .then(data => {
                this.setState({
                    books: data,
                    status: 'data'
                });
            })
            .catch(error => {
                console.error('Error occured:', error);
                this.setState({books: null, status: 'error'})
            })
    }

    onShelfChange = (book, shelf) => {
        this.setState({status: 'loading'});
        BooksAPI.update(book, shelf)
            .then(data => {
                this.getAllBooks()
            });
    };


    componentDidMount() {
        this.getAllBooks();
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (<BookList onShelfChange={this.onShelfChange} books={this.state.books} status={this.state.status}/>)}/>
                <Route path="/search" render={() => (<Search onShelfChange={this.onShelfChange} books={this.state.books} status={this.state.status}/>)}/>
            </div>
        )
    }
}

export default BooksApp
