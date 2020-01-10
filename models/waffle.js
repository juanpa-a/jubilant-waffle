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
        type: DataTypes.INTEGER
      },
      leaf: {
        type: DataTypes.BOOLEAN
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          allowNull: false,
          len: [2, 40]
        }
      },
      body: {
        type: DataTypes.TEXT,
        validate: {
          allowNull: false,
          min: {
            args: 10
          }
        }
      },
      question: {
        type: DataTypes.STRING,
        validate: {
          allowNull: false,
          len: [2, 40]
        }
      },
      hidden: {
        type: DataTypes.BOOLEAN,
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
