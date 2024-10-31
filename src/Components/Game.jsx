import React, { useState } from 'react'
import "../index.css"
import Header from './Header'
import Footer from './Footer'
import Gamecircle from './Gamecircle'
import { getComputerMove, isDraw, isWinner } from '../Helper.js'
import { NO_CIRCLES,GAME_STATE_PLAYING,GAME_STATE_WIN,NO_PLAYER,PLAYER_1,PLAYER_2,GAME_STATE_DRAW } from '../../Constants.js'
const Game = () => {
 
    const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER))
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1)
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

    console.log(gameBoard);


    const initGame = () => {
      setCurrentPlayer(PLAYER_1);
      setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
      setGameState(GAME_STATE_PLAYING);
  }

    const initBoard =()=>{
      const circles = []

      for (let i = 0; i < NO_CIRCLES; i++) {
        circles.push(renderCircle(i))
      }
      return circles
    }

  const circleClicked = (id)=>{

    console.log("circleClicked:" + id);
    if (gameBoard[id] !== NO_PLAYER) return;
    if (gameState !== GAME_STATE_PLAYING) return;

  if (isWinner(gameBoard, id, currentPlayer)) {
    setGameState(GAME_STATE_WIN);
    setWinPlayer(currentPlayer);
    console.log("Winner");

  }
  if (isDraw(gameBoard, id, currentPlayer)) {
    setGameState(GAME_STATE_DRAW);
    setWinPlayer(NO_PLAYER);
    console.log("draw");
    
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
  const onSuggestClick = () => {
    circleClicked(getComputerMove(gameBoard));
}
  const onNewGameClick = () => {
    initGame();
}
  return (
    <>
    <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
    <div className='game'>
     {initBoard()}
    </div>
    <Footer onSuggestClick={onSuggestClick} onNewGameClick={onNewGameClick} gameState={gameState}/>
    <footer className="footerr">
  <p>
      Made by <a href="https://github.com/DvSamM" target="_blank" rel="noopener noreferrer">Dev Sam</a>
  </p>
</footer>
    </>
  )
}

export default Game