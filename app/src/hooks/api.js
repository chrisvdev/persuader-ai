import { useState, useEffect } from "react";
import axios from "axios"

export const [CB,CTA]=['clickbait','cta']

export default function useAPI(input = "how to learn a programing language", quantity = 1, mode = CB ) {
    const [userInput, setUserInput] = useState({ input, quantity })
    const [AIResponse, setAIResponse] = useState([])
    useEffect(() => {
        const config = {
            url: `http://localhost:10002/api/${mode}`,  // to be replaced with `${document.location.origin}/api/${mode}` on build
            method: 'POST',
            data: {
                input: userInput.input,
                quantity: userInput.quantity
            }
        }
        console.log('entro')
        console.log(config)
        axios(config)
            .then(response => {
                console.log(response.data)
                setAIResponse(response.data)
            })
            .catch(
                error => console.error(error)
            )
    }, [userInput])
    const setInput = (input, quantity) => { quantity ? setUserInput({ input, quantity }) : setUserInput((state) => ({ ...state, input })) }
    return [userInput, AIResponse, setInput]
}