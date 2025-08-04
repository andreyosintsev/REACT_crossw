import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import AppStyles from './game.module.scss';

import Modal from '../../components/modal/modal';
import Preloader from '../../components/preloader/preloader';
import PageBlock from '../../components/page-block/page-block';
import Table from './table/table';
import Controls from './controls/controls';
import ModalButton from '../../components/modal-button/modal-button';
import Tasks from './tasks/tasks';

<<<<<<< HEAD
import {  apiGetTask,
          apiGetTasks } from '../../utils/api';

import {  loadTaskFromLocalStorage, 
          saveTaskToLocalStorage,
          clearTaskInLocalStorage,
          loadTasksFromLocalStorage, 
          saveTasksToLocalStorage,
          clearTasksInLocalStorage,
          clearBoardInLocalStorage } from '../../utils/local-storage';
=======
import * as Api from '../../utils/api';

import { LocalStorage } from '../../utils/local-storage'
const localStorage = new LocalStorage();
>>>>>>> 65b6eeb (feat<ts>: local-storage moved to ts)

const Game = () => {
  const [task, setTask] = useState(null);
  
  const [taskLoading, setTaskLoading] = useState({
    isLoading: true,
    hasError: false,
  });

  const [tasksLoading, setTasksLoading] = useState({
    isLoading: true,
    hasError: false,
  });

  const [isModalShow, setModalShow] = useState(false);
  const [isRestart, setRestart] = useState(false);
  const [isHelp, setHelp] = useState(false);

  
  
  const { taskNumber } = useParams();

  useEffect(() => {
    console.log("GAME: REDRAW!!");
    console.log("GAME: taskNumber: " + taskNumber);

    setTask(localStorage.loadTaskFromLocalStorage(taskNumber));

    if (!task) {
      console.log("GAME: No Task In LocalStorage, loading");
      setTaskLoading({ isLoading: true, hasError: false, isLoaded: false });
      loadTask(taskNumber);
    } else {
      console.log("GAME: Task In LocalStorage, can play");
      setTaskLoading({ isLoading: false, hasError: false, isLoaded: true });
    }
    // if (!loadTasksFromLocalStorage()) {
    //   setTasksLoading({ isLoading: true, hasError: false, isLoaded: false });
    //   loadTasks(10);
    // } else {
    //   setTasksLoading({ isLoading: false, hasError: false, isLoaded: true });
    // }
    setRestart(false);
  }, [isRestart]);

  const closeHandler = (e) => {
    e.preventDefault();
    setModalShow(false);
    setTaskLoading({ isLoading: true, hasError: false, isLoaded: false });
    loadTask();
  };

  const loadTasks = () => {
    console.log("In loadTasks");
    try {
<<<<<<< HEAD
      apiGetTasks("")
=======
      Api.apiGetTasks("")
>>>>>>> 65b6eeb (feat<ts>: local-storage moved to ts)
        .then((data) => {
          console.log("In loadTasks: then");
          console.log("APP loadTasks: tasks loaded");
          saveTasksToLocalStorage(data);
          console.log("In loadTasks: saved to localStorage");
          setTasksLoading({
            isLoading: false,
            hasError: false,
            isLoaded: true,
          });
        })
        .catch((error) => {
          console.log("In loadTasks: error");
          console.error(`Ошибка Promise: ${error}`);
          setTasksLoading({
            isLoading: false,
            hasError: true,
            isLoaded: false,
          });
          setModalShow(true);
        });
    } catch (error) {
      console.log("In loadTasks: catch error");
      console.error(`Не удалось получить tasks от API: ${error.message}`);
      setTasksLoading({ isLoading: false, hasError: true, isLoaded: false });
      setModalShow(true);
    }
  };

  const loadTask = (taskNumber) => {
    console.log("In loadTask");
   
    try {
<<<<<<< HEAD
      apiGetTask(taskNumber)
=======
      Api.apiGetTask(taskNumber)
>>>>>>> 65b6eeb (feat<ts>: local-storage moved to ts)
        .then((data) => {
          console.log("GAME: loadTask: then");
          console.log("GAME: loadTask: task loaded");
          saveTaskToLocalStorage(taskNumber, data);
          console.log("GAME: loadTask: saved to localStorage");
          setTaskLoading({ isLoading: false, hasError: false, isLoaded: true });
        })
        .catch((error) => {
          console.log("GAME: loadTask: error");
          console.error(`GAME: Ошибка Promise: ${error}`);
          setTaskLoading({ isLoading: false, hasError: true, isLoaded: false });
          setModalShow(true);
        });
    } catch (error) {
      console.log("GAME: loadTask: catch error");
      console.error(`GAME: Не удалось получить task от API: ${error.message}`);
      setTaskLoading({ isLoading: false, hasError: true, isLoaded: false });
      setModalShow(true);
    }
  };

<<<<<<< HEAD
    const restartHandler = (e) => {
        clearBoardInLocalStorage();
        clearTaskInLocalStorage();
        setHelp(false);
        setTaskLoading({ isLoading: true, hasError: false, isLoaded: true });
        loadTask();
        loadTasks();
        setRestart(true);
    };

  const helpHandler = () => {
    const data = loadTaskFromLocalStorage();
=======
  const restartHandler = (e) => {
    localStorage.clearBoardInLocalStorage(taskNumber); // @fix: Добавлен номер игрового поля для очистки
    localStorage.clearTaskInLocalStorage();
    setHelp(false);
    setTaskLoading({ isLoading: true, hasError: false, isLoaded: true });
    loadTask(taskNumber); // @tudo: Добавлен номер игрового поля для очистки
    loadTasks();
    setRestart(true);
  };

  const helpHandler = () => {
    const data = localStorage.loadTaskFromLocalStorage(taskNumber); // @fix: добавлен номер игрового поля
>>>>>>> 65b6eeb (feat<ts>: local-storage moved to ts)
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

<<<<<<< HEAD
  useEffect(() => {
    console.log("GAME: REDRAW!!");
    console.log("GAME: taskNumber: " + taskNumber);

    setTask(loadTaskFromLocalStorage(taskNumber));
    
    if (!task) {
      console.log("GAME: No Task In LocalStorage, loading");
      setTaskLoading({ isLoading: true, hasError: false, isLoaded: false });
      loadTask(taskNumber);
    } else {
      console.log("GAME: Task In LocalStorage, can play");
      setTaskLoading({ isLoading: false, hasError: false, isLoaded: true });
    }
    // if (!loadTasksFromLocalStorage()) {
    //   setTasksLoading({ isLoading: true, hasError: false, isLoaded: false });
    //   loadTasks(10);
    // } else {
    //   setTasksLoading({ isLoading: false, hasError: false, isLoaded: true });
    // }
    setRestart(false);
  }, [isRestart]);

=======
>>>>>>> 65b6eeb (feat<ts>: local-storage moved to ts)
  return (
    <>
        <aside>
            <Tasks />
        </aside>
        <main className={AppStyles.main}>
            {
                !taskLoading.isLoading && !taskLoading.hasError && task && (
                    <PageBlock title = { "Кроссворд № " + taskNumber }>
                        <Table task = {task} help = {isHelp} />
                        <Controls onRestart={restartHandler} onHelp={helpHandler} />
                    </PageBlock>
                )
            }
            {
                taskLoading.isLoading && <Preloader />
            }
            {
                taskLoading.hasError && isModalShow && (
                    <Modal
                        image="modal1.png"
                        title="Ошибка загрузки кроссворда."
                        onClick={closeHandler}
                    >
                        <ModalButton onClick={closeHandler}>Закрыть</ModalButton>
                    </Modal>
                )
            }
        </main>
    </>
  );
};

export default Game;