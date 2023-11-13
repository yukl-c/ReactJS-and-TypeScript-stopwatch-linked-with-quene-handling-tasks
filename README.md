# ReactJS and TypeScript: stopwatch connected to quenes handling tasks
# Stopwatch
- in src/app/stopwatch.tsx
- A visually appealing and intuitive user interface for the stopwatch with the following elements:
  1. Display area for the elapsed time.
    - It should initially display "00s 00" ({{seconds}}s {{milliseconds}}).
  2. "Start" button
    - When the user clicks the "Start" button, the stopwatch should start counting up in seconds and creating task, updating the display accordingly.
    - Clicking the "Start" button again should pause the stopwatch.
    - Clicking the "Start" button after pausing should resume counting.
    - Control the task of handling quenes:
      * Click "Start" button to generate tasks and build the queue, click it again to pause the quese and tasks, click it after pausing to resume the works
  3. "Reset" button
    - It should reset the stopwatch back to "00s 00" ({{seconds}}s {{milliseconds}}).
    - Control the task of handling quenes:
      * Click it to reset all the queues to no tasks.
     
# Tasks and Queues
- in src/app/app.tsx
- Implement a queue to execute tasks within 5 secs.
- The queue should be able to handle 100 tasks per second.

# Instructions
- run `yarn` to install all the dependencies
- run `yarn start` to start the server
- run `yarn test` to run the test cases
