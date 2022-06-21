import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

import { ContextHolder } from "@frontegg/rest-api";
import { AdminPortal, useAuth, useLoginWithRedirect } from "@frontegg/react";

const cardImages = [
  { src: "https://i.imgur.com/z9zX4R8.png", matched: false },
  { src: "https://i.imgur.com/Dd5cMfu.jpeg", matched: false },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAG1romgALD8jd8VhydoLm9Znh22Re7w0eKA&usqp=CAU",
    matched: false,
  },
  { src: "https://i.imgur.com/CtvriZJ.png", matched: false },
  {
    src: "https://i.imgur.com/npe1pig.jpeg",
    matched: false,
  },
  { src: "https://i.imgur.com/xKA9AId.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     loginWithRedirect();
  //   }
  // }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const handleClick = () => {
    AdminPortal.show();
  };

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 800);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choice and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.key}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      <hr />
      <div>
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>Signin</button>
        ) : (
          <div>
            <div>
              <img src={user?.profilePictureUrl} alt={user?.name} />
            </div>
            <div className="detail">
              <span className="heading">{user?.name}</span>
            </div>
            <br />
            <div>
              <button onClick={() => logout()} className="button">
                Logout
              </button>

              {/* <button onClick={() => handleClick()} className="button">
                View full Profile
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
