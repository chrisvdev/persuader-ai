import * as dotenv from 'dotenv'
import cohere from 'cohere-ai'
// import createCustomError from '../lib/error.js'
dotenv.config()

const CTAPrompt = `
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
action: {action}
phrase: `

const CTAGen = {
  max_tokens: 10,
  temperature: 0.5,
  k: 0,
  p: 1,
  frequency_penalty: 1,
  presence_penalty: 0,
  stop_sequences: ['--'],
  return_likelihoods: 'NONE'
}

const CBPrompt = `
this is a clickbait title generator from given topic.
--
topic: we show an interview with the famous actor Will Smith
title: Will Smith tells us everything!
--  
topic: We show how make a dinner
title: You’ll Never Believe this Simple Method to make a dinner! 
--  
topic: We show 9 methods to get a job
title: 9 methods to get a job That You Need to Know!
--  
topic: we show a best way to invest money
title: This Weird Trick Increased your money outrageously!
--  
topic: we show the effects of don't take care of your health
title: This Is What Happens if You Stop Worrying Too Much about your health
--
topic: we show 7 tools to Boost a Blog Engagement
title: The 7 Best Visual Content Tools to Boost your Blog’s Engagement!
--
topic: we show {topic}
title: `

const CBGen = {
  max_tokens: 20,
  temperature: 0.3,
  k: 0,
  p: 1,
  frequency_penalty: 1,
  presence_penalty: 0,
  stop_sequences: ['--'],
  return_likelihoods: 'NONE'
}

cohere.init(process.env.API_KEY, '2022-12-06')

export async function generateClickbait (topic, quantity) {
  let input = { ...CBGen, prompt: CBPrompt.replace('{topic}', topic) }
  quantity && (input = { ...input, num_generations: quantity })
  try {
    const generated = await cohere.generate(input)
    console.log(generated.body.generations)
    const response = generated.body.generations.map((result) => result.text.split('\n')[0])
    console.log(response)
    return response
  } catch (error) {
    // const ClickbaitError = createCustomError('ClickbaitGenerationError')
    // return new ClickbaitError(error.message)
    return 'error'
  }
}

export async function generateCTA (action, quantity) {
  let input = { ...CTAGen, prompt: CTAPrompt.replace('{action}', action) }
  quantity && (input = { ...input, num_generations: quantity })
  try {
    const generated = await cohere.generate(input)
    console.log(generated.body.generations)
    const response = generated.body.generations.map((result) => result.text.split('\n')[0])
    console.log(response)
    return response
  } catch (error) {
    // const CTAError = createCustomError('CTAGenerationError')
    // return new CTAError(error.message)
    return 'error'
  }
}
