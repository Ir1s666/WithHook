import withHooks, { useState } from "with-hooks";
import React, { useState as useReactState } from 'react';


const Test = withHooks(() => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <input onChange={(e) => {
        const { value } = e.target;
        setCount(Number(value))
      }} />
      {count}
    </div>
  )
});

function App() {
  return (
    <>
      <Test></Test>
    </>
  )
}

export default App
