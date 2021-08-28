import { constsService } from '../../../services/consts.service.js';
import { BtnNext } from './btns/btn-next.jsx';
import { BtnPrev } from './btns/btn-prev.jsx';

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

  getCriteriaValue = (field) => {
    if (field) return 'true';
    else if (field === false) return 'false';
    return 'undefined';
  };

  render() {
    const { onSort, onFilter, criteria, onChangePage, emailsCount } = this.props;
    const { page } = criteria;
    return (
      <section className="email-filter flex align-center">
        <div className="email-filter-btns">
          <select
            onChange={this.onFilter}
            name="isRead"
            value={this.getCriteriaValue(criteria.isRead)}>
            <option value="undefined">Read/Unread</option>
            <option value="true">Read</option>
            <option value="false">Unread</option>
          </select>
          <select
            onChange={this.onFilter}
            name="isStarred"
            value={this.getCriteriaValue(criteria.isStarred)}>
            <option value="undefined">Starred/Unstarred</option>
            <option value="true">Starred</option>
            <option value="false">Unstarred</option>
          </select>
        </div>
        <div className="email-sort-btns">
          <button name="sentAt" onClick={onSort}>
            Date {this.getSortArrow('sentAt')}
          </button>
          <button name="subject" onClick={onSort}>
            Subject {this.getSortArrow('subject')}
          </button>
        </div>
        <div className="filter-pages flex align-center">
          <span>Page {page}</span>
          <BtnPrev onClick={() => onFilter({ page: page - 1 })} page={page} />
          <BtnNext onClick={() => onFilter({ page: page + 1 })} emailsCount={emailsCount} />
        </div>
      </section>
    );
  }
}
