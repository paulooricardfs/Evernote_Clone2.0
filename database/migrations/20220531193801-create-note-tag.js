'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('note_tag', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      note_id: {
	      allowNull: false,
        type: Sequelize.INTEGER
      },
      tag_id: {
	      allowNull: false,
        type: Sequelize.INTEGER
      },
	    createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('note_tag');
  }
};
