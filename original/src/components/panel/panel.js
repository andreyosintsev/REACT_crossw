import PanelStyles from './panel.module.css';

const Panel = ({children}) => {
  return (
    <div className={PanelStyles.panel}>
      {children}
    </div>
  );
}

export default Panel