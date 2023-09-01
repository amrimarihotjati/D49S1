'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dbProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dbProject.init({
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    nodejs: DataTypes.BOOLEAN,
    reactjs: DataTypes.BOOLEAN,
    javascript: DataTypes.BOOLEAN,
    html: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'dbProject',
  });
  return dbProject;
};