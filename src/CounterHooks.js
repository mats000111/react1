import { useState } from "react";

const CounterHooks = ({ initialCount }) => {
    const [count, setCount] = useState(initialCount);
    return (
        <div>
            <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
            <span>{count}</span>
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
        </div>
    )
}

export default CounterHooks;