import React from 'react'

const Home = () => {
    return(
        <div>
            <div className="center-align">Welcome</div>
            <button onClick={()=> console.log('Clicked!!!!')}>Press me!</button>
        </div>
    )
}

export default {
    component: Home
};