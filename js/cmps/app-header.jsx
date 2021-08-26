import { eventBusService } from '../services/event-bus.service.js';

const { NavLink, Link, withRouter } = ReactRouterDOM;
class _AppHeader extends React.Component {
  state = {
    currPage: this.props.location.pathname.split('/')[1],
    isAppsMenu: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ currPage: this.props.location.pathname.split('/')[1], isAppsMenu: false });
    }
  }

  handleChange = (ev) => {
    eventBusService.emit('search', ev.target.value);
  };

  onToggleAppsMenu = () => {
    this.setState((prevState) => ({ isAppsMenu: !prevState.isAppsMenu }));
  };

  render() {
    const { currPage, isAppsMenu } = this.state;
    return (
      <section className="app-header flex align-center">
        <Link to="/" className="logo">
          Appsus
        </Link>
        <div className="search flex" style={{ visibility: !currPage ? 'hidden' : 'visible' }}>
          <img src="assets/svg/search.svg" />
          <input
            onChange={this.handleChange}
            type="text"
            name="search"
            placeholder={'Search ' + currPage}
          />
        </div>
        <img className="btn-apps" src="assets/svg/apps.svg" onClick={this.onToggleAppsMenu} />
        <nav className="apps-menu flex" style={{ visibility: isAppsMenu ? 'visible' : 'hidden' }}>
          <NavLink to="/keep">
            <img src="assets/img/keep.png" />
            <span>Keep</span>
          </NavLink>
          <NavLink to="/emails/inbox">
            <img src="assets/img/gmail.png" />
            <span>Mail</span>
          </NavLink>
          <NavLink to="/book">
            <img src="assets/img/books.png" />
            <span>Books</span>
          </NavLink>
          <NavLink to="/about">
            <img src="assets/img/about.png" />
            <span>About</span>
          </NavLink>
        </nav>
      </section>
    );
  }
}

export const AppHeader = withRouter(_AppHeader);
