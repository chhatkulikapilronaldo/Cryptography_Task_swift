/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("login_infos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid:{
        allowNull:false,
        type:Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      Token:{
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("login_infos");
  },
};