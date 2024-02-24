'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.TEXT
      },
      phone: {
        type: Sequelize.STRING
      },
      created_at: {
       
        type: Sequelize.BIGINT(50)
      },
      updated_at: {
        
        type: Sequelize.BIGINT(50)
      },
      uuid:{
        type: Sequelize.STRING
      },
      is_delete: {
        defaultValue: 0,
        type: Sequelize.TINYINT
      },
      public_key: {
        type: Sequelize.TEXT
      },
      private_key: {
        type: Sequelize.TEXT
      }
     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};