export const BtnTrash = (props) => {
  const { onTrash } = props;
  return <img src={'assets/img/trash.png'} onClick={onTrash} />;
};
