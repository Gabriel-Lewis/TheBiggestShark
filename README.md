# TheBiggestShark

### Background
[live demo](https://gabriel-lewis.github.io/TheBiggestShark/)
![](http://i.imgur.com/kRN7u7P.png)
The Biggest Shark is a take on the game [Big Fish](http://bigfish.ivank.net/index_smg.html).  The main goal is to gain as much mass as possible by eating smaller sharks without being swallowed by bigger sharks. You move your shark around with the cursor.

### Wireframes

This app will consist of a single screen with board, moving sharks(gray), current player shark(blue), game instructions, and nav links to the Github, my LinkedIn at the bottom of the screen.

![](http://i.imgur.com/kRN7u7P.png)

### Architecture and Technologies

- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`game_view.js`: this script handle the logic for creating and updating the necessary elements and rendering them to the DOM.

`shark.js`: this script will handle the logic behind the sharks. An Shark object will house the constructor and size functions. The sharks will also have a moving property that will give them a speed and direction.

`player.js`: this will house the logic of the player.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Shark` object to connect to the `Board` object.  Then, use `board.js` to create and render moving sharks. Goals for the day:

- Complete `Shark.js`

**Day 3**: Finish the player class to enable the player to move across the board and be eaten by sharks. Goals for the day:

- finish all of the keybindings
- finish player controls


**Day 4:** Style the frontend, making it polished and professional.  Goals for the day:

- add background and style board to span entire screen
- finish last minute styling

### Bonus features

Here are a few features that I would eventually like to add to this project:

- [ ] Record score of player
- [ ] Allow players to share their highest score on social media
