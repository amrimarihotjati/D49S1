'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
			"dbProjects",
			[
				{
					name: "Big Project for 2024 Season",
					description:
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure accusantium perspiciatis vero, natus consequatur corrupti voluptas, labore officia excepturi eligendi omnis molestias necessitatibus odit modi ex animi corporis dolorem!",
					image: "https://media.formula1.com/image/upload/v1690734334/trackside-images/2023/F1_Grand_Prix_of_Belgium/1580921322.jpg.transform/9col-retina/image.jpg",
					start_date: "2023-03-27",
					end_date: "2023-08-11",
					nodejs: true,
					reactjs: false,
					javascript: true,
					html: true,
          createdAt: new Date(),
          updatedAt: new Date()
				},
			],
		);
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
