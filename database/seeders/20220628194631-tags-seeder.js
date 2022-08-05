'use strict';

const Tag = require('../../models').Tag;

const tags = [
  'Angular',
  'Java',
  'Nodejs',
].map((tag) => {
  return {
    name: tag,
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
    const count = await Tag.count().then(c => { return c });
    if (count === 0 ) {
      await queryInterface.bulkInsert('tags', tags);
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('tags', null, {});
  }
};

