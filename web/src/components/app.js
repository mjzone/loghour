import React from 'react';
import axios from 'axios';
import CreateTodo from './create-todo';
import TodoList from './todo-list';
import Header from './header';

require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }
}
