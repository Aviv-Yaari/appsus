import { AppHeader } from './js/cmps/app-header.jsx';
import { AppFooter } from './js/cmps/app-footer.jsx';
import { AppHome } from './js/pages/app-home.jsx';
import { AppAbout } from './js/pages/app-about.jsx';
import { EmailIndex } from './js/apps/email/pages/email-index.jsx';
import { BookIndex } from './js/apps/book/pages/book-index.jsx';
import { NoteIndex } from './js/apps/keep/pages/note-index.jsx';
import { UserMsg } from './js/cmps/user-msg.jsx';
import {BookAdd} from './js/apps/book/pages/book-add.jsx'
import {BookDetails} from './js/apps/book/pages/book-details.jsx'

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App() {
  return (
    <Router>
      <div className="app flex column">
        <UserMsg />
        <header>
          <AppHeader />
        </header>
        <main className="app-main">
          <Switch>
            <Route path="/emails/:status/:emailId" component={EmailIndex} />
            <Route path="/emails/:status" component={EmailIndex} />
            <Route path="/emails" component={EmailIndex} />
            <Route path="/keep/:noteId" component={NoteIndex} />
            <Route path="/keep" component={NoteIndex} />
            <Route path="/book/add" component={BookAdd} />
            <Route path="/book/:bookId" component={BookDetails} />
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
