import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    // 为了优化性能，原因不敏
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    const { content } = this.props;
    return (
      <div
        key={this.props.index}
        // 子组件接收父组件传值后，不自己建立方法再使用也可以，可以直接用父组件传来的防范
        // 接受参数要用立即执行函数
        // onClick={() => this.props.deleteItem(this.props.index).bind(this)}
        onClick={this.handleClick}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    );
  }
  handleClick() {
    const { deleteItem, index } = this.props;
    deleteItem(index);
  }
}
TodoItem.propTypes = {
  test: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  deleteItem: PropTypes.func,
  index: PropTypes.number,
};
TodoItem.defaultProps = {
  test: 'Hello World',
};

export default TodoItem;
