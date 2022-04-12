import React, { useState } from "react";

export default function CounterModal(props) {
    const [count, setCount] = useState(0);

    return ( 
        <div>
            {`Count: ${count} `}
            <button onClick={() => setCount(count + 1)}>increment</button>
        </div>
     );
}


// export default class CounterModal extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { count: 0 };
//     }

//     render() {
//         return ( 
//             <div>
//                 {`Count: ${this.state.count} `}
//                 <button onClick={() => this.setState({ count: this.state.count + 1})}>increment</button>
//             </div>
//          );
//     }
// }