import withHooks, { useState } from "with-hooks";

const Test = withHooks((props: { name: string }) => {
  const [count, setCount] = useState<number>(0);
  const [coun2t, setCount2] = useState<number>(1);

  return (
    <div>
      <div>
        <input onChange={(e) => {
          const { value } = e.target;
          setCount(Number(value))
        }} />
        {count}
      </div>
      <div>
        <input onChange={(e) => {
          const { value } = e.target;
          setCount2(Number(value))
        }} />
        {coun2t}
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
      ---组件B---
      <Test name={'tom'} />
    </>
  )
}

export default App
