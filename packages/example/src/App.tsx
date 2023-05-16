import withHooks, { useState } from "with-hooks";
import React, { useState as useReactState } from 'react'
interface TestProps {
  count: number,
  name: string
}

const Test = withHooks(() => {
  const [count, setA] = useState({ count: 0 });
  console.log('###', count)
  return (
    <div onClick={() => {
      // @ts-ignore
      setA({count: 7})
    }}>
      {count?.count}
    </div>
  )
});

// class Test2 extends React.Component {
//   constructor(props: any) {
//     super(props)
//     this.state = {
//       count: 0
//     }
//     // @ts-ignore
//     window.setState = this.setState.bind(this)

//   }

//   click = () => {
//     // @ts-ignore
//     window.__current2 = this
//     this.setState({ count: 2 })
//   }

//   render(): React.ReactNode {
//     console.log('###this', this)
//     return <div onClick={this.click}>Test2: {this.state.count}</div>
//   }
// }

function App() {
  return (
    <>
      {/* <Test2></Test2> */}
      <Test></Test>
    </>
  )
}

export default App
