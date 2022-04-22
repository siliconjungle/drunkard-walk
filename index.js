const MAP_WIDTH = 128
const MAP_HEIGHT = 128
const TILES = {
  EMPTY: 0,
  WALL: 1,
}
// Map is stored as a flat array but could be represented as a 2D array as well.
const map = new Array(MAP_WIDTH * MAP_HEIGHT).fill(TILES.WALL)

const randomRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const position = {
  x: randomRange(0, MAP_WIDTH),
  y: randomRange(0, MAP_HEIGHT),
}

const DIRECTION_VECTORS = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
]

const DIRECTIONS = {
  RIGHT: 0,
  LEFT: 1,
  DOWN: 2,
  UP: 3,
}

// This could be optimised by keeping the availableDirections stored and updating them as you step.
const createAvailableDirections = (map, position) => {
  const availableDirections = []
  if (position.x < MAP_WIDTH - 1) {
    availableDirections.push(DIRECTION_VECTORS[DIRECTIONS.RIGHT])
  }
  if (position.x > 0) {
    availableDirections.push(DIRECTION_VECTORS[DIRECTIONS.LEFT])
  }
  if (position.y < MAX_HEIGHT - 1) {
    availableDirections.push(DIRECTION_VECTORS[DIRECTIONS.DOWN])
  }

  if (position.y > 0) {
    availableDirections.push(DIRECTION_VECTORS[DIRECTIONS.UP])
  }
  return availableDirections
}

const convertPositionToIndex = position =>
  position.x + MAP_WIDTH * position.y

const step = (map, position) => {
  const availableDirections = createAvailableDirections(map, position)
  const direction = randomRange(0, availableDirections.length - 1)
  position.x += direction.x
  position.y += direction.y
  const currentIndex = convertPositionToIndex(position)
  map[currentIndex] = TILES.EMPTY
}

const drunkardWalk = (map, position, steps) => {
  for (let i = 0; i < steps; i++) {
    step(map, position)
  }
}
