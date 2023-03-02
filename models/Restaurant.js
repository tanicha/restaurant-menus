const {sequelize} = require('../db');
const { Sequelize } = require('sequelize');

// TODO - create a Restaurant model
const Restaurant = sequelize.define('restaurant', {
    name: Sequelize.STRING,
    location: Sequelize.STRING,
    cuisine: Sequelize.STRING,
    rating: Sequelize.NUMBER
})

module.exports = {Restaurant};