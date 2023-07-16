const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/camping');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i=0; i<50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://source.unsplash.com/random/900×700/?camping`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut enim quod dicta non distinctio placeat et, dolores excepturi sequi architecto quo consectetur eaque quae natus possimus nihil odit similique quis.',
            price: Math.floor(Math.random()*1000) + 1000
        })
        await camp.save();

    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

