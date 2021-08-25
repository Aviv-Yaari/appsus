import { LoadingSpinner } from '../../../cmps/loading-spinner.jsx';
import { emailService } from '../services/email.service.js';

export class EmailDetails extends React.Component {
  state = { email: null };

  componentDidMount() {
    this.loadEmail();
  }

  loadEmail = () => {
    const { emailId } = this.props.match.params;
    emailService.getEmailById(emailId).then((email) => this.setState({ email }));
  };

  render() {
    const { email } = this.state;
    if (!email) return <LoadingSpinner />;
    return <main>{email.subject}</main>;
  }
}
