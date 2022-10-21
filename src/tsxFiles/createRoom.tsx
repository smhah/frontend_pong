import React, { useState } from 'react'

export default function MessageInput({createRoom}: {createRoom:() => void}) {
    const [value, setValue] = useState<string>("")
  return (
    <>
    <div>
        <button onClick={() => createRoom()}>Create Room</button>
    </div>
    </>
  )
}
