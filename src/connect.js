import React, { Component } from 'react';
import {
  isArray,
  isString,
  isFunc,
  isUndefined,
  error
} from './helpers';


const connect = store => selection => WrappedComponent => {
  return class ConnectWrapper extends Component {

    constructor(props, context) {
      super(props, context);
      this.relevantState = {};
    }

    componentWillMount() {
      this.resolve(true);
    }

    componentWillUnmount() {
      this.resolve(false);
    }

    resolve(isWillMount) {
      Object.keys(selection).forEach(key => {
        let zone, selector;
  
        if (isString(selection[key])) {
          zone = selection[key];
          selector = selection[key];
        }

        if (isArray(selection[key])) {
          if (selection[key].length === 1 && isString(selection[key][0])) {
            zone = selection[key][0];
            selector = selection[key][0];
          }

          if (selection[key].length > 1 && isString(selection[key][0]) && isFunc(selection[key][1])) {
            zone = selection[key][0];
            selector = selection[key][1];
          }
        }

        if (isUndefined(zone) || isUndefined(selector)) {
          return error(`react-spawn-x: incorrect arguments for selection`);
        }

        if (isWillMount) {
          this.detect(zone, key, selector);
        } else {
          this.reject(zone);
        }
      });
    }

    detect(zone, key, selector) {
      store.detect(zone, this.updateWithState, key, selector);
    }

    reject(zone) {
      store.reject(zone, this.updateWithState);
    }

    updateWithState = (key, selector) => {
      this.relevantState[key] = store.select(selector);
      this.forceUpdate();
    }

    render() {
      return <WrappedComponent {...this.props} {...this.relevantState}/>
    }
  }
}

export {
  connect
}
