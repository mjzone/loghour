import React from 'react';
import axios from 'axios';
import CreateTodo from './create-todo';
import TodoList from './todo-list';
import Header from './header';
import TimerService from '../services/hltimer';
import GHService from '../services/githubservice';

// load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

const BASE_URL = 'http://localhost:3000';
var todos = [];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos
        };
        this.init();
    }

    init() {
        var self = this;
        GHService.getOrgList('rehrumesh');
    }

    render() {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }
}
