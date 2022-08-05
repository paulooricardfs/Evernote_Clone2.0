'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      Tag.hasMany(models.Note_tag, {
        foreignKey: 'note_id',
        as: 'note_tag'
      });

      Tag.belongsToMany(models.Note, {
        through: 'Note_tag',
        as: 'notes',
        foreignKey: 'tag_id'
      });

    }
  }
  Tag.init({
    name: DataTypes.STRING,
	  createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    sequelize,
	  tableName: 'tags',
    modelName: 'Tag',
  });
  return Tag;
};
