export const BtnExportNote = (props) => {
  const { onExport } = props;
  return <img src="assets/svg/note.svg" title="Export as note" onClick={onExport} />;
};
