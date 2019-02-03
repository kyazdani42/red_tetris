const stackCase = { color: 'black', value: 0, fix: false };
const fixStackCase = { color: 'grey', value: 1, fix: true };


// --------------------------------------------------------------

// version de check case avec plus de clarte
// oublie pas que a === 1 && b === 2 ca renvoie true ou false, dans tout les languages informatiques, un booleen est un booleen ;)
const isOutOfBoundsOrOccupied = (x, y, stack) => y > 19 || x < 0 || x > 9 || stack[y][x].value === 1;
const checkCaseBooleanVersion = (stack, y) => (patternCase, x) => patternCase === 1 && isOutOfBoundsOrOccupied(x, y, stack);


const checkCase = (stack, y) => {
  return (patternCase, x) => {
    if (patternCase === 1) {
      if (y > 19 || x < 0 || x > 9) { return true; }
      if (stack[y][x].value === 1) { return true; }
    }
    return false;
  }
};

// --------------------------------------------------------------

const checkLine = (line, stack, x, y) => {
  const check = checkCase(stack, y);
  return line.some((patternCase, patternX) => {
    return check(patternCase, x + patternX);
  });
};

const checkPosition = (x, y, pattern, stack) => {
  return pattern.some((line, patternY) => {
    return checkLine(line, stack,  x, patternY + y);
  });
};

// --------------------------------------------------------------------------------------------------------------------

// c'est une autre approche, j'ai mis un peu de temps a reussir a la faire parceque tes x et y sont 
// pas des valeurs de tableau, elles sont decalees de un a chaque fois (genre ca fait 1 2 3 4 au lieu de 0 1 2 3)

// du coup cette approche me semble plus logique etant donne que ce que tu recherches, c'est a fusionner la piece
// dans la stack, donc c'est plus logique de partir de la stack que de la piece, puis t'a moins d'iterations

// t'es pas oblige de la prendre, ta methode marche bien, mais observe car c'est une approche qui peut 
// te permettre de mieux comprend l'utilite des .map
const fusionPieceAndStackOptiAndReadable = ({ x, y, pattern, color }, stack) => {
  return stack.map((line, lineIndex) => {
    const indexLinePattern = lineIndex - y + 1;
    const linePattern = pattern[indexLinePattern];

    return line.map((block, blockIndex) => {
      const indexBlockPattern = blockIndex - x + 1;
      if (block.value || !linePattern || !linePattern[indexBlockPattern]) {
        return block;
      } else {
        return { color, value: 1, fix: false };
      }
    })
  });
};

const fusionPieceAndStack = ({ x, y, pattern, color }, stack) => {
  // okay du coup c'est ca dont tu parlais, tu peux faire: const newStack = stack.map(d => [...d]);
  const newStack = JSON.parse(JSON.stringify( stack ));
  pattern.forEach((line, patternY) => {
    line.forEach((patternCase, patternX) => {
      if (patternCase === 1) {
        newStack[patternY + y][patternX + x] = { color,  value: 1, fix: false };
      }
    })
  });
  return newStack;
};

// ---------------------------------------------------------------------------------------------------------------

// ok avec es6 tu peux faire ca, moins verbose, plus facile a lire, moins d'imbrication > code plus propre
const isLineFull = (y, stack, value) => !stack[y].some(aCase => aCase.value === value);

const isFullLine = (y, stack, value) => {
  return !stack[y].some((aCase) => {
    return aCase.value === value;
  })
};

// --------------------------------------------------------------

const updateFullLine = (y, stack) => {
  if (!stack[y][0].fix && isFullLine(y, stack, 0)) {
    console.log('fullLine')
    stack.splice(y, 1);
    stack.unshift(initLine(stackCase));
    return true;
  }
  return false;
};

const addFixLine = (stack) => {
  if (isFullLine(0, stack, 1)) {
    stack.splice(0, 1);
    stack.push(initLine(fixStackCase));
    return true;
  }
  return false;
};

const initLine = (newCase) => {
  const line = [];
  for (let x = 0; x < 10; x++) {
    line.push(newCase);
  }
  return line;
};


// --------------------------------------------------------------

// initialisation de tes array avec une taille definie et de l'immutabilite
const initStackVersionKiyan = Array(20).map(_ => Array(20).map(_ => stackCase));

const initStack = () => {
  const stack = [];
  for (let y = 0; y < 20; y++) {
    stack[y] = initLine(stackCase);
  }
  return stack;
};
// --------------------------------------------------------------

module.exports = {
  checkPosition,
  fusionPieceAndStack,
  initStack,
  updateFullLine,
  addFixLine,
};