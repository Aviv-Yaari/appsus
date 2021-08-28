import { constsService } from '../../../../services/consts.service.js';

export const BtnNext = (props) => {
  const { onClick, emailsCount } = props;
  const { EMAILS_PER_PAGE } = constsService;
  return (
    <img
      src="assets/svg/next.svg"
      title="Next"
      className={emailsCount === EMAILS_PER_PAGE ? 'btn' : 'btn disabled'}
      onClick={onClick}
    />
  );
};
