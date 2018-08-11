
if (process.env.NODE_ENV !== 'production') {
    console.log('development mode.');
    require('dotenv').config();
} else if (process.env.NODE_ENV === 'production') {
    console.log('production mode.');
}