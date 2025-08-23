import PreloaderStyles from './preloader.module.css';

function Preloader() {
  return (
    <div className={PreloaderStyles.preloader}>
      <img src={`/imgs/preloader.gif`} alt="Загрузка"/>
    </div>
  )
}

export default Preloader