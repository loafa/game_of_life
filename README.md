#Assignment 2: Game of Life
Based on [John Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life). The game is currently deployed on [Athena](http://www.web.mit.edu/ssrusso/www/game_of_life/index.html).
## 1. Concerns
For this project, I identified the following concerns:
- Game logic
- Graphics
- UI
 
And, of course, interfacing between all of them. `Board` and `Cell` manage game logic, with `Board` doing most of the heavy lifting, determining interactions between cells, etc. The graphics are handled in `Grid`, which is displays a square grid of filled and unfilled squares. `UI` handles all user interactions via mouse clicks and button presses. `Game` is the controller that interfaces between game logic, graphics, and the user, as well as updating the animation when appropriate.

## 2. Program Modules
The code is split up into several distinct modules, each with its own individual .js file. The `Board` and `Cell` objects are responsible for game logic, and have no graphic component (ie. the Model). The `Grid` is the construction used to display the game board, and is entirely separate from the game (we use an HTML5 canvas object to draw the grid and display all graphics). The `Game` object interfaces between the game logic and the graphical representation of the game. The `UI` sits on top of everything, and manages user generated events (button press, mouse click, etc.), informing the game to update appropriately. 

####Dependencies
The Board depends on Cells (as a game board is considered to be composed only of cells). The Grid does not have dependencies on any other object, but does require an element in the document called "grid". The Game object, as the "controller" requires access to the Board and Grid objects in order to properly interface between the two. Finally, the UI sitting on top only needs to see the Game in order to communicate button presses. 

## 3. Functionals
####`Board`
Within `Board`, operations such as initializations and updates needed to happen for every Cell in the board. As such, I used a forEach on the cells (abstracting away the indexing within the grid structure).
Furthermore, in `getLiveNeighbors`, I filtered the list of live cells (`liveCellCoords`) to count the number of live cells which were neighbors of the passed cell. 
There was one `for` loop I found necessary to use, namely to populate the `cells` object initially with all the coordinates of the grid. With this representation, relying on indices was necessary.

####`Game`
In `Game.update`, I used a `forEach` on the list of live cells (`Board.getLiveCells`) to fill in the appropriate squares on the grid without having to query each cell to determine if it was alive or not.

## 4. Design
####Wraparound Grid
I spent some time debating between using a wraparound grid structure or a finite grid, beyond which all cells could be considered permanently dead. The logic for the wraparound was slightly more complicated, but I decided it was more true to the "infinite" grid described by Conway. 
####Incorporating Functionals
Originally, the performance decrease from using abstracted interation methods (`forEach`) caused my animation to be painfully slow, due to the time necessary to render. This encouraged me to think of a better way to render my grid graphics and led to me creating a getter for the list of cells that were currently live so that I could still avoid `for` loops (for the most part) and still update the grid quickly.
####Changing live/dead cells during gameplay
I also decided to "do away" with the idea of an explicit starting state. Ie. once the game is paused, it can be considered a new game with the given starting configuration, and adjustments (via user clicks) can be made to the game state. I decided to allow these clicks during "pause" in case the user sees an interesting arrangement they want to alter ever so slightly for a new "start" state, rather than having to restart from scratch. 
