import React, {Component} from 'react';

import calendarDatesUtils from './calendarDatesUtils.js';

function withDatesSubscription(WrappedComponent) {
  class withDatesSubscription extends Component {
    constructor(props) {
      super(props);

      this.state = {
        allDates: calendarDatesUtils.getAllDates(),
      };
    }

    componentDidMount() {
      calendarDatesUtils.listen('announcements', () => {
        this.setState({
          allDates: calendarDatesUtils.getAllDates(),
        });
      });
    }

    componentWillUnmount() {
      calendarDatesUtils.unlisten('announcements');
    }

    render() {
      return (
        <WrappedComponent {...this.props} storedDates={this.state.allDates} />
      );
    }
  }

  const componentDisplayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  const displayName = `WithDatesSubscription(${componentDisplayName})`;
  withDatesSubscription.displayName = displayName;

  return withDatesSubscription;
}

export default withDatesSubscription;
