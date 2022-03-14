const bcryptjs = require('bcryptjs');
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      name: 'Usuário',
      lastname: 'Admin',
      email: 'andrelucastrevizan@gmail.com',
      password: bcryptjs.hashSync('admin', 15),
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
   }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
