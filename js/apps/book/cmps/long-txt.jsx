
export class LongTxt extends React.Component {
    state = {
        isLongTxtShown: false
    }
    getTextToShow = (text) => {
        const { isLongTxtShown } = this.state
        if (isLongTxtShown) return text;
        if (text.length > 100) {
            return text.substring(0, 100) + '...';
        } else return text;
    }
    onToggleText = () => {
        this.setState(prevState => ({ isLongTxtShown: !prevState.isLongTxtShown }));
    }
    render() {
        const { isLongTxtShown } = this.state;
        const { text } = this.props;
        return (
            <div className="long-text">
                <p>{this.getTextToShow(text, isLongTxtShown)}</p>
                {text.length > 100 && <button onClick={() => this.onToggleText()}>{isLongTxtShown ? 'Less' : 'More'}</button>}
            </div>
        )
    }
}