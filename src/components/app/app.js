import { useState, useEffect } from 'react';

import AppStyles from './app.module.css';

import Modal from '../modal/modal';
import Preloader from '../preloader/preloader';
import Panel from '../panel/panel';
import Table from '../table/table';
import Controls from '../controls/controls';

import { request } from '../../utils/api';
import {  loadTaskFromLocalStorage, 
          saveTaskToLocalStorage,
          clearTaskInLocalStorage,
          clearBoardInLocalStorage } from '../../utils/local-storage';

function App() {
  const [loading, setLoading] = useState(
    {
    isLoading: true,
    hasError: false,
    loaded: false
    }
  );
  const [modalShow, setModalShow] = useState(false);
  const [isRestart, setRestart] = useState(false);
  const [isHelp, setHelp] = useState(false);

  const closeHandler = (e) => {
    e.preventDefault();
    setModalShow(false);
    setLoading({ isLoading: true, hasError: false, isLoaded: true });
    loadTask();
  };

  const loadTask = () => {
    console.log('In loadTask');
    //////////////////////////////////////////////////////////////////
    const data = {    
      "task": [
        "0", "0", "1", "0", "0", "0", "0", "1", "0",
        "0", "1", "0", "1", "0", "0", "1", "0", "1",
        "1", "1", "1", "1", "1", "0", "1", "0", "1",
        "1", "0", "0", "0", "1", "0", "0", "1", "0",
        "1", "0", "0", "0", "1", "0", "0", "1", "0",
        "1", "1", "1", "1", "1", "0", "0", "1", "0"
      ],
      "width": 9,
      "height": 6,
      "success": "true"
    };

    saveTaskToLocalStorage(data);
    setLoading({ isLoading: false, hasError: false, isLoaded: true });
    //////////////////////////////////////////////////////////////////
    // try {  
    //   request('/'
    //   )
    //   .then(data=> {
    //     console.log('In loadTask: then');
    //     console.log('APP loadTask: task loaded');
    //     saveTaskToLocalStorage(data);
    //     console.log('In loadTask: saved to localStorage');
    //     setLoading({ isLoading: false, hasError: false, isLoaded: true });
    //   })
    //   .catch((error) => {
    //     console.log('In loadTask: error');
    //     console.error (`Ошибка Promise: ${error}`);
    //     setLoading({ isLoading: false, hasError: true, isLoaded: false});
    //     setModalShow(true);
    //   });
    // } catch (error) {
    //   console.log('In loadTask: catch error');
    //   console.error((`Не удалось получить task от API: ${error.message}`));
    //   setLoading({ isLoading: false, hasError: true, isLoaded: false});
    //   setModalShow(true);
    // }
    //////////////////////////////////////////////////////////////////
  };

  const restartHandler = (e) => {
    e.preventDefault();
    clearBoardInLocalStorage();
    clearTaskInLocalStorage();
    setHelp(false);
    setLoading({ isLoading: true, hasError: false, isLoaded: true });
    loadTask();  
    setRestart(true);
  };

  const helpHandler = () => {
    const data = loadTaskFromLocalStorage();
    let help = {};
    let pos = 0;
    if (data && data.task) {
      while (true) {
        pos = Math.floor(Math.random() * data.task.length);
        if (data.task[pos] === "1") { 
          break;
        }
      }
      help.content = data.task[pos];
      help.pos = pos;
    } else {
      help = false;
    }
    setHelp(help);
  };

  useEffect(()=> {
    console.log('APP REDRAW!!');
    if (!loadTaskFromLocalStorage()) {
      setLoading({ isLoading: true, hasError: false, isLoaded: true });
      loadTask();
    } else {
      setLoading({ isLoading: false, hasError: false, isLoaded: true });
    }
    setRestart(false);
  }, [isRestart]);

  return (
      <div className={AppStyles.wrapper}>
        <div className={AppStyles.app}>
          <h1 className={AppStyles.title}>Японские кроссворды</h1>
          <main className={AppStyles.main}>
          {!loading.isLoading && !loading.hasError && 
            <Panel>
              <Table help={isHelp}/>
              <Controls onRestart={restartHandler} onHelp={helpHandler}/>
            </Panel>
          }
          {loading.isLoading && 
            <Preloader />          
          }
          {loading.hasError && modalShow &&
            <Modal image="modal1.png" onClick={closeHandler}>Ошибка загрузки кроссворда.</Modal>
          }
          </main>
          <footer className={AppStyles.footer}>
            &copy;2023 crossw.ru - Японские кроссворды
          </footer>
        </div>
      </div>
  );
}

export default App