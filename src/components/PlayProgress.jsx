import { Component, cloneElement, Children } from 'react';
import { propTypes, defaultProps } from '../props';

export default class PlayProgress extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    return cloneElement(Children.only(this.props.children), {
      style: { width: `${this.props.percentagePlayed}%` },
    });
  }

}