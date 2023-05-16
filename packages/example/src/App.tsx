import withHooks, { useState } from "with-hooks";
import React, { useState as useReactState } from 'react'
interface TestProps {
  count: number,
  name: string
}

const Test = withHooks(() => {
  const [a, setA] = useState('abc');
  const [b, setB] = useState('b');
  return (
    <div onClick={() => {
      // @ts-ignore
      setA('aaaa');
    }}>
      {a}
    </div>
  )
})

function App() {
  return (
    <>
      <Test></Test>
    </>
  )
}

export default App
