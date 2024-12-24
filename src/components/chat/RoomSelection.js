"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const RoomSelection = () => {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();

  const handleRoomJoin = () => {
    if (roomName.trim()) {
      router.push(`/chat/${roomName}`);
    }
  };

  return (
    <div>
      <h1>Choose a Chat Room</h1>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Enter room name"
      />
      <button onClick={handleRoomJoin}>Join Room</button>
      <div>
        {/*predefined rooms*/}
        <button onClick={() => router.push("/chat/room1")}>Join Room 1</button>
        <button onClick={() => router.push("/chat/room2")}>Join Room 2</button>
      </div>
    </div>
  );
};

export default RoomSelection;
