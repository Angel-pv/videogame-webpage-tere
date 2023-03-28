import React from 'react'
import { Link } from 'react-router-dom';
import style from './Landing.module.css'

export const Landing = () => {
  return (
    <div className={style.LandingContainer}>
      <link href='https://fonts.googleapis.com/css?family=Press+Start+2P' rel='stylesheet' />
      <h1>WELCOME TO</h1>
      <h2>YOUR GAMING PAGE</h2>


      <Link to='/home'><button>Let's Play</button></Link>

    </div>
  )
}
export default Landing;