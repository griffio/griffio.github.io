---
layout: post
title: Using Claude Code for agent driven Web Browser games
category: blog
tags: [claude games] 
published: true
summary: Claude Code agent web browser games webgpu 
---

# Building Browser Games with Claude Code

Over the past few weeks I've been building web browser games of varying complexity with Claude Code just driving it with suggestions and asking questions, plus a handful of other LLM services for images and audio. The results so far are in these repos:

These vary complexity but most are created from an initial LLM generated plan, rather than `one-shotted` from a single prompt:

- [pixel-ops-games](https://github.com/griffio/pixel-ops-games)
- [fa18-game](https://github.com/griffio/fa18-game)
- [mech-command-web](https://github.com/griffio/mech-command-web)
- [www2-scramble](https://github.com/griffio/www2-scramble)
- [dreadnought-game](https://github.com/griffio/dreadnought-game)
- [proceed-to-the-helicopter-game](https://github.com/griffio/proceed-to-the-helicopter-game)
- [www2-pacific-battle-of-tarawa-atoll](https://github.com/griffio/www2-pacific-battle-of-tarawa-atoll)
- [dungeon-mania](https://github.com/griffio/dungeon-mania)
- A playable build: [Tank Game: Steel Storm](https://griffio.github.io/tank-game-steel-storm/)

## Starting prompt

I begin with a general prompt to Claude Opus at `xhigh` effort, something like:

> Create a Web Browser game using WebGPU targeting Desktop with keyboard and mouse, iPad with touch and game controller support. Don't use any third party dependencies.

I can swap WebGPU for canvas for 2D graphics, or WebGL if I'm targeting older browsers. The second part is the actual game idea, which can be as simple or as adventurous as I like. With experience, I've found a complex game can take over a week to grow from its basic premise to something with real depth. With `thinking` LLMs, you can also add blunt encouragements like *Really impress me* or *Make this game really polished*, Claude will just keep going, because that's in the nature of generative AI.

## Graphics

Claude can render 2D or 3D, but can't produce models such as Blender produces, something like https://www.meshy.ai/ would have be put into the development cycle. It can't generate 3D model files directly in same way that LLMs can't current produce binary files, they produce text such as code. Instead, it needs a library that builds sprites or 3D models, such as voxels. It knows how to call an API to create a plane, a tank or a prop like a house. It can also write its own graphics library, and I can then prompt it to generate code that creates the model I want.

In pixel-ops-games, for example, Claude came up with an idea where each unit is built in code from a handful of helpers: `box(width, height, depth, material, x, y, z, parent)` places a named-material box, and `wheel`, `ring` and `mesh` do the rest. Claude writes models as lists of these calls, with comments describing what each part is. This is an abridged excerpt of how it builds the cargo truck (`supply` switches between the plain truck and the supply truck with its curtains rolled up over the load):

```js
// Reference look: 6x6 cargo truck in tri-colour camo. Square cab with a split windscreen, grille, mirrors on arms,
// a roof antenna and a louvred air intake behind the door; a spare wheel behind the cab; a drop-side bed under a
// canvas cover on hoops. The supply truck rolls its side curtains up over its load; a plain truck keeps them down.
function truck(supply) {
  const g = group(); const p = { wheels: [], steer: [] };
  box(1.3, 0.35, 6.6, 'metal', 0, 0.8, -0.2, g);                                   // chassis rails
  box(2.4, 1.35, 2.05, 'camo', 0, 1.65, 2.32, g);                                  // lower cab and hood
  box(2.4, 0.7, 1.8, 'camo', 0, 2.68, 2.2, g);                                     // glasshouse
  box(1.6, 0.7, 0.06, 'grille', 0, 1.62, 3.36, g);                                 // grille
  for (let i = 0; i < 4; i++) box(1.6, 0.05, 0.04, 'camo', 0, 1.36 + i * 0.17, 3.4, g);   // grille bars
  for (const s of [-1, 1]) {
    box(0.98, 0.52, 0.06, 'glass', s * 0.55, 2.7, 3.11, g);                        // split windscreen
    box(0.3, 0.22, 0.06, 'headlight', s * 0.95, 2.05, 3.37, g);                    // headlight
    box(0.06, 0.5, 0.26, 'metal', s * 1.45, 2.65, 2.95, g);                        // mirror on its arm
    box(0.14, 0.2, 0.06, 'navRed', s * 1.1, 1.3, -3.69, g);                        // tail light
  }
  box(0.05, 1.5, 0.05, 'metal', 0.7, 3.9, 2.8, g);                                 // antenna
  wheel(0.55, 0.38, -0.35, 2.45, 1.05, g);                                         // spare wheel
  // ... drop-side bed, tailgate, headboard, canvas cover on five hoops ...
  if (supply) {
    for (const s of [-1, 1]) box(0.16, 0.24, 4.45, 'tarp', s * 1.3, 3.48, -1.4, g);  // curtains rolled up
    // ... crates, cases, jerry cans and drums stacked on the bed ...
  } else {
    for (const s of [-1, 1]) box(0.06, 1.6, 4.45, 'tarp', s * 1.27, 2.8, -1.4, g);   // curtains down
  }
  for (const z of [2.3, -1.25, -2.5]) for (const x of [-1.12, 1.12]) {
    const w = wheel(0.62, 0.5, x, 0.62, z, g); p.wheels.push(w); if (z > 0) p.steer.push(w);
  }
  p.ring = ring(3.4, g);
  return { group: g, parts: p, height: 4, radius: 2.2 };
}
```

The wheels are collected into `parts` so the game can spin them, and the front ones can steer. The same code-built models are then voxelised into MagicaVoxel `.vox` files, which the game loads at runtime and which can be edited by hand and re-exported.

## Planning and milestones

For anything beyond the simplest game, I let Claude write a plan first. It will often ask me to make some choices. Then I start the first milestone, and there can be more than half a dozen.

## Adding images and audio

I can also give Claude API keys for other models:

- **Google Gemini** for images and terrains
- **ElevenLabs** for sound effects and voices (the free tier is a one-shot token limit)
- **Cloudflare AI** for editing images with FLUX.2 Klein (the free tier has daily limits)
- Public or free-use sound effect libraries

## Tests and review

On the high-thinking models, Claude loves to build simulations and tests to check the game engine works. As a game grows, those tests take longer, because they run headless games to check balance.

Using Claude Fable results in the model taking it's job very seriously:

Verification:- the image below is a spectrogram of the game's own audio, recorded while driving through the gears. The overlaid lines are the V8 orders expected from the game's RPM, and the recorded harmonics follow them through each pull, shift and lift-off. The tyre squeal and burnout show up in the 1–2 kHz band.
![Engin Audio](https://github.com/griffio/redline-city-sandbox/blob/main/docs/screenshots/engine-audio.jpg
)

Sea and sky:- A JONSWAP spectrum drives three FFT cascades in compute shaders, with foam, glitter and wakes that persist and advect; a Hillaire atmosphere with clouds; a real horizon with the earth's curvature, so distant ships appear mast-first. The sea's grid is drawn only in the arc the camera can see.
![Sea and Sky](https://github.com/griffio/dreadnought-game/blob/master/docs/screenshots/sea-golden-hour.jpg)
Once the first version or important milestones completed, my next prompt is: *Review the code and fix any bugs or optimisations*. Claude doesn't write perfect code, so I run several reviews and bug sweeps as the game progresses.

## Using LLMs inside a game

In pixel-ops-games, an LLM acts as a commander for each CPU side, not as a player. About every 20 seconds of match time, or sooner when a location changes hands or an APC is lost, it receives a compact JSON digest of the battle. It replies with a structured plan covering the next objective, which places to hold, how many squads to commit, its posture, what the engineers build, vehicle transport, and jobs for individual squads and vehicles. The game validates every field, discards anything illegal and carries out the orders with its existing CPU code. If the model is slow, down or talking nonsense, the side simply keeps playing on its own planner. The commander runs through a Cloudflare Worker and AI Gateway, which logs every call with cost and timing and keeps API keys out of the browser. It defaults to Llama 3.3 70B, and Claude Haiku, Sonnet and Opus 5.5 are selectable with a URL parameter such as `?model=opus:high`. A match costs a few cents on Haiku, about $1 on Sonnet and about $2 on Opus. Cloudflare's [Clef](https://developers.cloudflare.com/ai/models/%40cf/cloudflare/clef/) model, a 27B multimodal decision model that returns a probability for every option of a typed question rather than generating free text, works alongside the commander as an analyst. Once a minute it reads how the enemy has been fighting, as a turtle, rusher, flanker or something else, and suggests a counter-persona, which a Claude commander sees in its digest. Every few seconds it also watches whether the current plan is working, and two bad reads in a row prompt the commander for a fresh plan within seconds. Honestly, the model mostly picks what the hand-coded planner would have, with better-sounding reasons. The value is in the architecture: the levers exist, every decision is logged, and a stronger model can drop in without touching the game.
