import React, { useState, useEffect } from "react";
import useClickbait from "../hooks/clickbait";

function Ai() {
  const [userInput, AIResponse, setInput] = useClickbait();
  const [toSubmit, setSubmit] = useState({ clickbaitInput: "", quantity: 1 });
  const inputRef = React.createRef();
  const eventHandler = (e) => {
    let modification = {};
    if (e.target.name === "quantity") {
      if (parseInt(e.target.value) < 1) modification = { [e.target.name]: 1 };
      if (parseInt(e.target.value) > 5) modification = { [e.target.name]: 5 };
      if (!modification.quantity)
        modification = { [e.target.name]: e.target.value };
    } else modification = { [e.target.name]: e.target.value };
    
    /*
    e.target.name === "quantity"
      ? parseInt(e.target.value) < 1
        ? { quantity: 1 }
        : { quantity: parseInt(e.target.value) }
      : { [e.target.name]: e.target.value };
     PirxJ me salvo en esta linea de una quemada de cabeza (cosas de stream) */ // Para el recuerdo del stream de Twitch

    setSubmit((state) => ({ ...state, ...modification }));
  };
  const runSubmit = (e) => {
    e.preventDefault();
    setInput(toSubmit.clickbaitInput, toSubmit.quantity);
  };
  useEffect(() => {
    console.log(toSubmit);
  }, [toSubmit]);

  return (
    <>
      <h1 className="flex text-xl mb-4">{userInput.input}</h1>
      <h2 className="flex text-lg mb-4">{userInput.quantity}</h2>
      <div className="flex flex-col">
        {AIResponse.map((response, i) => (
          <p className="mb-4" key={`ai-response_${i}`}>
            {response}
          </p>
        ))}
      </div>
      <form className="flex flex-col" onSubmit={runSubmit}>
        <input
          className="mb-4"
          type="text"
          name="clickbaitInput"
          placeholder="how to learn a programing language"
          value={toSubmit.clickbaitInput}
          onChange={eventHandler}
        />
        <input
          className="mb-4"
          type="number"
          name="quantity"
          placeholder="1"
          value={toSubmit.quantity}
          onChange={eventHandler}
        />
        <input type="submit" value="" />
      </form>
    </>
  );
}

export default Ai;
