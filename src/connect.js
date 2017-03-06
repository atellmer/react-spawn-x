import React, { Component } from 'react';
import {
  deepEqual,
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
      this.resolve(true);
    }

    componentWillUnmount() {
      this.resolve(false);
    }

    resolve(onInit) {
      Object.keys(selection).forEach(key => {
        if (isString(selection[key])) {
          if (onInit) {
            this.detect(selection[key]);
          } else {
            this.reject(selection[key])
          }

          return false;
        }

        if (isArray(selection[key])) {
          if (onInit) {
            this.detect(...selection[key]);
          } else {
            this.reject(...selection[key])
          }

          return false;
        }

        return error(`react-spawn-x: incorrect arguments for selection`);
      });
    }

    detect(zone) {
      store.detect(zone, this.updateWithRelevantState);
    }

    reject(zone) {
      store.reject(zone, this.updateWithRelevantState);
    }

    updateWithRelevantState = () => {
      Object.keys(selection).forEach(key => {
        if (isString(selection[key])) {
          this.checkState(key, selection[key]);

          return false;
        }

        if (isArray(selection[key])) {
          if (selection[key].length === 1 && isString(selection[key][0])) {
            this.checkState(key, selection[key][0]);

            return false;
          }

          if (selection[key].length > 1 && isFunc(selection[key][1])) {
            this.checkState(key, selection[key][1]);

            return false;
          }
        }

        return error(`react-spawn-x: incorrect arguments for selection`);
      });
    }

    checkState(key, selectionKey) {
      const selectedState = store.select(selectionKey);

      if (!deepEqual(selectedState, this.relevantState[key])) {
        this.relevantState[key] = selectedState;
        this.forceUpdate();
      }
    }

    render() {
      return <WrappedComponent {...this.props} {...this.relevantState}/>
    }
  }
}

export {
  connect
}
