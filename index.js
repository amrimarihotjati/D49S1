const express = require('express')
const app = express()
const port = 3000
const path = require('path')

// sequelize init
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

//LocalHost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//handlebars
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))
const dateDuration = require('./src/helper/duration');

//staticfiles
app.use(express.static('src/assets'))

// parsing data from client
app.use(express.urlencoded({extended:false}))

//=====GET AND POST=====//
app.get('/', home)
app.get('/contact', contact)
app.get('/testimonials', testimonials)
app.get('/myproject', myproject)
app.get('/detailproject/:id', projectDetail)
app.get('/delete-project/:id',deleteProject)
app.get('/myproject-edit/:id', myprojectEdit);
app.get('/detailproject', detailproject)
app.post('/myproject', addProject)
app.post('/myproject-update/:id',editProject)


//index or homepage
async function home(req,res){
  try {
    const query = `SELECT * FROM public."dbProjects";`;
    let obj =  await sequelize.query(query, {type: QueryTypes.SELECT});

    const data = obj.map((res) => ({
      ...res,
      duration: dateDuration(res.start_date, res.end_date),
    }));

    res.render('index', {project : data})
  } catch (error) {
    console.log(err)
  }

}

//ProjectDetail Page
async function projectDetail(req,res){

  try {
    const { id } = req.params
    const query = `SELECT * FROM "dbProjects" WHERE id=${id}`
    const obj = await sequelize.query(query, {type: QueryTypes.SELECT})
    
    const data = obj.map((res) => ({
      ...res,
      duration: dateDuration(res.start_date, res.end_date),
    }))
    
    res.render('detailproject', {project : data[0]})
  } catch (error) {
    console.log(err);
  }

}

//AddProject Post
async function addProject(req,res){
  try {
    const {name,start_date, end_date, description, nodeJS, reactJS, javaScript, HTML} = req.body
    const image = "https://static01.nyt.com/images/2021/12/16/multimedia/16sp-review-next-inyt1/16sp-review-next-inyt1-articleLarge.jpg"

    const nodejsCheck = nodeJS === "true" ? true : false;
		const reactjsCheck = reactJS === "true" ? true : false;
		const javascriptCheck = javaScript === "true" ? true : false;
		const htmlCheck = HTML === "true" ? true : false;

    await sequelize.query(`INSERT INTO "dbProjects"(
      name, description, image, start_date, end_date, nodejs, reactjs, javascript, html, "createdAt", "updatedAt")
      VALUES ('${name}', '${description}', '${image}', '${start_date}', '${end_date}', '${nodejsCheck}', '${reactjsCheck}', '${javascriptCheck}', '${htmlCheck}', NOW(), NOW());`)
      
    res.redirect("/");

  } catch (error) {
    console.log(error)
  }

}

//DeleteProject
async function deleteProject (req,res){

  try {
    const {id} = req.params
  
    await sequelize.query(`
      DELETE FROM "dbProjects" WHERE id = ${id}
    `)
    
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }

}


//EditProject Page
async function myprojectEdit(req, res) {
  try {
		const {id} = req.params
		const query = `SELECT * FROM "dbProjects" WHERE id=${id}`;
		const obj = await sequelize.query(query, {
			type: QueryTypes.SELECT,
		});
		res.render("myproject-edit", { project: obj[0] });
	} catch (err) {
		console.log(err);
	}
}

//EditProject Post
async function editProject(req, res) {
  try {
    const { id } = req.params
    const {name,start_date, end_date, description, nodeJS, reactJS, javaScript, HTML} = req.body
    const image = "https://static01.nyt.com/images/2021/12/16/multimedia/16sp-review-next-inyt1/16sp-review-next-inyt1-articleLarge.jpg"

    const nodejsCheck = nodeJS === "true" ? true : false;
		const reactjsCheck = reactJS === "true" ? true : false;
		const javascriptCheck = javaScript === "true" ? true : false;
		const htmlCheck = HTML === "true" ? true : false;

    await sequelize.query(
			`UPDATE public."dbProjects" SET name='${name}', description='${description}', "start_date"='${start_date}', "end_date"='${end_date}', nodejs=${nodejsCheck}, reactjs=${reactjsCheck}, javascript=${javascriptCheck}, html=${htmlCheck}, "createdAt"=NOW(), "updatedAt"=NOW()
      WHERE id=${id};`,
		);

    res.redirect("/");

  } catch (error) {
    console.log(error);
  }
}


