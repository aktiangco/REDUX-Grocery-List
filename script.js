// Establish DOM elements as variables
const grocerySubmit = document.getElementById('addGrocery')
const list = document.getElementById('list')
const clearBtn = document.getElementById('clear')

// Instantiate default state value:
const initialState = {
    // object 
    groceries: []
}

// Build a reducer
const groceryReducer = (state = initialState.groceries, action) => {
    // setting up logic
    switch(action.type) {
        // add a grocery item
        case 'grocery/add':
            return [
                // taking current array ""..." to add new to array
                // The way I think about this is that I need to return a new state object that includes what is there already plus the new item. By creating a new object, the state is immutable, meaning we don’t actually modify the current state. Instead we clone it and then modify the new object. This minimizes any side effects. Also, if we mutate (change) the state outside of Redux the UI will not update properly
                ...state,
                {
                    text: action.text
                }
            ]
        // clear our list
        case 'grocery/clear':
            // empty array "[]"
            return []
        // default
        default:
            return state
    }
};

// Establishing Store
let store = Redux.createStore(groceryReducer)

// target our empty list DOM element and generate list elements to fill it
const renderList = (state) => {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
    state.forEach(grocery => {
        // Generate a new list element for each grocery item
        let li = document.createElement('li')
        // Append the new element to our list DOM element, we targeted
        // it at the beginning of this code-along!
        list.appendChild(li)
        // Populate the text content of the list item
        li.textContent = grocery.text
    })
}

// trigger our dispatch and send the collected data as the text field of our action.
const newGrocery = (e) => {
    e.preventDefault()
    let groceryText = document.getElementById('newItem').value
    store.dispatch({
        type: 'grocery/add',
        text: groceryText
    })
    console.log(store.getState())
}


// with an easy action, the behavior that allows us to clear the state:
const clearList = () => {
    document.getElementById('newItem').value = ''
    store.dispatch({
        type: 'grocery/clear'
    })
}


// initial render
const render = () => {
    const state = store.getState()
    renderList(state)
}

// add event listeners to trigger these functions
grocerySubmit.addEventListener('submit', (e) => {newGrocery(e)})
clearBtn.addEventListener('click', clearList)

// subscribe reruns render on dispatch
store.subscribe(render)

