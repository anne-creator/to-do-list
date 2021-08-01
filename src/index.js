import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todolist from './Todolist';
// PWA: progressive web application（新版没有）
// 写网页的形式写app应用
// 支持https协议的服务器上，如果访问过一次，即使断网了，还能看见上一次浏览过得网页，因为他会把网页内容存储在broswer里面
// 有一个import registerServiceWorker from './registerServiceWorker';

// 这个是前端性能检测工具，此阶段不需要
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Todolist />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// 此阶段不需要，注释掉
// reportWebVitals();
