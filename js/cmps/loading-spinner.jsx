export const LoadingSpinner = () => {
  const style = {};
  return (
    <img
      width={100}
      src="../../assets/svg/tail-spin.svg"
      style={{ position: 'absolute', right: '50%', top: '50%', transform: 'translate(50%, -50%)' }}
    />
  );
};
