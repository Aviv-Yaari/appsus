import { utilService } from '../services/util.service.js';

export class LongTxt extends React.Component {
  state = {
    isLongShown: false,
  };

  toggleLongTxt = () => {
    this.setState((prevState) => ({ isLongShown: !prevState.isLongShown }));
  };

  render() {
    const { isLongShown } = this.state;
    const { length, text } = this.props;
    return (
      <React.Fragment>
        {isLongShown ? text : utilService.trimText(text, length)}
        {text.length > length && (
          <button onClick={this.toggleLongTxt}>{isLongShown ? 'Read Less' : 'Read More'}</button>
        )}
      </React.Fragment>
    );
  }
}
