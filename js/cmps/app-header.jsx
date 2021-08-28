import { eventBusService } from '../services/event-bus.service.js';

const { NavLink, Link, withRouter } = ReactRouterDOM;
class _AppHeader extends React.Component {
  state = {
    currPage: this.props.location.pathname.split('/')[1],
    isAppsMenu: false,
    style: {
      backgroundColor: '#fff',
      borderBottom: '1px solid #ECEFF1',
    },
  };

  handleScroll = (ev) => {
    const scrollTop = ev.target.documentElement.scrollTop;
    if (scrollTop > 10) this.setColoredHeader();
    else this.setTransparentHeader();
  };

  componentDidMount() {
    if (this.state.currPage === '' || this.state.currPage === 'cards') {
      window.addEventListener('scroll', this.handleScroll);
      this.setTransparentHeader();
    }
    window.addEventListener('click', () => {
      if (this.state.isAppsMenu) {
        this.setState({ isAppsMenu: false })
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ currPage: this.props.location.pathname.split('/')[1], isAppsMenu: false });
    }
    if (prevState.currPage !== this.state.currPage) {
      if (this.state.currPage === '' || this.state.currPage === 'cards') {
        window.addEventListener('scroll', this.handleScroll);
        this.setTransparentHeader();
      } else {
        window.removeEventListener('scroll', this.handleScroll);
        this.setState({
          style: {
            backgroundColor: '#fff',
            borderBottom: '1px solid #ECEFF1',
          },
        });
      }
    }
  }

  setTransparentHeader = () => {
    this.setState({
      style: {
        backgroundColor: 'transparent',
        borderBottom: '1px solid transparent',
        position: 'fixed',
      },
    });
  };

  setColoredHeader = () => {
    this.setState({
      style: { backgroundColor: '#fff', borderBottom: '2px solid #ECEFF1', position: 'fixed' },
    });
  };

  handleChange = (ev) => {
    eventBusService.emit('search', ev.target.value);
  };

  onToggleAppsMenu = (ev) => {
    ev.stopPropagation();
    this.setState((prevState) => ({ isAppsMenu: !prevState.isAppsMenu }));
  };

  render() {
    const { currPage, isAppsMenu, style } = this.state;
    return (
      <section className="app-header flex align-center" style={style}>
        <Link to="/" className="logo">
          <img src="assets/img/logo.png" />
        </Link>
        <div
          className="search flex"
          style={{ display: !currPage || currPage === 'cards' || currPage.includes('book') ? 'none' : 'flex' }}>
          <img src="assets/svg/search.svg" />
          <input
            onChange={this.handleChange}
            type="text"
            name="search"
            placeholder={'Search ' + currPage}
          />
        </div>
        <img className="btn-apps" src="assets/svg/apps.svg" onClick={ev => this.onToggleAppsMenu(ev)} />
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
        </nav>
      </section>
    );
  }
}

export const AppHeader = withRouter(_AppHeader);
