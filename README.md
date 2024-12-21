# Needle Typescript Library

![NPM Version](https://img.shields.io/npm/v/@needle-ai/needle)

This Typescript library provides convenient acccess to Needle API. Using Needle API you can effortlessly develop RAG-based agentic applications, see below for an example. There are various functions and data types which will help you get started quickly. Some functionality will be available in REST API earlier than this library therefore we recommend taking a look the the complete [documentation](https://docs.needle-ai.com). Thank you for flying with us. 🚀

Note: this library is built for Node.js runtime.

## Installation

This library requires Node.js >18 and a Javascript package manager to use (we recommend [bun](https://bun.sh/)). You don't need the sources unless you want to modify it. You can install with:

```sh
npm install @needle-ai/needle
```

or

```sh
bun install @needle-ai/needle
```

or with any other package manager of your choice.

## Usage ⚡️

To get started, generate an API key for your account in developer settings menu at [Needle](https://needle-ai.com). Note that your key will be valid until you revoke it. Set the following env variable before you run your code:

```sh
export NEEDLE_API_KEY=<your-api-key>
```

`NeedleClient` reads the API key from the environment by default. If you like to override this behaviour you can pass it in as a parameter.

### Retrieve context from Needle

```js
import { Needle } from "@needle-ai/needle/v1";

const ndl = new Needle();

const prompt =
  "What techniques moved into adopt in this volume of technology radar?";

const results = await ndl.collections.search({
  collection_id: "<collection-id>",
  text: prompt,
});
```

Needle instantly extracts relevant passages for your prompt from your files. You can look up your collection id in the [Needle dashboard](https://needle-ai.com/dashboard/collections).

### Complete your RAG pipeline

To compose a human friendly answer use an LLM provider of your choice. For the demo, we use OpenAI in this example:

```js
import OpenAI from "openai";
import { type ChatCompletionMessageParam } from "openai/src/resources/index.js";

const openai = new OpenAI();
const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: `
        You are a helpful assistant. Answer the question based on the context.

        Context:

        ${results.map(r => r.content).join('\n')}
    ` },
    { role: "user", content: prompt }
];

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages
});

const answer = completion.choices[0].message.content;
console.log(answer)
// -> Retrieval-Augmented Generation (RAG) is the technique that moved into "Adopt" in this volume of the Technology Radar.
```

This is one basic example of a RAG pipeline you can quickly implement using Needle and OpenAI. Needle API helps you with hassle-free contextualization however does not limit you to a certain RAG technique. You can furthermore add Needle search as a tool to your agentic application to allow LLMs trigger search autonomously.

Let us know what you build in our [Discord channel](https://discord.gg/JzJcHgTyZx). Similarly, if you have a feature request or a bug report, please ping us there - we are happy to help! 😉

# License

`needle-typescript` is distributed under the terms of the MIT license.
