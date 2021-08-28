export const BtnRead = (props) => {
  const { email, onToggle } = props;
  const isReadStr = email.isRead ? 'unread' : 'read';
  return (
    <img
      src={'assets/img/' + isReadStr + '.png'}
      title={'Mark as ' + isReadStr}
      onClick={onToggle}
    />
  );
};
