[](https://persuaderai.christianvillegas.com/)

# Persuader.ai

## What is this?

The Persuader.ai is a tool designed to assist content creators in the creation of persuasive clickbait titles and Call-to-Action (CTA) phrases. It aims to inspire content creators and encourage the consumption of their content by potential viewers, readers, listeners, and customers.  
  
The tool can be utilized as is or integrated through its API for automated content publishing. For those seeking greater independence, the source code can be obtained from the  [github repository](https://github.com/chrisvill2312/persuader-ai)  for deployment on personal systems.

(This tool was created as part of the applications created for the  [Midudev's AI Hackaton constest](https://github.com/topics/midudev-cohere-2023))

## Persuader.ai's API

The endpoints of this API are:  
(Using https://persuaderai.christianvillegas.com/ as a base URL)

A POST to "/api/clickbait" generate clickbait titles.  
A POST to "/api/cta" generate Call-to-Action (CTA) phrases.

You need to give the prompt and quantity in a JSON on the body of the HTTP request on both of the endpoint, someting like this:

      {
        "input":"the result of being a bad person", 
        "quantity": 2
      }
    

As a result the server gives you JSON with an array of strigs like this:

      [
        "This Is What Happens When You Are A Bad Person", 
        "This Is What Happens If You Are A Bad Person"
      ]
