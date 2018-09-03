console.log('hi');

// const fetchAlbums = async () => {
//     const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
//     const json = await res.json();
//     console.log(json);
// };
//
// fetchAlbums();

const path = require('path');

console.log(path.join(__dirname, '../../client/build'));