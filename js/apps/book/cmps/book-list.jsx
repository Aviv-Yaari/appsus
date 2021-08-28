import { BookPreview } from './book-preview.jsx'
export function BookList({ books, onSelectBook }) {
    return (
        <div className='book-list'>
            {books.map(book => <BookPreview key={book.id} book={book} onSelectBook={onSelectBook} />)}
        </div>
    )
}
