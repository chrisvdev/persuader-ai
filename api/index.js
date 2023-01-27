import * as dotenv from 'dotenv'
import cohere from 'cohere-ai'
dotenv.config()

const prompt = `
this is a call to action phrase generator from given action.
--
action: click the button
phrase: Click this now!
--  
action: watch a new video
phrase: Enjoy the new awesome video! 
--  
action: enter in the stream
phrase: Get in the Stream and let's have some fun!
--  
action: hear the podcast
phrase: Let's listen to this podcast!
--  
action: don't wait 
phrase: what are you waiting for?
--
action: hurry 
phrase: don't loose the time!
--
action: watch
phrase:`

cohere.init(process.env.API_KEY, '2022-12-06')
const response = await cohere.generate({
  prompt,
  max_tokens: 10,
  temperature: 0.3,
  k: 0,
  p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  stop_sequences: ['--'],
  return_likelihoods: 'NONE'
})
console.log(response.body.generations)
