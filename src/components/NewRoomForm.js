import React, { Component } from "react";

class NewRoomForm extends Component {
  constructor() {
    super();
    this.state = {
      roomName: ""
    };
  }

  _handleChange = event => {
    this.setState({
      roomName: event.target.value
    });
  };

  _handleSubmit = event => {
    const { roomName } = this.state;
    const { createRoom } = this.props;
    event.preventDefault();
    createRoom(roomName);
    this.setState({
      roomName: ""
    });
  };

  render() {
    const { roomName } = this.state;
    return (
      <div className="new-room-form">
        <form onSubmit={this._handleSubmit}>
          <input
            type="text"
            placeholder="Create a Room"
            required
            value={roomName}
            onChange={this._handleChange}
          />
          <button id="create-room-btn" type="submit">
            +
          </button>
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
