export class EmailFilter extends React.Component {
  state = {};
  onFilter = (ev) => {
    const { name, value } = ev.target;
    const valueMap = { true: true, false: false, undefined: undefined };
    this.props.onSetCriteria({ [name]: valueMap[value] });
  };
  render() {
    const { onSort } = this.props;
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
        <button onChange={onSort}>Date</button>
        <button onChange={onSort}>Subject</button>
      </section>
    );
  }
}
