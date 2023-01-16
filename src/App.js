import { useEffect, useState } from 'react'
import SingleCard from './component/SingleCard';
import './App.css'

const cardImages = [
  { "src": "/img/potion-1.png" ,matched:false},
  { "src": "/img/ring-1.png",matched:false },
  { "src": "/img/scroll-1.png" ,matched:false},
  { "src": "/img/shield-1.png" ,matched:false},
  { "src": "/img/sword-1.png",matched:false },
  { "src": "/img/helmet-1.png",matched:false },
]

function App() {
  const [card,setCards]=useState([]);
  const [turns,setTurns]=useState(0);
  const [choiceOne,setChoiceOne]=useState(null);
  const [choiceTwo,setChoiceTwo]=useState(null);
  const [disabled,setDisabled]=useState(false);

  //shuffle card
  function shufflecards(){
    const shuffledcards=[...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card,id:Math.random()}))
  
    setCards(shuffledcards);
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
    }

   // handle a choice
   const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
      
        setCards(prevcard=>{
         return prevcard.map(card=>{
          if(card.src===choiceOne.src)
          {
            return {...card,matched:true}
          }
          else{
            return card
          }
         })
        })

        setTimeout(()=>resetTurn(),1000)
      } else {
        console.log('those cards do not match')
        setTimeout(()=>resetTurn(),1000)
      }

    }
  }, [choiceOne, choiceTwo])

  console.log(card)

  //start game 
  useEffect(()=>{
    shufflecards()
  },[])
  
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false);
  }

  

  
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shufflecards}>New Game</button>
      <div className='card-grid'>
        {card.map((card)=>(
          <SingleCard 
          key={card.id}
           card={card}
           handleChoice={handleChoice}
           flipped={card===choiceOne || card===choiceTwo || card.matched}
           disabled={disabled}
           />
        ))}
      </div>
      <div>Turns : {turns}</div>
    </div>
  );
}

export default App
