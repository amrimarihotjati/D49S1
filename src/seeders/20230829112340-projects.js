'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "projects",
      [
        {
          name : "Lewis Hamilton and Mercedes Project",
          description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo.",
          image : "https://cdn-9.motorsport.com/images/amp/0ZRK5g40/s6/lewis-hamilton-mercedes-f1-w14.jpg",
					start_date: "2023-03-27",
					end_date: "2023-04-11",
					technologies: ["nodejs", "reactjs"],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
