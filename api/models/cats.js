'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cats.hasMany(models.favorites, {
        as: 'Favorites',
        foreignKey: 'cat_id'
      });
    }
  }
  cats.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    temperament: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cats',
  });
  return cats;
};