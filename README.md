# react-spawn-x
### React connector for [spawn-x](https://github.com/atellmer/spawn.js).


## install
```
npm install spawn-x react-spawn-x --save
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
import { createStore } from 'spawn-x';

const initialState = {
  users: [],
  some: {
    text: 'Hello World'
  }
}

const store = createStore(initialState);
logger(store);

function logger(store) {
 store.detect('*', () => {
    if (/@/.test(store.select('->'))) {
      console.log(store.select('->') + ' -> ', store.select('*'));
    }
  });
}

export {
  store
}
```
#### app/actions/user.js
```javascript
import { store } from '../store';


const addUser = (user) => {
  store.update('users', store.select('users').concat(user));
  store.update('@ACTIONS.ADD_NEW_USER', new Date().getTime());
};

export {
  addUser
}
```

#### app/containers/App.js
```javascript
import React, { Component } from 'react';
import { connect } from 'react-spawn';

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
          addUser={addUser}/>
      </div>
    );
  }
}

const sectionState = {
  users: 'users',
  text: 'some.text'
};

export default connect(store)(sectionState)(App);
```

#### app/components/Presenter.js
```javascript
import React, { Component } from 'react';


class MyPresenter extends Component {

  handleSubmit = (ev) => {
    ev.preventDefault();

    console.log('text from state: ', this.props.text);

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