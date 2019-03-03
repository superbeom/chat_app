import React, { Component } from "react";
import ReactDom from "react-dom";
import Message from "./Message";

class MessageList extends Component {
  componentWillUpdate() {
    const node = ReactDom.findDOMNode(this);
    this.shouldScrollToBottom =
      node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDom.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    const { roomId, messages } = this.props;
    if (!roomId) {
      return (
        <div className="message-list">
          <div className="join-room">&larr; Join a room!</div>
        </div>
      );
    }
    return (
      <div className="message-list">
        {messages.map(message => (
          <Message
            key={message.id}
            username={message.senderId}
            text={message.text}
          />
        ))}
      </div>
    );
  }
}

export default MessageList;
