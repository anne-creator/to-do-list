// Todolist: input框与数据绑定事件，add button功能，

// 全局css 引入方法，容易污染全局，谨慎使用

// 新版函数组件方法：现在用的是函数组件
// function App() {
//   return (
//     <div className="App">
//       hello world
//     </div>
//   );
// }

// 类组件方法
import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
// 样式放在所有组件的最后面
import './App.css';

class TodoList extends Component {
  // 最优先被执行的函数，接受props参数
  constructor(props) {
    // 调用父类构造函数
    super(props);
    // 定义数据：
    this.state = {
      inputValue: '',
      list: ['learn react', 'learn JS', 'learn TypeScript'],
    };
    // 把绑定统一放在constructor里面的，优化性能
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }

  render() {
    return (
      // return（）里面的JSX，外层必须有一个包裹元素.但是又不想他显示，用哪Fragment占位符，类似vue template
      <Fragment>
        {/* 绑定状态的数据 */}
        <input
          value={this.state.inputValue}
          // input value state里的数据
          // 用bind因为bind不会立即执行函数，而call和apply会在没有点击的时候就执行这个函数。
          // 为什么这个正是绑定是undefined呢？
          onChange={this.handleInputChange}
        ></input>
        <button onClick={this.handleBtnClick}>Submit</button>
        <ul>{this.getTodoItem()}</ul>
      </Fragment>
    );
  }
  handleInputChange(e) {
    // 【1.e.target指向
    // e.target is input dom 元素
    // 【2.函数的this指向
    // 会报错：this.state未被定义。此时this不指向class，而是undefined。
    // 为何是undefined：https://zhuanlan.zhihu.com/p/37911534
    // React 为严格模式，那么没有显式的使用调用者的情况下，this 不会自动绑定到全局对象上。handleClick 函数实际上会作为回调函数，传入 addEventListener() ，此时并没有被显示调用。这就是为什么你在 React 的组件中添加事件处理函数为什么会得到 undefined 而不是全局对象或者别的什么东西。
    // 需要再绑定此方法时候用bind()改变this的指向为原class
    // this.state.inputValue = e.target.value;
    // 【3.setState()方法改变state数据
    this.setState({ inputValue: e.target.value });
  }
  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <div key={this.props.item}>
          {/* // 传递参数：bind多传递一个index下标值 
        // 【？？？】什么时候{},{{}}
        // 需要往TodoItem里面传入item和index的值 */}
          <TodoItem
            content={item}
            index={index}
            // 传递给子组件的方法的this必须指向父组件
            deleteItem={this.handleItemDelete}
          />
        </div>
      );
    });
  }
  handleBtnClick() {
    // [3]ES6箭头函数可以用（） 来代替返回值
    // preSate：修改之前的数据，等价于this.state，更靠谱，避免不小心改变state的状态
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: '',
    }));

    // [2]新版setState：接受一个函数而不光是对象。函数有一个返回值，return 待修改的对象
    // this.setState(() => {
    //   return {
    //     list: [...this.state.list, this.state.inputValue],
    //     inputValue: '',
    //   };
    // });

    //[1]setState 写法演变
    // ...展开运算符：把以前内容全部展开，生成新的数组
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: '',
    // });
  }
  handleItemDelete(index) {
    // copy list 给一个新数组
    const list = [...this.state.list];
    // 不推荐直接在list上splice，再用setState，因为list有一个immutable的概念
    // state 不要直接修改statede 内容，影响后面性能优化
    list.splice(index, 1);
    this.setState(() => ({
      list,
    }));
    // this.setState({ list: list });
  }
  // tryout() {
  //   console.log(this);
  //   console.log('show tryout');
  // }
  // this.tryout();
}

export default TodoList;
