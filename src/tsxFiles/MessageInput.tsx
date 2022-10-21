import React, { useState } from 'react'

export default function MessageInput({send}: {send:(val:string)=> void}, {sendSocket}: {sendSocket:() => void}) {
    const [value, setValue] = useState<string>("")
  return (
    <>
    <div>
        <input
        onChange={(e) => setValue(e.target.value)} 
        placeholder='Type ur message ...' value = {value} />
        <button onClick={() => send(value)}>Send</button>
    </div>
    </>
  )
}
