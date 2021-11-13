import React from "react";

function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleCkick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : "card2"}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="https://i.imgur.com/OClDkeQ.jpeg"
          alt="card back"
          onClick={handleCkick}
        />
      </div>
    </div>
  );
}

export default SingleCard;
