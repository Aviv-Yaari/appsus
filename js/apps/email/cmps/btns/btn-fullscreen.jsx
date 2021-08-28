export const BtnFullscreen = (props) => {
  const { onFullScreen } = props;
  return <img src="assets/svg/fullscreen.svg" title="Full screen" onClick={onFullScreen} />;
};
