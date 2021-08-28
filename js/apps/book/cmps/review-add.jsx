import { bookService } from '../services/book.service.js'
import { Reviews } from './reviews.jsx'
export class ReviewAdd extends React.Component {
    state = {
        reviews: this.props.book.reviews,
        review: {
            name: '',
            date: '',
            reviewTxt: '',
            rate: 0
        },
        clickedStar: 0
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState({ review: { ...this.state.review, [field]: value } });
    }
    updateRate = (rate) => {
        this.setState({ review: { ...this.state.review, rate } })
        this.setState({ clickedStar: rate })
    }
    onAddReview = (ev) => {
        ev.preventDefault();
        bookService.addReview(this.state.review, this.props.book.id).then(({ reviews }) => this.setState({ reviews }));
    }
    onRemoveReview = (reviewId, bookId) => {
        bookService.removeReview(reviewId, bookId).then(({ reviews }) => this.setState({ reviews }));
    }
    render() {
        const { clickedStar, review: { name } } = this.state
        return (
            <section className="review-add">
                <h1>add review</h1>
                <form onSubmit={this.onAddReview}>
                    <input type="text" placeholder="Full name" name="name" value={name} onChange={this.handleChange}></input>
                    <input type="date" name="date" onChange={this.handleChange} ></input>
                    <textarea name="reviewTxt" rows="4" cols="50" placeholder="Your review" onChange={this.handleChange} />
                    <div className="star-container">
                        <button type="button" className={'star star5' + (clickedStar === 5 ? ' clicked' : '')} onClick={() => this.updateRate(5)}>
                            <i className="fas fa-star"></i>
                        </button>
                        <button type="button" className={'star star4' + (clickedStar === 4 ? ' clicked' : '')} onClick={() => this.updateRate(4)}>
                            <i className="fas fa-star"></i>
                        </button>
                        <button type="button" className={'star star3' + (clickedStar === 3 ? ' clicked' : '')} onClick={() => this.updateRate(3)}>
                            <i className="fas fa-star"></i>
                        </button>
                        <button type="button" className={'star star2' + (clickedStar === 2 ? ' clicked' : '')} onClick={() => this.updateRate(2)}>
                            <i className="fas fa-star"></i>
                        </button>
                        <button type="button" className={'star star1' + (clickedStar === 1 ? ' clicked' : '')} onClick={() => this.updateRate(1)}>
                            <i className="fas fa-star"></i>
                        </button>
                    </div>
                    <button type="submit" className="add-review-btn">Add</button>
                </form>
                <Reviews book={this.props.book} onRemoveReview={this.onRemoveReview} />
            </section >
        )
    }
}