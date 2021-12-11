const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_table', {
    post_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    post_imagepath: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    post_description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    post_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_table',
        key: 'user_id'
      }
    },
    post_viewcount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    post_recommendation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "1~5"
    },
    post_title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    post_movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'movie_table',
        key: 'movie_id'
      }
    }
  }, {
    sequelize,
    tableName: 'post_table',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "post_table_FK0",
        using: "BTREE",
        fields: [
          { name: "post_movie_id" },
        ]
      },
      {
        name: "post_table_FK1",
        using: "BTREE",
        fields: [
          { name: "post_user_id" },
        ]
      },
    ]
  });
};
