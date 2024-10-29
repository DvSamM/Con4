import React, { useState } from 'react'
import "../index.css"
import Header from './Header'
import Footer from './Footer'
import Gamecircle from './Gamecircle'
import { isWinner } from '../Helper.js'

const Game = () => {
  const NO_PLAYER = 0
  const PLAYER_1 = 1
  const PLAYER_2 = 2
  const NO_CIRCLES = 16
    const [gameBoard, setGameBoard] = useState(Array(16).fill(NO_PLAYER))
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1)
    console.log(gameBoard);

    const initBoard =()=>{
      const circles = []

      for (let i = 0; i < NO_CIRCLES; i++) {
        circles.push(renderCircle(i))
      }
      return circles
    }

  const circleClicked = (id)=>{
    console.log("circleClicked:" + id);

  if (isWinner(gameBoard, id, currentPlayer)) {
    console.log("Winner");

  }
    setGameBoard(prev => {
      return prev.map((circle, index)=>{
        if (index === id)  return currentPlayer
          return circle
        
      })
    })

    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    console.log(currentPlayer);
  }
  
  const renderCircle = (id) =>{
   return <Gamecircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked}/> 

  }

  return (
    <>
    <Header player={currentPlayer}/>
    <div className='game'>
     {initBoard()}
    </div>
    <Footer/>
    </>
  )
}

export default Game