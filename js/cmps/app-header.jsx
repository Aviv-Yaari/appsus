import { eventBusService } from '../services/event-bus.service.js';

const { NavLink, Link, withRouter } = ReactRouterDOM;
class _AppHeader extends React.Component {
  state = {
    currPage: this.props.location.pathname.split('/')[1],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ currPage: this.props.location.pathname.split('/')[1] });
    }
  }

  handleChange = (ev) => {
    eventBusService.emit('search', ev.target.value);
  };

  render() {
    const { currPage } = this.state;
    return (
      <section className="app-header flex align-center">
        <Link to="/" className="logo">
          Appsus
        </Link>
        <input
          onChange={this.handleChange}
          type="search"
          name="search"
          id="search"
          placeholder={'Search ' + currPage}
        />
        <nav>
          <NavLink to="/keep">Keep</NavLink>
          <NavLink to="/email">Mail</NavLink>
          <NavLink to="/book">Books</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </section>
    );
  }
}

export const AppHeader = withRouter(_AppHeader);
