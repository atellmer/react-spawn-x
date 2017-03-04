# react-spawn-x
### React connector for [spawn-x](https://github.com/atellmer/spawn-x).


## install
With npm:
```
npm install spawn-x react-spawn-x --save
```
With yarn:
```
yarn add spawn-x react-spawn-x
```

## Usage
#### app/index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
```

#### app/store/index.js
```javascript
import { createStore, addInterceptor } from 'spawn-x';


const initialState = {
  users: [],
  some: {
    text: 'Hello World'
  },
  parent: {
    child: 'I am child'
  }
}

const store = createStore(
  initialState,
  addInterceptor(logger)
);

function logger(store) {
  return next => action => {
    next(action);
    console.log('action: ', action.type + ' -> ', action.data);
  }
}

export {
  store
}
```
#### app/actions/user.js
```javascript
import { store } from '../store';


const addUser = user => {
  store.update('users', {
    data: store.select('users').concat(user),
    type: 'ADD_NEW_USER'
  });
};

export {
  addUser
}
```

#### app/containers/App.js
```javascript
import React, { Component } from 'react';
import { connect } from 'react-spawn-x';

import { store } from '../store';
import { addUser } from '../actions/user';
import MyPresenterComponent from '../components/Presenter';


class App extends Component {
  render() {
    return (
      <div className="App">
        <MyPresenterComponent
          users={this.props.users}
          text={this.props.text}
          data={this.props.data}
          addUser={addUser}/>
      </div>
    );
  }
}

//our selection from state (for data we apply specific selector. It's just for example)
const selection = {
  users: 'users',
  text: 'some.text',
  data: ['parent.child', state => state.parent.child]
};

//wrap App component
export default connect(store)(selection)(App);
```

#### app/components/Presenter.js
```javascript
import React, { Component } from 'react';


class MyPresenter extends Component {

  handleSubmit = (ev) => {
    ev.preventDefault();

    console.log('some text from state: ', this.props.text);
    console.log('some data from state: ', this.props.data);

    this.props.addUser({
      name: ev.target.name.value,
      age: ev.target.age.value
    });

    ev.target.name.value = '';
    ev.target.age.value = '';
  }

  render () {
    return (
      <div>
        <h1>User List</h1>
        <ul>
          {this.props.users.map((user, index) => {
            return <li key={index}>name: {user.name} age: {user.age}</li>
          })}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name"/>
          <input type="number" name="age"/>
          <button type="submit">Add New User</button>
        </form>
      </div>
    )
  }
}

export default MyPresenter;
```

## LICENSE

MIT © [Alex Plex](https://github.com/atellmer)