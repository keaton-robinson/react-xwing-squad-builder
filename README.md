# A fun practice and portfolio project
This is my reimplementation of an existing tool, "Yet Another Squad Builder 2.0", or YASB 2.0. 
YASB 2.0 is a "squad builder" for the X-Wing miniatures game by Atomic Mass Games. You can see YASB 2.0 live here: https://raithos.github.io/ and you can visit its GitHub repository here: https://github.com/raithos/xwing.

This is the front-end repository. To see the backend api, see this repo: https://github.com/keaton-robinson/react-xwing-backend.

I made this for practice and to use as a portfolio sample project. 

I borrowed a few things from YASB 2.0 so that I could focus on the engineering aspects of this project.   

What I borrowed from YASB: 
- overall visual design & layout plan (although I reimplemented it with my own CSS)
- images for pictures of Star Wars ships
- fonts for xwing icons
- SVGs for "ship maneuvers" (these show up when you mouse over a ship or pilot, or click them on a mobile device)
- their dataset which contains the statistics for ships, pilots, and upgrades in the X-Wing miniatures game

What I wrote myself:
- my own React components which implement the core features of YASB 2.0
- my own CSS which achieves the same layout and design as YASB 2.0
- my own "business logic" to work with YASB's dataset to achieve the requirements of the squad builder
- my own backend service user registration and saving squads for those users  (https://github.com/keaton-robinson/react-xwing-backend)

Working on this has been a fun challenge and I learned a LOT going from "almost scratch" to "functional website on Heroku with a backend database on MongoDB Atlas".  