'use strict';

const Category = require('../../models').Category;

const categories = [
  'to do',
  'doing',
  'done'
].map((category) => {
  return {
    name: category,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
	const count = await Category.count().then(c => { return c });
	  if (count === 0 ) {
		await queryInterface.bulkInsert('categories', categories);
	  }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
	  await queryInterface.bulkDelete('categories', null, {});
  }
};
