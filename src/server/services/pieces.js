const SKYBLUE = [
  [
    [1, 1, 1, 1],
  ],
  [
    [1],
    [1],
    [1],
    [1],
  ],
  [
    [1, 1, 1, 1],
  ],
  [
    [1],
    [1],
    [1],
    [1],
  ]
];

const BLUE = [
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [1, 1],
    [1],
    [1],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ]
];

const ORANGE = [
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1],
    [1],
    [1, 1],
  ],
  [
    [1, 1, 1],
    [1],
  ],
  [
    [1, 1],
    [0, 1],
    [0, 1],
  ]
];

const YELLOW = [
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 1],
    [1, 1],
  ],
];

const GREEN = [
  [
    [0, 1, 1],
    [1, 1],
  ],
  [
    [1],
    [1, 1],
    [0, 1],
  ],
  [
    [0, 1, 1],
    [1, 1],
  ],
  [
    [1],
    [1, 1],
    [0, 1],
  ]
];

const PURPLE = [
  [
    [0, 1],
    [1, 1, 1],
  ],
  [
    [1],
    [1, 1],
    [1],
  ],
  [
    [1, 1, 1],
    [0, 1],
  ],
  [
    [0, 1],
    [1, 1],
    [0, 1],
  ]
];

const RED = [
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1],
    [1, 1],
    [1],
  ],
  [
    [1, 1],
    [0, 1, 1],
  ],
  [
    [0, 1],
    [1, 1],
    [1],
  ]
];

const pieces = [
  { color: 'skyBlue', patterns: SKYBLUE },
  { color: 'blue', patterns: BLUE },
  { color: 'orange', patterns: ORANGE },
  { color: 'yellow', patterns: YELLOW },
  { color: 'green', patterns: GREEN },
  { color: 'purple', patterns: PURPLE },
  { color: 'red', patterns: RED },
];

const getRandomPiece = () => {
  const random = Math.floor(Math.random() * Math.floor(pieces.length));
  return pieces[random]
};

module.exports = {
  getRandomPiece,
};