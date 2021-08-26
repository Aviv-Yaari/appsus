export const BtnRead = (props) => {
  const { email, onToggle } = props;
  return (
    <img src={'assets/img/' + (email.isRead ? 'unread' : 'read') + '.png'} onClick={onToggle} />
  );
};
