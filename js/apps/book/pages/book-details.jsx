const { Link } = ReactRouterDOM;
import { utilService } from "../../../services/util.service.js";
import { bookService } from '../services/book.service.js'
import { LongTxt } from "../cmps/long-txt.jsx"
import { ReviewAdd } from "../cmps/review-add.jsx"
export class BookDetails extends React.Component {
    state = {
        book: null,
    }
    componentDidMount() {
        this.loadBook();
        window.scroll({
            top: 0
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }
    loadBook = () => {
        const id = this.props.match.params.bookId;
        bookService.getBookById(id)
            .then(book => {
                if (!book) this.props.history.push('/');
                this.setState({ book })
            })
    }
    getPageCountDesc = () => {
        const { pageCount } = this.state.book;
        if (pageCount > 500) return 'long reading'
        else if (pageCount > 200) return 'decent reading'
        else if (pageCount < 100) return 'light reading';
    }
    getPublishDateDesc = () => {
        const { publishedDate } = this.state.book;
        const currYear = new Date(Date.now()).getFullYear();
        if (currYear - publishedDate > 10) return 'veteran book';
        else if (currYear - publishedDate < 10) return 'new!';
    }
    getPriceClass = () => {
        const { amount } = this.state.book.listPrice;
        if (amount > 150) return 'expensive-price';
        else if (amount < 20) return 'cheap-price';
        else return '';
    }
    onBack = () => {
        this.props.history.push('/book');
    }
    render() {
        const { book } = this.state;
        if (!book) return <div>Loading...</div>
        return (
            <section className="book-details main-layout">
                <h1>{book.title}</h1>
                <h2>{book.subtitle}</h2>
                <div className="author"><h3>{book.authors.length === 1 ? 'author:' : 'authors:'} </h3>{book.authors.map((author, idx) => <h3 key={idx}>{author}</h3>)}</div>
                <h3 className="price"><span>Price: </span><span className={this.getPriceClass()}>{book.listPrice.amount}<span>{utilService.getSign(book.listPrice.currencyCode)}</span></span></h3>
                <h3 className="desc">description:</h3>
                <LongTxt text={book.description} />
                {this.getPageCountDesc() && <h3>✔️ {this.getPageCountDesc()}</h3>}
                {this.getPublishDateDesc() && <h3>✔️ {this.getPublishDateDesc()}</h3>}
                {book.listPrice.isOnSale && <img className="sale" src="assets/img/sale.png"></img>}
                <img src={book.thumbnail} />
                <ReviewAdd book={book} />
                <button className="go-back" onClick={this.onBack}><span>&#8592;</span><span>Back</span></button>
                <Link className="prev-book" to={`/book/${bookService.getNextBookId(book.id, -1)}`} >&#8592;</Link>
                <Link className="next-book" to={`/book/${bookService.getNextBookId(book.id, 1)}`}>&#8594;</Link>
            </section>
        )
    }
}