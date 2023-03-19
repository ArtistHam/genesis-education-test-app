# Test task for Front-End School 2.0

## Table of Content

- [Setup Project](#setup-project)
- [Used Technologies](#used-technologies)
- [Technical task and it's completion progress](#technical-task-and-its-completion-progress)
  <br/>
  <br/>
  <br/>

## Setup Project

1. To get project you need to **clone it**.
2. After that in root directory execute
   `npm i` <br />
3. **To run** application you need to execute <br />
   `npm run start` <br />
4. The project will be opened in your default browser at **localhost:3000** <br />
5. I assume that API will work, **but videos will be not loaded because of CORS error**.
   To fix that you need to install [browser extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf).
6. After installation **you need to activate extension** like it show on picture: <br/> <br/>
   ![extension explanation](https://github.com/ArtistHam/genesis-education-test-app/raw/master/assets/readme_explanation.jpg) <br />

All are set up!

## Used Technologies

This project use **TypeScript** as a main developing program language. It has been selected to add more reliability to code, and in this case (small simple app) can partially replace test.

As a framework this project use **React**, because of performance, reactivity and reliability.
In addition to React project use **react-router** for SPA routes, **Redux Toolkit** for store management, **RTK Query** for AJAX and **hls.js** for m3u8 video processing.

As a bundler project use **WebPack** (custom config).<br/>
For static analyze project use **ESLint**.<br/>
To style components project use **CSS modules**.<br/>
As icons library **react-icons** used.

## Technical task and it's completion progress

- The last 10 courses must be displayed in the course feed.<br />
  The course includes:
  - [x] Photo of the course.
  - [x] Title of the course.
  - [x] Number of lessons, skills and rating. <br />
        <small>I decided to **don't show** skills.</small>
  - [x] We display 10 courses on the page and add pagination. <br />
        <small>Courses fetched using **RTK Query**, **pagination made with local state**. For real projects it is better to do pagination on back-end side, to make request smaller and therefore faster. Also, to reduce **load-time frustration** I develop custom **skeleton loader**.</small>
  - Additionally:
    - [x] When hovering, play the video without sound. <br />
          <small>This feature made by **onMouseEnter** and **onMouseLeave** handlers.</small>
- The course view page displays the first video from this course, details about the course and a list of lessons:

  - [x] When clicking on a lesson (if it is not blocked), the current video will open for viewing, the user must understand which lesson from the course he is viewing.

  - [x] It is necessary to save the progress of watching the video and the lesson of the course (save locally). <br/>
        <small>Current lesson in course and current time of each lessons saved in **LocalStorage** when you **close, leave or refresh the page**.</small>
  - [x] If the lesson is blocked, show it to the user. <br/><small>For display that lesson is locked it appear with **gray text color** and little **lock icon at preview**.</small>
  - Additionally:
    1. Make a functional picture in picture (without third-party libraries):
       - [x] The video can be displayed on top of the page when clicked. At the same time, the video is located in the lower right corner of the page and you can go to other pages. <br />
             <small>This feature was tricky if we take into account save-current-time-of-video feature. For that I add **leavepictureinpicture** handler. Also at that handler I add navigation to course page, **because it not work properly with SPA**. </small>
    2. [x] Add a change in video playback speed via the keyboard (without third-party libraries) (key combination at your discretion):
       - [x] Also display information next to the video on how to use it. <br/>
             <small>Information is **under the videoplayer**. It use default shortcut for YouTube to change video speed. Also there you can see **current playback speed**. This feature was tricky, because when event listener added to window, you cannot get fresh state, and you need **pass callback function in useState setter** function.</small>

Additional tasks:

- [x] Work through errors from the API (network error, ...);<br/>
      <small>I handle only errors with video/preview load. But if API return error app will not crush.</small>
- [x] Adaptive for the mobile version; <br />
      <small>I make **responsive layout for desktop, tablet and mobile**</small>
- [ ] Video loading animation; <br />
      <small>App has **custom skeletons** for loading all elements</small>
- [ ] The code is covered by tests; <br />
      <small>I think for app of that size it is **redundant**. I think use of **TypeScript** greatly reduce numbers of bugs</small>