//======================BLog========================//

//Blog
//=====GET====//
app.get('/blog', blog)
app.get('/form-blog', formBlog)
app.get('/blog-detail/:id', blogDetail)
app.get('/delete-blog/:id',deleteBlog)
app.get('/edit-blog/:id', editBlogPage)


//=====POST====//
app.post('/form-blog', addBlog)
app.post('/edit-blog/:id',editBlog)


//BlogPage
//DataDummy
const dummyDataBlog = [
  {
    // id : 1,
    title : "Redbull Winners 2023 Seasons",
    content : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi fugiat eaque itaque ratione natus similique facere ab magnam? Libero, deleniti rem aliquam magni soluta dolorem debitis minus ipsa maiores hic.",
    author : "Max Verstappen",
    post : new Date(),
    image : "https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/verstappen.jpg.img.640.medium.jpg/1677069646195.jpg"
  },
  {
    // id : 2,
    title : "Worst Season For Ferrari",
    content : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi fugiat eaque itaque ratione natus similique facere ab magnam? Libero, deleniti rem aliquam magni soluta dolorem debitis minus ipsa maiores hic.",
    author : "Charles Leclerc",
    post : new Date(),
    image : "https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/leclerc.jpg.img.1920.medium.jpg/1677069223130.jpg"
  },
  {
    // id : 3,
    title : "Alonso Living Legend",
    content : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi fugiat eaque itaque ratione natus similique facere ab magnam? Libero, deleniti rem aliquam magni soluta dolorem debitis minus ipsa maiores hic.",
    author : "Charles Leclerc",
    post : new Date(),
    image : "https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/alonso.jpg.img.1920.medium.jpg/1677244577162.jpg"
  },
  {
    // id : 4,
    title : "Season Begin!",
    content : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi fugiat eaque itaque ratione natus similique facere ab magnam? Libero, deleniti rem aliquam magni soluta dolorem debitis minus ipsa maiores hic.",
    author : "Charles Leclerc",
    post : new Date(),
    image : "https://akcdn.detik.net.id/visual/2022/10/24/motor-f1-usa_169.jpeg?w=650"
  }
]

function myproject(req,res){
  res.render('myproject')
}

function contact(req,res){
  res.render('contact')
}

function testimonials(req,res){
  res.render('testimonials')
}

function detailproject(req,res){
  res.render('detailproject')
}

function blog(req,res){
  res.render('blog', {dummyDataBlog})
}

function formBlog(req,res){
  res.render('form-blog')
}


function blogDetail(req,res){
  const { id } = req.params

  res.render('blog-detail', { blog: dummyDataBlog[id] })
}


//AddPostBlog
function addBlog(req,res){
  const { title, content, image } = req.body

  const data = {
    title,
    content,
    image : "https://akcdn.detik.net.id/visual/2022/10/24/motor-f1-usa_169.jpeg?w=650",
    post : new Date(),
    author : "Amri Marihot Jati"
  }

  dummyDataBlog.push(data)
  res.redirect('blog')
}

//DeletePostBlog
function deleteBlog(req,res){

  const {id} = req.params

  dummyDataBlog.splice(id, 1)
  
  res.redirect('/')
}

//EditPostBlog
function editBlogPage(req,res){

  const {id} = req.params

  res.render('edit-blog', {blog:dummyDataBlog[id]})
}

function editBlog(req,res){

  const { id } = req.params;

  const { title, content, image } = req.body

  const data = {
    title,
    content,
    image : "https://akcdn.detik.net.id/visual/2022/10/24/motor-f1-usa_169.jpeg?w=650",
    post : new Date(),
    author : "Amri Marihot Jati"
  }

  dummyDataBlog[id] = data

  res.redirect('/blog')

}

