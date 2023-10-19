import React from "react";

const Profile = ({auth})=> {
    return(
        <div className='profileContainer'>
            <h1>Welcome {auth.username}!</h1>
            <h4>How it works:</h4>
            <li>Since we're all about security, we do not track your IP, meaning you're completely annonymous and we'd like to keep it that way.</li>
            <li>Once you place an order, you're going to be prompted for an address. Don't fret! Your address is never saved in our database.</li>
            <li>The delivery time depends on the product but rest assured, you will get your product or your money back guarenteed!</li>
            <img src='assets/img/guarenteed.svg'/>
        </div>
    )
}

export default Profile