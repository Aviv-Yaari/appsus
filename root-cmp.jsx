import { AppHeader } from './js/cmps/app-header.jsx';
import { AppFooter } from './js/cmps/app-footer.jsx';
import { AppHome } from './js/pages/app-home.jsx';
import { AppAbout } from './js/pages/app-about.jsx';
import { MailIndex } from './js/apps/mail/pages/mail-index.jsx';
import { BookIndex } from './js/apps/book/pages/book-index.jsx';
import { NoteIndex } from './js/apps/keep/pages/note-index.jsx';
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App() {
  return (
    <Router>
      <div className="app flex column">
        <header>
          <AppHeader />
        </header>
        <main className="app-main">
          <Switch>
            <Route path="/mail" component={MailIndex} />
            <Route path="/keep" component={NoteIndex} />
            <Route path="/book" component={BookIndex} />
            <Route path="/about" component={AppAbout} />
            <Route path="/" component={AppHome} />
          </Switch>
        </main>
        <footer>
          <AppFooter />
        </footer>
      </div>
    </Router>
  );
}