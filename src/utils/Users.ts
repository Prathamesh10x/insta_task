export const Users = [
  {id: 1, name: 'Tim', imgSrc: require('../assets/Tim.jpg'), finish: 0},
  {id: 2, name: 'Annie', imgSrc: require('../assets/Annie.jpg'), finish: 0},
  {id: 3, name: 'Ian', imgSrc: require('../assets/Ian.jpg'), finish: 0},
  {id: 4, name: 'Marshal', imgSrc: require('../assets/Marshal.jpg'), finish: 0},
  {id: 5, name: 'Toa', imgSrc: require('../assets/Toa.jpg'), finish: 0},
  {id: 6, name: 'Tom', imgSrc: require('../assets/Tom.jpg'), finish: 0},
];


export const posts = [
  {
    id: 1,
    name: 'Tim',
    imgSrc: [
      require('../assets/Tim.jpg'),
      require('../assets/Toa.jpg'),
      require('../assets/Ian.jpg'),
    ],
    Likes: 250,
    caption: 'Day well spent!',
  },
  {
    id: 2,
    name: 'Annie',
    imgSrc: [require('../assets/Annie.jpg'), require('../assets/Ian.jpg')],
    Likes: 450,
    caption: 'Day well spent!',
  },
  {
    id: 3,
    name: 'Ian',
    imgSrc: [require('../assets/Ian.jpg')],
    Likes: 1050,
    caption: 'Day well spent!',
  },
  {
    id: 4,
    name: 'Marshal',
    imgSrc: [require('../assets/Marshal.jpg'), require('../assets/Tom.jpg')],
    Likes: 250,
    caption: 'Day well spent!',
  },
  {
    id: 5,
    name: 'Toa',
    imgSrc: [require('../assets/Toa.jpg')],
    Likes: 750,
    caption: 'Day well spent!',
  },
  {
    id: 6,
    name: 'Tom',
    imgSrc: [require('../assets/Tom.jpg'), require('../assets/Toa.jpg')],
    Likes: 650,
    caption: 'Day well spent!',
  },
];