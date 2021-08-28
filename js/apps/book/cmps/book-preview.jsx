const { withRouter } = ReactRouterDOM
import { utilService } from "../../../services/util.service.js";
export function _BookPreview({ book, history }) {
    return (
        <div className='book-preview' onClick={() => history.push(`/book/${book.id}`)}>
            <h1>{book.title}</h1>
            <h2><span>{book.listPrice.amount}</span><span>{utilService.getSign(book.listPrice.currencyCode)}</span></h2>
            <img src={book.thumbnail} />
        </div>
    )
}

export const BookPreview = withRouter(_BookPreview)