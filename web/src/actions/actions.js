module.exports.setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    }
}

module.exports.addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        text
    }
}