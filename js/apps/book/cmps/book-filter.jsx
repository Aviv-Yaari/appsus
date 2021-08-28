export class BookFilter extends React.Component {
    state = {
        filterBy: {
            title: '',
            minPrice: '',
            maxPrice: ''
        }
    }
    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.name === 'number' ? +ev.target.value : ev.target.value;
        this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }
    render() {
        const { title, minPrice, maxPrice } = this.state.filterBy;
        return (
            <section className='book-filter'>
                <h1>Filter By</h1>
                <form>
                    <label htmlFor='by-title'>By Name</label>
                    <input type='text' name='title' id='by-title' placeholder='Search book name' value={title} onChange={this.handleChange}></input>
                    <label htmlFor='min-price'>By Price</label>
                    <input type='number' name='minPrice' id='min-price' placeholder='Minimum price' min='0' value={minPrice} onChange={this.handleChange}></input>
                    <input type='number' name='maxPrice' id='max-price' placeholder='Maximum price' min='0' value={maxPrice} onChange={this.handleChange}></input>
                </form>
            </section>
        )
    }
}