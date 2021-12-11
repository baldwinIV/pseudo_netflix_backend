var DataTypes = require("sequelize").DataTypes;
var _movie_table = require("./movie_table");
var _post_table = require("./post_table");
var _user_table = require("./user_table");

function initModels(sequelize) {
  var movie_table = _movie_table(sequelize, DataTypes);
  var post_table = _post_table(sequelize, DataTypes);
  var user_table = _user_table(sequelize, DataTypes);

  post_table.belongsTo(movie_table, {  foreignKey: "post_movie_id"});
  movie_table.hasMany(post_table, {  foreignKey: "post_movie_id"});
  post_table.belongsTo(user_table, {  foreignKey: "post_user_id"});
  user_table.hasMany(post_table, {  foreignKey: "post_user_id"});

  return {
    movie_table,
    post_table,
    user_table,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
