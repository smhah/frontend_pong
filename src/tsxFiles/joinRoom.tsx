import React, { useState } from 'react'

export default function MessageInput({joinRoom}: {joinRoom:() => void}) {
    const [value, setValue] = useState<string>("")
  return (
    <>
    <div>
        <button onClick={() => joinRoom()}>Join Room</button>
    </div>
    </>
  )
}
