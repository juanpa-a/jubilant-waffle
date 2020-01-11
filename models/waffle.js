module.exports = function(sequelize, DataTypes) {
  var Waffle = sequelize.define(
    "Waffle",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      leaf: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 40]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: 10
        }
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 40]
        }
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["parentId"]
        },
        {
          unique: false,
          fields: ["id", "parentId"]
        }
      ]
    }
  );
  return Waffle;
};
