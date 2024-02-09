# A fun practice and portfolio project
This is my reimplementation of an existing tool, "Yet Another Squad Builder", or YASB. 
YASB is a "squad builder" for the X-Wing miniatures game by Atomic Mass Games. You can see YASB live here: https://raithos.github.io/ and you can visit its GitHub repository here: https://github.com/raithos/xwing.

This is the front-end repository. To see the backend api, see this repo: https://github.com/keaton-robinson/react-xwing-backend.

# go to live app: https://xwing-frontend-b447ae4d8786.herokuapp.com/

This was my first attempt at a non-trivial functioning React application. I originally wrote it in 2022 after learning the basics of React, and it helped me get a job using React. 
Looking at the code again, I have noticed some rookie mistakes I made. I have some direct state mutation in here that could use fixing. I didn't get very comfortable with functional components and hooks
until after working on this project for a while.

If I were writing this again in 2024, here's some changes I would make:
- don't use React class component at all. Use functional components
- redesign how state is managed to ensure avoiding any direct state mutation
   - consider using a context / provider to share some state or maybe look into Redux?
   - probably use a context / provider to avoid some prop drilling.
   - look for opportunities to use useMemo rather than useState for derived state (thinking of filtered dropdowns in particular) 
- Use TypeScript from the very beginning. I did add TypeScript and start adding type annotations to some things here though.
- include unit tests from the beginning. I added a few unit tests here as an exercise.
   - and avoid direct dependencies. Use dependency injection so that faking test dependencies is possible without fancy Jest tricks
- I suppose the data layer is a bit trivial still, since I just bundle the data with the application code at the moment. I might consider separating that out to practice a more realistic scenario. 

I borrowed a few aeshetic things and a dataset from YASB so that I could focus on the engineering aspects of this project.   

What I wrote myself:
- my own React components which implement the core features of YASB
- my own CSS which achieves the same layout and design as YASB
- my own "business logic" to work with YASB's dataset to achieve the requirements of the squad builder
- my own backend service user registration and saving squads for those users  (https://github.com/keaton-robinson/react-xwing-backend)

What I borrowed from YASB: 
- overall visual design & layout plan (although I reimplemented it with my own CSS)
- images for pictures of Star Wars ships
- fonts for xwing icons
- SVGs for "ship maneuvers" (these show up when you mouse over a ship or pilot, or click them on a mobile device)
- their dataset which contains the statistics for ships, pilots, and upgrades in the X-Wing miniatures game

Working on this has been a fun challenge and I learned a LOT going from "almost scratch" to "functional website on Heroku with a backend database on MongoDB Atlas".  