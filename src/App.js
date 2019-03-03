import React, { Component } from "react";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import RoomList from "./components/RoomList";
import NewRoomForm from "./components/NewRoomForm";
import { tokenUrl, instanceLocator } from "./config";

class App extends Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };
  }

  componentDidMount() {
    const tokenProvider = new TokenProvider({
      url: tokenUrl
    });

    const chatManager = new ChatManager({
      instanceLocator,
      userId: "heungdo" /** swap out */,
      tokenProvider
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;

        this._getRooms();
      })
      .catch(err => console.log("error on connecting: ", err));
  }

  _getRooms = () => {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => console.log("error on joinableRooms: ", err));
  };

  _subscribeToRoom = roomId => {
    this.setState({
      messages: []
    });

    this.currentUser
      .subscribeToRoom({
        roomId,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id
        });
        this._getRooms();
      })
      .catch(err => console.log("error on subscribing to room: ", err));
  };

  _sendMessage = text => {
    const { roomId } = this.state;
    this.currentUser.sendMessage({
      text,
      roomId: roomId
    });
  };

  _createRoom = name => {
    this.currentUser
      .createRoom({
        name
      })
      .then(room => this._subscribeToRoom(room.id))
      .catch(err => console.log("error with createRoom: ", err));
  };

  render() {
    const { roomId, messages, joinableRooms, joinedRooms } = this.state;
    return (
      <div className="app">
        <RoomList
          roomId={roomId}
          rooms={[...joinableRooms, ...joinedRooms]}
          subscribeToRoom={this._subscribeToRoom}
        />
        <MessageList roomId={roomId} messages={messages} />
        <SendMessageForm disabled={!roomId} sendMessage={this._sendMessage} />
        <NewRoomForm createRoom={this._createRoom} />
      </div>
    );
  }
}

export default App;
