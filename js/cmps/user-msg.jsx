import { eventBusService } from '../services/event-bus.service.js';

export class UserMsg extends React.Component {
  state = { msg: null };

  componentDidMount() {
    this.removeEventBus = eventBusService.on('user-msg', (msg) => {
      this.setState({ msg }, () => {
        if (this.timeoutId) clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(this.onCloseMsg, 2500);
      });
    });
  }

  onCloseMsg = () => {
    this.setState({ msg: null });
    clearTimeout(this.timeoutId);
  };

  componentWillUnmount() {
    this.removeEventBus();
  }

  render() {
    const { msg } = this.state;
    if (!msg) return <React.Fragment />;
    return (
      <section className="user-msg flex align-center">
        <span>{msg}</span>
        <img src="assets/img/close-white.png" className="btn-close" onClick={this.onCloseMsg}></img>
      </section>
    );
  }
}
