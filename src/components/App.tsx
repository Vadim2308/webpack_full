import {FC, useState} from 'react';
import './App.scss'
export const App: FC = () => {
    const [count,setCount] = useState(0)
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={()=>setCount(p=>p+1)}>Increment</button>
        </div>
    );
};