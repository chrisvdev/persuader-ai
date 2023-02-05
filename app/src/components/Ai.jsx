import React, { useState, useEffect } from "react";
import useAPI, { CB, CTA } from "../hooks/api.js";
import Response from "./Response.jsx";
import { LeapFrog } from "@uiball/loaders";

function Ai(props) {
  const { mode } = props;
  const [input, quantity] =
    mode === CB
      ? ["how to learn a programing language", 1]
      : ["Like this video", 1];
  const [userInput, AIResponse, setInput] = useAPI(input, quantity, mode);
  console.log(AIResponse);
  const [toSubmit, setSubmit] = useState({ clickbaitInput: "", quantity: 1 });
  const inputRef = React.createRef();
  const eventHandler = (e) => {
    let modification = {};
    if (e.target.name === "quantity") {
      if (parseInt(e.target.value) < 1) modification = { [e.target.name]: 1 };
      if (parseInt(e.target.value) > 5) modification = { [e.target.name]: 5 };
      if (!modification.quantity)
        modification = { [e.target.name]: parseInt(e.target.value) };
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
      <article
        className="flex flex-col items-center border rounded p-6 border-amber-600 bg-gradient-to-br from-indigo-800 via-indigo-700 to-indigo-900"
        style={{ minWidth: "75vw" }}
      >
        <h2 className="text-3xl mb-6 font-semibold text-orange-400">{`${
          mode === CTA ? "CTA" : "Clickbait"
        } generator`}</h2>
        <form className="flex flex-col" onSubmit={runSubmit}>
          <label className="mb-2 text-center">
            {mode === CTA
              ? "Put what you want the consumer to do"
              : "Put what your content is going to show to the consumer"}
          </label>
          <div className="flex mb-2">
            <label className="w-24 mt-1">{`${
              mode === CTA ? "What do:" : "We show:"
            }`}</label>
            <input
              className="bg-indigo-900 w-full px-2 py-1 rounded"
              type="text"
              name="clickbaitInput"
              placeholder={userInput.input}
              value={toSubmit.clickbaitInput}
              onChange={eventHandler}
            />
          </div>
          <div>
            <label>
              {`Quantity of ${mode === CTA ? "CTA" : "Clickbait"}s:`}{" "}
            </label>
            <input
              className="mb-4 bg-indigo-900 px-2 py-1 w-12 rounded"
              type="number"
              name="quantity"
              placeholder="1"
              value={toSubmit.quantity}
              onChange={eventHandler}
            />
          </div>
          <button
            type="submit"
            className="flex py-1 px-2 my-1 mx-auto border rounded border-amber-600 hover:border-amber-400 hover:scale-105 hover:bg-indigo-700 active:scale-95 active:border-amber-200 active:bg-indigo-500 sm:text-xl w-fit transition-all"
          >
            Submit
          </button>
        </form>
      </article>
      <article className="flex my-10 flex-col">
        {AIResponse.length > 0 ? (
          AIResponse.map((response, i) => (
            <Response response={response} i={i} />
          ))
        ) : (
          <p
            title="Click this to copy on clipboard!"
            className="flex py-2 px-4 my-1 mx-2 border rounded border-amber-600 hover:border-amber-400 hover:scale-105 hover:bg-indigo-700 active:scale-95 active:border-amber-200 active:bg-indigo-500 sm:text-xl transition-all"
          >
            Loading results{" "}
            <div className="relative top-2 left-1">
              <LeapFrog size={20} speed={2.5} color="#fafafa" />
            </div>
          </p>
        )}
      </article>
    </>
  );
}

export default Ai;
