'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      Note_tag.belongsTo(models.Note, {
        foreignKey: 'note_id',
        as: 'note_tags'
      });

      Note_tag.belongsTo(models.Tag, {
        foreignKey: 'tag_id',
        as: 'tags'
      });

    }
  }
  Note_tag.init({
	  id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    note_id: {
	    allowNull: false,
	    type: DataTypes.INTEGER,
    },
    tag_id: {
	    allowNull: false,
	    type: DataTypes.INTEGER,
    },
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
	  tableName: 'note_tag',
    modelName: 'Note_tag',
  });
  return Note_tag;
};
