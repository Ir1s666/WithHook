import withHooks, { useState } from "with-hooks";
import React, { useState as useReactState } from 'react';

const Test = withHooks(() => {
  const [counter, setA] = useState<number>(0);

  return (
    <div>
      <input onChange={(e) => {
        const { value } = e.target;
        setA(Number(value))
      }} />
      {counter}
    </div>
  )
});

function App() {
  return (
    <>
      {/* <Test2></Test2> */}
      <Test></Test>
    </>
  )
}

export default App
