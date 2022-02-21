# A practice project more interesting than a to-do list
This is my reimplementation of an existing tool, "Yet Another Squad Builder 2.0", or YASB 2.0. 
YASB 2.0 is a "squad builder" for the X-Wing Miniatures game by Atomic Mass Games. You can see YASB 2.0 live here: https://raithos.github.io/ and you can visit its GitHub repository here: https://github.com/raithos/xwing.

I am making this as a practice and portfolio sample project. I could make something simple, like a todo list, but I wanted to make something more interesting, while staying focused on the engineering aspects of the project. I didn't want to spend time doing image editing. I find YASB to be a pretty visually interesting, so I decided that reimplenting it would be a fun exercise. This let me borrow their images and some other visuals. I also got to learn how they handled putting all their cool star wars icons throughout the UI. 

What I borrowed from YASB: 
- overall visual design & layout plan (although I reimplemented it with my own CSS)
- images for pictures of Star Wars ships
- fonts for xwing icons
- SVGs for "ship maneuvers" (these show up when you mouse over a ship or pilot, or click them on a mobile device)
- their x-wing dataset

What I wrote myself:
- my own React components which implement the core features of YASB 2.0
- my own CSS which achieves the same layout and design as YASB 2.0
- my own "business logic" to work with YASB's dataset to achieve the requirements of the squad builder

My goal was to challenge myself to implement something interesting and familiar to me so that I may see what I would learn from the process.

# Things I learned:
- Obviously, I got much more comfortable with React by doing this. I kind of decided I prefer class components over function components, but either way works. 
- Unit tests are totally worth the effort. In the past, I have wondered if they are reallllllyyy worth doing, so I decided to not include any in this project to see if I miss them. It didn't take long before I was wishing I had a safety net of tests backing my code base. I still haven't tried to add any here. I imagine my code isn't very testable in its current form, but I'm definitely interested in investing the time to master the use of unit tests now.
- JavaScript arrow functions are awesome. The "this" keyword needs to learn its proper place. I'm sure regular JavaScript functions can do some cool stuff, but not having to fight the 'this' keyword so often is really nice.
- How to use specialized fonts to insert icons into a web page. 
- Got muuuuuch more comfortable with CSS. Including: (flexbox, grids, box-model size troubleshooting, specificity and cascade rules, and more)
- Learned about pros and cons of client-side rendering, server-side rendering, and static file generation. I just dumbed this project down to the simplest thing I could, but it originally started off using server-side rendering with ReactDOM.hydrate. (I ran into issues with my custom drop down component calling the window object in my webpack bundle, which kept causing errors during the server side rendering. I decided fixing that issue was kind of beyond the scope of this project, so I got rid of server side rendering)
- Learned about webpack and static + dynamic bundling strategies. 
- Got much more comfortable dealing with Node and Node Package Manager. Wouldn't be too worried about using another package manager. 
- Forking an existing React component, modifying it, and using it. I had to modify a custom dropdown component I found to achieve some of my requirements. 
- A bunch more stuff but this list is getting long


This has been a fun project to work on and I've learned a lot in the process. 
