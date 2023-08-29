'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "projects",
      [
        {
          name : "Awesome Season for Redbull Project",
          description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo",
          image : "https://static01.nyt.com/images/2021/12/16/multimedia/16sp-review-next-inyt1/16sp-review-next-inyt1-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
					start_date: "2023-07-01",
					end_date: "2023-10-01",
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
