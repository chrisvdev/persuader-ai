import { useState, useEffect } from "react";
import axios from "axios"

export default function useClickbait(input = "how to learn a programing language", quantity = 1) {
    const [userInput, setUserInput] = useState({ input, quantity })
    const [AIResponse, setAIResponse] = useState([])
    useEffect(() => {
        const config = {
            url: 'http://localhost:10002/api/clickbait',  //document.location.origin
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