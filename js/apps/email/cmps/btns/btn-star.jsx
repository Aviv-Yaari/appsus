export const BtnStar = (props) => {
  const { onToggle, email } = props;
  const isStarredStr = email.isStarred ? 'active' : 'disabled';
  return (
    <img
      className="email-star"
      onClick={onToggle}
      src={'assets/svg/star-' + isStarredStr + '.svg'}
      title={email.isStarred ? 'Mark as unstarred' : 'Mark as starred'}
    />
  );
};
