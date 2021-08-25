const { NavLink, Link } = ReactRouterDOM;

export class AppHeader extends React.Component {
  state = {};
  render() {
    return (
      <section className="app-header flex align-center">
        <Link to="/">Appsus</Link>
        <input type="search" name="search" id="search" placeholder="Search" />
        <nav>
          <NavLink to="keep">Keep</NavLink>
          <NavLink to="mail">Mail</NavLink>
          <NavLink to="book">Books</NavLink>
          <NavLink to="about">About</NavLink>
        </nav>
      </section>
    );
  }
}
