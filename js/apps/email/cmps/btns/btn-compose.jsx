export const BtnCompose = (props) => {
  const { onToggle } = props;
  return (
    <button className="btn-compose flex justify-center align-center" onClick={() => onToggle(true)}>
      <img src="assets/img/plus.png" />
      Compose
    </button>
  );
};
