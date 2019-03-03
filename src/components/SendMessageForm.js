import React, { Component } from "react";

class SendMessageForm extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
  }

  _handleChange = event => {
    const newMessage = event.target.value;
    this.setState({
      message: newMessage
    });
  };

  _handleSubmit = event => {
    event.preventDefault();
    const { message } = this.state;
    const { sendMessage } = this.props;
    sendMessage(message);
    this.setState({
      message: ""
    });
  };

  render() {
    const { message } = this.state;
    const { disabled } = this.props;
    return (
      <form className="send-message-form" onSubmit={this._handleSubmit}>
        <input
          disabled={disabled}
          placeholder="Type your message and hit ENTER"
          type="text"
          value={message}
          onChange={this._handleChange}
        />
      </form>
    );
  }
}

export default SendMessageForm;
