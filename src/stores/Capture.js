import {Store} from 'material-flux';

export default class _ extends Store {
  constructor(context) {
    super(context);
    this.register(this.getRegisterKey(), this.onHandler);
    this.state = {
      src: null
    };
  }
  onHandler(src) {
    this.setState({ src });
  }
  getSrc() {
    return this.state.src;
  }
}