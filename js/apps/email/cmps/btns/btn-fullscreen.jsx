export const BtnFullscreen = (props) => {
  const { onFullScreen } = props;
  return <img src="assets/svg/fullscreen.svg" onClick={onFullScreen} />;
};
