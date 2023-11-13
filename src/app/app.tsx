import { useEffect, useRef, useState } from "react";
import { Task } from "types/task";
import { generate_task } from "app/producer";
import Stopwatch from './stopwatch';

import styles from "./app.module.css";
const TASK_PER_SECOND = 3000;
const MAX_ACCEPTABLE_DELAY = 5000;

export const App = (): JSX.Element => {
  const [tasks, setTasks] = useState([] as Task[]);
  const [completed, setCompleted] = useState([] as Task[]);
  const [failed, setFailed] = useState([] as Task[]);
  const [currentTask, setCurrentTask] = useState(null as Task | null);
  const [performance, setPerformance] = useState(0);

  const [tasksToProcess, setTasksToProcess] = useState([] as Task[]);

  const [clicking, setClicking] = useState(false);

  const startButtonClick = () => { 
    //if clicking=true, click "Start" turns clicking=false; else, click "Start" turns clicking=true
    if (clicking === false) {
      setClicking(true);
    } else {
      setClicking(false);
    }
  };

  const resetButtonClick = () => {
    //click "Reset" to let the clickiing be false
    //clean all lists and current task
    setClicking(false);
    setCurrentTask(null);
    setTasks([]);
    setCompleted([]);
    setFailed([]);
    setTasksToProcess([]);
    setPerformance(0);
  }


    // once if clicking === true, all three useEffect hooks run 
    
    useEffect(() => {
      if (clicking === true) {  //allow to generate the tasks if clicking is true
        const taskInterval = setInterval(() => {
          if (tasks.length < 100) {
            const new_task = generate_task();
            setTasks((prev) => [...prev, new_task]);
          }
        }, TASK_PER_SECOND);
      
        return () => {
          clearInterval(taskInterval);
        };
      }}, [tasks, clicking]);
    
  

    useEffect(() => {
      if (clicking === true) {  
        // slice the top 100 tasks from the pending list
        setTasksToProcess(tasks.slice(0, 100))
      
        tasksToProcess.forEach((task) => {
          // handle the 100 current tasks with for loop
          if (currentTask === null) {
            setCurrentTask(task);
            setTimeout(() => {
              setTasks((prev) => prev.filter((t) => t.id !== task.id));
              const finished_at = Date.now();
              if (
                finished_at - task.created_at - task.processing_time <=
                MAX_ACCEPTABLE_DELAY
              ) {
                setCompleted((prev) => [
                  ...prev,
                  {
                    ...task,
                    finished_at,
                  },
                ]);
              } else {
                setFailed((prev) => [
                  ...prev,
                  {
                    ...task,
                    finished_at,
                  },
                ]);
              }
              setCurrentTask(null);
            }, task?.processing_time);
          }
        });
      }
    }, [tasks, currentTask, clicking]);


  useEffect(() => {
    if (clicking === true) {
      let performance = (
        completed
          .map((x) => (x.finished_at! - x.created_at - x.processing_time) / 1000)
          .reduce((a, b) => a + b, 0) / completed.length
      ).toFixed(2);
      if (performance !== "NaN") {
        setPerformance(Number(performance));
      }
    }
  }, [completed, clicking]);

  return (
    
    <main className={styles.main}>
      <Stopwatch 
      resetButtonClick={resetButtonClick}
      startButtonClick={startButtonClick}
       />
      <h1 className={styles.title}>Queue</h1>
      <div className={styles.current}>
          <h2>current ({tasksToProcess.length})</h2>
          <div className={styles.list}>
            {tasksToProcess.map((task) => (
              <div key={task.id} className={styles.task}>
                <h3>{`Task-${task.id}`}</h3>
                <p>Est. Process Time: {task.processing_time / 1000} secs </p>
              </div>
            ))}
          </div>
        </div>

      <div className={styles.container}>
        <div className={styles.queue}>
          <h2>Tasks ({tasks.length})</h2>
          <div className={styles.list}>
            {tasks.map((task) => (
              <div key={task.id} className={styles.task}>
                <h3>{`Task-${task.id}`}</h3>
                <p>Est. Process Time: {task.processing_time / 1000} secs</p>
                <p>Wait Time: {(Date.now() - task.created_at) / 1000} secs</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.completed}>
          <h2>Completed {`(avg. delay: ${performance})`}({completed.length})</h2>
          <div className={styles.list}>
            {completed.map((task) => (
              <div key={task.id} className={styles.task}>
                <h3>{`Task-${task.id}`}</h3>
                <p>Est. Process Time: {task.processing_time / 1000} secs </p>
                <p>
                  Process Time: {(task.finished_at! - task.created_at) / 1000}{" "}
                  secs
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.completed}>
          <h2>Failed ({failed.length})</h2>
          <div className={styles.list}>
            {failed.map((task) => (
              <div key={task.id} className={styles.task}>
                <h3>{`Task-${task.id}`}</h3>
                <p>Est. Process Time: {task.processing_time / 1000} secs </p>
                <p>
                  Process Time: {(task.finished_at! - task.created_at) / 1000}{" "}
                  secs
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;

