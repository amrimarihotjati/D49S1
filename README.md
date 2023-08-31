## Day-13

DDL = Database definition language
untuk definisi object, hapus, mengubah.
"CREATE TABLE name_table (name_column with typedata);"
"

DML : Data Manipulation language
Manipulasi data.


SELECT name, email
	FROM "Users";
	
SELECT * FROM "Users";

SELECT * FROM "Users" WHERE id=10;
	
INSERT INTO "Users" (name, email, password) 
	VALUES 
	('Rebecca Eltra', 'eltra@mail.com', '444'),
	('Jane', 'jane@mail.com', '444');
	
DELETE FROM "Users" WHERE id=13;

UPDATE "Users"
	SET password='root123ttt'
	WHERE id=15;


## Sequelize Install
1. npm i sequelize-cli pg pg-hstore
2. npx sequelize-cli init

## Migration, Model, Seeders
1. Model >> Untuk berkomunikasi dengan Database termasuk Input, Delete (masuk DML)
2. Migration >> Untuk melakukan penerjemahan database >> table apa aja, colom apa aja (masuk ke DDL)
3. Seeders >> untuk menambahkan 

## Migrate Sequelize
1. buat modelnya dulu
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
2. npx sequelize-cli db:migrate
3. undo migrate
npx sequelize-cli db:migrate:undo

## Untuk Update Add Data Menggunakan Seed
1. npx sequelize-cli seed:generate --name demo-user
2. lalu buka directory seeders
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
3. kirim data ke database 
npx sequelize-cli db:seed:all
4. Undo seed
npx sequelize-cli db:seed:undo


## Ini Squeize


## Cara Encrypt
1. Install Bcrypt
npm i bcrypt

2. Salting >> Generate Encrypt Password


## Authen dll
1. AUTHENTICATION = PROSES IDENTIFICATION, PERIZINAN KE SISTEM, VERIKASI, DEUTENTIKASI
2. ENCRYPTION = KUNCI VALUES UNTUK USER COCOK ATAU TIDAK DARI DATA
3. SESSION = DATA UNTUK MELACAK KEADAAN USER SAAT INTERAKSI DI WEBSITE DISIMPAN DI COOKIE DI SISI USER
4 .COOKIES = MENYIMPAN DATA PADA WEBSITE
