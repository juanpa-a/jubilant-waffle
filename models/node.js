module.exports = function(sequelize, DataTypes) {
  var Node = sequelize.define("Node", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    isLeaf: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN,
    parentId: DataTypes.INTEGER
  });
  return Node;
};