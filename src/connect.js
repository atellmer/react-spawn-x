import React, { Component } from 'react';


const connect = store => sectionState => ComponentFrom => {
  return class ConnectWrapper extends Component {
    constructor(props) {
      super(props);
      this.relevantState = {};
    }

    componentWillMount() {
      Object.keys(sectionState).forEach(key => {
        store.detect(sectionState[key], () => {
          this.relevantState[key] = store.select(sectionState[key]);
          this.forceUpdate();
        });
      });
    }

    render() {
      return <ComponentFrom {...this.props} {...this.relevantState}/>
    }
  }
}

export {
  connect
}
