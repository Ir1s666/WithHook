import withHooks, { useState, useEffect, useMemo } from "with-hooks";

const Son = withHooks((props: { name: string }) => {
  const [depCount, setDepCount] = useState<number>(0);
  const [norCount, setNorCount] = useState<number>(0);
  const [count, setCount] = useState<number>(() => 0);
  const memoName = useMemo<string>(() => {
    return props.name + '-memo'
  }, [props.name]);

  useEffect(() => {
    // const num = Math.random() * 10
    // setCount(num);
    // setCount(Math.random());
    setCount((prev) => {
      return prev + 1;
    })
    return () => {
      console.log('注销')
    }
  }, [depCount, props.name]);

  return (
    <div>
      <div>
        输入框的受控值是effect的依赖项:<input onChange={(e) => {
          const { value } = e.target;
          setDepCount(Number(value))
        }} />
        state change:{depCount}
      </div>
      <div>
        输入框的受控值不是effect的依赖项:<input onChange={(e) => {
          const { value } = e.target;
          setNorCount(Number(value))
        }} />
        {norCount}
      </div>
      <div>
        这个值在effect中被set: {count}
      </div>
      <div>
        子组件props.name: {props.name}
      </div>
      <div>
        memoName: {memoName}
      </div>
    </div>

  )
});

let i = 0;
const nameMap = ['tom', 'lily', 'jack', ' bill'];
const Father = withHooks(() => {
  const [fatherName, setName] = useState('jack');

  return <>
    <div onClick={() => setName(nameMap[i++])}>
      父组件name: {fatherName}
    </div>
    <Son name={(function () {
      return fatherName
    })()} />
  </>
})

function App() {
  return (
    <Father />
  )
}

export default App
