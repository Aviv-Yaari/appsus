import { bookService } from '../services/book.service.js'
import { utilService } from "../../../services/util.service.js";
import { eventBusService } from '../../../services/event-bus.service.js';

export class BookAdd extends React.Component {
    state = {
        search: '',
        results: []
    }

    removeEventBus;

    componentDidMount() {
        window.scroll({
            top: 0
        })
    }

    componentWillUnMount() {
        this.removeEventBus();
    }
    getResults = () => {
        bookService.getResults(this.state.search.toLocaleLowerCase())
            .then(res => this.setState({ results: res }));
    }
    debbouncedFunc = utilService.debounce(this.getResults, 500);

    handleChange = ({ target }) => {
        const value = target.value;
        this.setState({ search: value })
        if (value === '') return;
        this.debbouncedFunc()
    }

    onAddBook = (resultId) => {
        const currBook = this.state.results.find(result => result.id === resultId);
        bookService.addGoogleBook(currBook
        ).then((bookId) => {
            this.removeEventBus = eventBusService.emit('user-msg', { txt: 'Your book has been successfuly added', type: 'success', bookId });
            this.props.history.push('/book');
        }).catch(() => {
            this.removeEventBus = eventBusService.emit('user-msg', { txt: 'An error occured, please try again', type: 'danger' });
        })
    }


    onBack = () => {
        this.props.history.push('/book');
    }


    render() {
        const { search, results } = this.state;
        return (
            <section className="book-add">
                <button className="go-back" onClick={this.onBack}><span>&#8592;</span><span>Back</span></button>
                <h1>Search and add your favourite book!</h1>
                <input type="text" placeholder="Search book" value={search} onChange={this.handleChange}></input>
                {results && <section className="results">
                    {results.map(result => (
                        <div key={result.id} className="result" onClick={() => { this.onAddBook(result.id) }}>
                            <h2>{result.volumeInfo.title}</h2>
                            <h2>&#x2b;</h2>
                        </div>
                    ))}
                </section>}
            </section>
        )
    }
}