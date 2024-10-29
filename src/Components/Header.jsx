import React from 'react'
import "../index.css"
const Header = ({player}) => {
  return (
    <div className='panel header'>
        <div className='header-text'>
            PLAYER {player} WINS
        </div>
    </div>
  )
}

export default Header