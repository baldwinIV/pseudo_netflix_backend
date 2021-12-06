const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('movie_table', {
    movie_imagepath: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    movie_description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    movie_title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    movie_director: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    movie_year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'movie_table',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "movie_id" },
        ]
      },
    ]
  });
};
