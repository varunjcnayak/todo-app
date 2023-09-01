import React, { useState } from 'react'
import './DialogComponent.css'

function DialogComponent() {
    const [counter,setCounter] = useState(0);

    const debounce = (func) => {
        let timer;
        return (...args) => {

            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), 300);
        };


    }
    const explode = () => {
        setCounter((prev) => prev+1);
        console.log("click"+counter)
    }
    return (
        <div id="container">
            <div class="container-inner">
                <div class="content">
                    <p>Do you want to Continue?</p>
                </div>
                <div class="buttons">
                    <button type="button" onClick={debounce(explode)} class="confirm">Confirm</button>
                    <button type="button" class="cancel">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DialogComponent