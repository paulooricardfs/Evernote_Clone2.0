'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
	      allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
	      allowNull: false,
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('notes');
  }
};
