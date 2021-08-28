export const BtnPrev = (props) => {
  const { onClick, page } = props;
  return (
    <img
      src="assets/svg/prev.svg"
      title="Previous"
      className={page !== 0 ? 'btn' : 'btn disabled'}
      onClick={onClick}
    />
  );
};
