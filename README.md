#

This is a clone of an existing tool that I love, "Yet Another Squad Builder", or YASB.
YASB is a "squad builder" for the X-Wing miniatures game by Atomic Mass Games. You can see YASB live here: https://raithos.github.io/ and you can visit its GitHub repository here: https://github.com/raithos/xwing.

This is the front-end's git repository. To see the backend api's codebase , see this repo: https://github.com/keaton-robinson/react-xwing-backend.

# go to live app: https://xwing-front-0819d636876c.herokuapp.com/

This was my first attempt at a non-trivial functioning React application. I made some rookie mistakes in here that I would fix if I rewrote this app. There's some direct mutation of React state in here that needs correcting.

If I were writing this again, here's some changes I would make:

- don't use React class component at all. Use only functional components
- redesign how state is managed to avoid any direct state mutation
- consider using a React context to avoid some prop drilling.
- Use TypeScript from the very beginning
- include unit tests from the beginning. I added a few unit tests here as an exercise, but ran into problems once I started finding direct state mutations.
- focus on having easy dependency injection so that faking test dependencies is possible without fancy Jest tricks

I borrowed a few aeshetic things and a dataset from YASB so that I could focus on the engineering aspects of this project.

What I wrote myself:

- my own React components which implement the core features of YASB
- my own CSS which achieves the same layout and design as YASB
- my own "business logic" to work with YASB's dataset to achieve the requirements of the squad builder
- my own backend service user registration and saving squads for those users (https://github.com/keaton-robinson/react-xwing-backend)

What I borrowed from YASB:

- overall visual design & layout plan (although I reimplemented it with my own CSS)
- images for pictures of Star Wars ships
- fonts for xwing icons
- SVGs for "ship maneuvers" (these show up when you mouse over a ship or pilot, or click them on a mobile device)
- their dataset which contains the statistics for ships, pilots, and upgrades in the X-Wing miniatures game
