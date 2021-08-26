export class EmailFilter extends React.Component {
  state = {};
  onFilter = (ev) => {
    const { name, value } = ev.target;
    const valueMap = { true: true, false: false, undefined: undefined };
    this.props.onFilter({ [name]: valueMap[value] });
  };
  getSortArrow = (field) => {
    const { sortType } = this.props;
    if (sortType.field === field && sortType.type === 1) return '↓';
    if (sortType.field === field && sortType.type === -1) return '↑';
    return '';
  };
  render() {
    const { onSort, sortType } = this.props;
    return (
      <section className="email-filter">
        <select onChange={this.onFilter} name="isRead">
          <option value="undefined">Read/Unread</option>
          <option value="true">Read</option>
          <option value="false">Unread</option>
        </select>
        <select onChange={this.onFilter} name="isStarred">
          <option value="undefined">Starred/Unstarred</option>
          <option value="true">Starred</option>
          <option value="false">Unstarred</option>
        </select>
        <button name="sentAt" onClick={onSort}>
          Date {this.getSortArrow('sentAt')}
        </button>
        <button name="subject" onClick={onSort}>
          Subject {this.getSortArrow('subject')}
        </button>
      </section>
    );
  }
}
