const bcryptjs = require('bcryptjs');
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('roles', [{
        name: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date(),
     }, {
      name: 'Default',
      createdAt: new Date(),
      updatedAt: new Date(),
   }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {});
  }
};