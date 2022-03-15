'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      favorites.belongsTo(models.users, {
        as: 'user_favorite',
        foreignKey: 'user_id'
      });
      favorites.belongsTo(models.cats, {
        as: 'cat_favorite',
        foreignKey: 'cat_id'
      });
    }
  }
  favorites.init({
    user_id: DataTypes.INTEGER,
    cat_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favorites',
  });
  return favorites;
};