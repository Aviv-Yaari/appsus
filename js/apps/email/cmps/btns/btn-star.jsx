export const BtnStar = (props) => {
  const { onToggle, email } = props;
  return (
    <img
      className="email-star"
      onClick={onToggle}
      src={'assets/svg/star-' + (email.isStarred ? 'active' : 'disabled') + '.svg'}
    />
  );
};
