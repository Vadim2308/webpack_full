import React, {FC, useState} from 'react';
import classes from './App.module.scss'
import {Link, Outlet} from "react-router-dom";
import AvatarPng from '@/assets/avatar.png'
import AvatarJpg from '@/assets/avatar.jpg'
import AvatarSVG from '@/assets/app-image.svg'

export const App: FC = () => {
    const [count,setCount] = useState(4)
    return (
        <div data-testid='App' className={classes.w}>
            <h1 data-testid='Platform'>Platform: {__PLATFORM__}</h1>
            <h2>Текущий билд: {__ENV__}</h2>
            <div>
                <img width={100} height={100} src={AvatarPng} alt=""/>
                <img width={100} height={100} src={AvatarJpg} alt=""/>
                <AvatarSVG style={{color:"green"}} width={50} height={50} />
            </div>
            <Link to='/about'>About</Link>
            <br/>
            <Link to='/shop'>Shop</Link>
            <h1>{count}</h1>
            <button className={classes.button} onClick={()=>{
                setCount(p=>p+1)
            }}>Increment</button>
            <Outlet/>
        </div>
    );
};