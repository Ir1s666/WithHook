import React from 'react';
import withHooks, { useState, useEffect } from "with-hooks";

const Test = withHooks((props: { name: string }) => {
  const [count, setCount] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);
  const [count3, setCount3] = useState<number>(0);

  useEffect(() => {
    const num = Math.floor(Math.random() * 10)
    setCount2(num);
  }, [count]);

  return (
    <div>
      <div>
        输入框的受控值是effect的依赖项:<input onChange={(e) => {
          const { value } = e.target;
          setCount(Number(value))
        }} />
        state change:{count}
      </div>
      <div>
        输入框的受控值不是effect的依赖项:<input onChange={(e) => {
          const { value } = e.target;
          setCount3(Number(value))
        }} />
        {count3}
      </div>
      <div>
        这个值在effect中被set: {count2}
      </div>
      <div>
        props.name: {props.name}
      </div>
    </div>

  )
});

function App() {
  return (
    <>
      ---组件A---
      <Test name={'jack'} />
    </>
  )
}

export default App
