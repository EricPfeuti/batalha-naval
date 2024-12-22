const board = document.getElementById("board");

for (let i = 0; i < 25; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.dataset.index = i;
    board.appendChild(square);
}

const ships = [];
const shipColors = ["#007FFF", "#EF0107", "#469536"];

function randomizeShips() {
    ships.length = 0;

    const shipSizes = [1, 2, 3];
    const availableSquares = new Set([...Array(25).keys()]);

    function canPlaceShip(startIndex, size, direction) {
        const positions = [];
        let currentIndex = startIndex;

        for (let i = 0; i < size; i++) {
            if (direction === "horizontal") {
                currentIndex += 1;
                if (currentIndex % 5 === 0) return false;
            } else {
                currentIndex += 5;
            }

            if (!availableSquares.has(currentIndex)) {
                return false;
            }
            positions.push(currentIndex);
        }
        return positions;
    }

    function placeShip(size, color) {
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
        let positions = [];
        let placed = false;

        while (!placed) {
            const randomStartIndex = Math.floor(Math.random() * 25);
            positions = canPlaceShip(randomStartIndex, size, direction);

            if (positions) {
                positions.forEach(pos => availableSquares.delete(pos));
                ships.push({ positions, color });
                placed = true;
            }
        }
    }

    shipSizes.forEach((size, index) => placeShip(size, shipColors[index]));

    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.textContent = "";
    });

    ships.forEach(ship => {
        ship.positions.forEach(index => {
            const square = document.querySelector(`[data-index="${index}"]`);
            square.style.backgroundColor = ship.color;
        });
    });

    console.log("Barcos posicionados nas células:", ships);
}

randomizeShips();