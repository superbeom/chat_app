import React, { Component } from "react";

class RoomList extends Component {
  render() {
    const { roomId, rooms, subscribeToRoom } = this.props;
    const orderedRooms = rooms.sort((a, b) => a.id - b.id);
    return (
      <div className="rooms-list">
        <h3>Your Rooms:</h3>
        <ul>
          {orderedRooms.map(room => {
            return (
              <li
                key={room.id}
                className={"room " + `${roomId === room.id ? "active" : null}`}
              >
                <a href="#" onClick={() => subscribeToRoom(room.id)}>
                  # {room.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RoomList;
