const { Link } = ReactRouterDOM
import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'

export class BookIndex extends React.Component {
    state = {
        books: [],
        filterBy: null,
    }
    componentDidMount() {
        this.loadBooks();
        window.scroll({
            top: 0
        })
    }
    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then(books => {
                this.setState({ books })
            })
    }
    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    render() {
        const { books } = this.state;
        return (
            <section className="book-app">
                <BookFilter onSetFilter={this.onSetFilter} />
                <Link className="to-add-book" to="/book/add">Add book</Link>
                <BookList books={books} />
            </section>
        )
    }
}