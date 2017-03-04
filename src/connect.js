import React, { Component } from 'react';
import {
  isArray,
  isString,
  isFunc,
  error
} from './helpers';


const connect = store => selection => WrappedComponent => {
  return class ConnectWrapper extends Component {
    constructor(props) {
      super(props);
      this.relevantState = {};
    }

    componentWillMount() {
      Object.keys(selection).forEach(key => {
        if (isArray(selection[key])) {
          this.resolve(key, ...selection[key]);
        } else {
          this.resolve(key, selection[key]);
        }
      });
    }

    resolve(key, ...args) {
      if (args.length === 1 && isString(args[0])) {
        this.detect(key, args[0], args[0]);
        return false;
      }
      if (args.length > 1 && isString(args[0]) && isFunc(args[1])) {
        this.detect(key, args[0], args[1]);
        return false;
      } else {
        return error(`react-spawn-x: incorrect arguments for selection`);
      }
    }

    detect(key, zone, selector) {
      store.detect(zone, () => {
        this.relevantState[key] = store.select(selector);
        this.forceUpdate();
      });
    }

    render() {
      return <WrappedComponent {...this.props} {...this.relevantState}/>
    }
  }
}

export {
  connect
}
