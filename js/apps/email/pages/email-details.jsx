import { LoadingSpinner } from '../../../cmps/loading-spinner.jsx';
import { emailService } from '../services/email.service.js';

export class EmailDetails extends React.Component {
  state = { email: null };

  componentDidMount() {
    this.loadEmail();
  }

  loadEmail = () => {
    const { id } = this.props;
    emailService.getEmailById(id).then((email) => this.setState({ email }));
  };

  render() {
    const { email } = this.state;
    if (!email) return <LoadingSpinner />;
    return <section className="email-details">{email.subject}</section>;
  }
}
