const express = require('express')
const app = express()
const port = 3000
const path = require('path')

// sequelize init
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)
const bcrypt = require('bcrypt');
const flash = require('express-flash')
const session = require('express-session')
const upload = require('./src/middlewares/uploadFiles')


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
app.use(express.static('src/uploads'))

// parsing data from client
app.use(express.urlencoded({extended:false}))

//Flash
app.use(flash())

//Session
app.use(session({
  cookie : {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 2
  },

  store: new session.MemoryStore(),
  saveUninitialized: true,
  resave: false,
  secret: 'secretValue'

}))

//=====GET AND POST=====//
app.get('/', home)
app.get('/contact', contact)
app.get('/testimonials', testimonials)
app.get('/myproject', myproject)
app.get('/detailproject/:id', projectDetail)
app.get('/delete-project/:id',deleteProject)
app.get('/myproject-edit/:id', myprojectEdit);
app.get('/form-register', formRegister)
app.get('/form-login', formLogin)
app.get('/logout', logoutUser)
app.post('/form-register', registerUser)
app.post('/myproject', upload.single('upload-image'), addProject)
app.post('/myproject-update/:id',upload.single('upload-image'), editProject)
app.post('/login', loginUser)


function contact(req,res){
  res.render('contact', {
    isLogin: req.session.isLogin,
    user: req.session.user})
}

function testimonials(req,res){
  res.render('testimonials', {
    isLogin: req.session.isLogin,
    user: req.session.user})
}

function myproject(req,res){
  res.render('myproject',  {
    isLogin: req.session.isLogin,
    user: req.session.user})
}

function detailproject(req,res){
  res.render('detailproject',  {
    isLogin: req.session.isLogin,
    user: req.session.user})
}

function formRegister (req,res){
  res.render("form-register",  {
    isLogin: req.session.isLogin,
    user: req.session.user})
}

function formLogin (req,res){
  res.render('form-login',  {
    isLogin: req.session.isLogin,
    user: req.session.user})
}

//index or homepage
async function home(req,res){

  try {

    let query = ""
    let obj = ""
    
    if(req.session.idUser){

      console.log("a")

      query = `SELECT "dbProjects".id, title, start_date, end_date, description, nodejs, reactjs, javascript, html, image, users.name AS author FROM "dbProjects" INNER JOIN users ON "dbProjects".author = users.id WHERE "dbProjects".author = :idUser;`;
      
      // :idUser >> karena pakai replacements

      obj =  await sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements:{
          idUser : req.session.idUser,
        },
      });


    }else{

      console.log("b")

      query = `SELECT "dbProjects".id, title, start_date, end_date, description, nodejs, reactjs, javascript, html, image, users.name AS author FROM "dbProjects" INNER JOIN users ON "dbProjects".author = users.id;`;
      

      obj =  await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });

    }

    const data = obj.map((res) => ({
      ...res,
      duration: dateDuration(res.start_date, res.end_date),
      isLogin: req.session.isLogin
    }));

    res.render('index', {
      project : data,
      isLogin: req.session.isLogin,
      user: req.session.user
    })
  } catch (error) {
    console.log(err)
  }

}

//ProjectDetail Page
async function projectDetail(req,res){

  try {
    const { id } = req.params

    const query = `SELECT "dbProjects".id, title, start_date, end_date, description, nodejs, reactjs, javascript, html, image, users.name AS author FROM "dbProjects" LEFT JOIN users ON "dbProjects".author = users.id WHERE "dbProjects".id=${id}`;

		const obj = await sequelize.query(query, {
			type: QueryTypes.SELECT,
		})
    
    const data = obj.map((res) => ({
      ...res,
      isLogin: req.session.isLogin,
      duration: dateDuration(res.start_date, res.end_date),
    }))
    
    res.render('detailproject', {
      project : data[0],
      isLogin: req.session.isLogin,
      user: req.session.user
    })
  } catch (error) {
    console.log(error);
  }

}

//AddProject Post
async function addProject(req,res){
  try {
    const {title,start_date, end_date, description, nodeJS, reactJS, javaScript, HTML} = req.body
    //Add Image With Multer
    const image = req.file.filename
    const author = req.session.idUser

    console.log(image)

    const nodejsCheck = nodeJS === "true" ? true : false;
		const reactjsCheck = reactJS === "true" ? true : false;
		const javascriptCheck = javaScript === "true" ? true : false;
		const htmlCheck = HTML === "true" ? true : false;

    await sequelize.query(`INSERT INTO "dbProjects"(
      title, author, description, image, start_date, end_date, nodejs, reactjs, javascript, html, "createdAt", "updatedAt")
      VALUES ('${title}', '${author}', '${description}', '${image}', '${start_date}', '${end_date}', '${nodejsCheck}', '${reactjsCheck}', '${javascriptCheck}', '${htmlCheck}', NOW(), NOW());`)
      
    res.redirect("/");

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
    res.render("myproject-edit", { 
      project: obj[0],
      isLogin: req.session.isLogin,
      user: req.session.user });
  } catch (err) {
    console.log(err);
  }
}


//EditProject Post
async function editProject(req, res) {
  try {
    const { id } = req.params
    const {title,start_date, end_date, description, nodeJS, reactJS, javaScript, HTML} = req.body
    const image = req.file.filename

    // const image = "https://static01.nyt.com/images/2021/12/16/multimedia/16sp-review-next-inyt1/16sp-review-next-inyt1-articleLarge.jpg"

    
    const nodejsCheck = nodeJS === "true" ? true : false;
    const reactjsCheck = reactJS === "true" ? true : false;
    const javascriptCheck = javaScript === "true" ? true : false;
    const htmlCheck = HTML === "true" ? true : false;

    await sequelize.query(
      `UPDATE public."dbProjects" SET title='${title}', description='${description}', image='${image}', "start_date"='${start_date}', "end_date"='${end_date}', nodejs=${nodejsCheck}, reactjs=${reactjsCheck}, javascript=${javascriptCheck}, html=${htmlCheck}, "createdAt"=NOW(), "updatedAt"=NOW()
      WHERE id=${id};`,
    );

    res.redirect("/");

  } catch (error) {
    console.log(error);
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



//RegisterUser Post
async function registerUser(req,res){
  try {
    const { name, email, password} = req.body
    const salt = 10

    await bcrypt.hash(password, salt, (err, hashPassword) => {
      const query = `INSERT INTO users (name, email, password, "createdAt", "updatedAt") VALUES ('${name}','${email}','${hashPassword}',NOW(), NOW())`
      
      sequelize.query(query)
      res.redirect('form-login')
    })

  } catch (error) {
    console.log(error)
  }

}

//login action
async function loginUser(req,res){
  try {
    const {email,password} = req.body
    const query = `SELECT * FROM users WHERE email = '${email}'`
    let obj = await sequelize.query(query, {type: QueryTypes.SELECT})

    if(!obj.length){
      req.flash('danger', 'user not registered')
      return redirect('/form-login')
    }

    await bcrypt.compare(password, obj[0].password, (err,result) => {
      if(!result){
        req.flash('danger', 'wrong password')
        return res.redirect('/form-login')
      }else{
        req.session.isLogin = true
        req.session.idUser = obj[0].id
        req.session.user = obj[0].name
        req.flash('success', 'login success')
        res.redirect('/')
      }
    })

  } catch (error) {
    console.log(error)
  }
}

//logout action
function logoutUser(req, res) {
	if (req.session.isLogin) {
		req.session.destroy((err) => {
			if (err) {
				console.log(err);
			} else {
				res.redirect("/");
			}
		});
	} else {
		res.redirect("/");
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
    image : "https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/verstappen.jpg.img.640.medium.jpg/1677069646195.jpg",
    isLogin : false
  },
  {
    // id : 2,
    title : "Worst Season For Ferrari",
    content : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi fugiat eaque itaque ratione natus similique facere ab magnam? Libero, deleniti rem aliquam magni soluta dolorem debitis minus ipsa maiores hic.",
    author : "Charles Leclerc",
    post : new Date(),
    image : "https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/leclerc.jpg.img.1920.medium.jpg/1677069223130.jpg",
    isLogin : false
  },
  {
    // id : 3,
    title : "Alonso Living Legend",
    content : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi fugiat eaque itaque ratione natus similique facere ab magnam? Libero, deleniti rem aliquam magni soluta dolorem debitis minus ipsa maiores hic.",
    author : "Charles Leclerc",
    post : new Date(),
    image : "https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/alonso.jpg.img.1920.medium.jpg/1677244577162.jpg",
    isLogin : false
  },
  {
    // id : 4,
    title : "Season Begin!",
    content : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi fugiat eaque itaque ratione natus similique facere ab magnam? Libero, deleniti rem aliquam magni soluta dolorem debitis minus ipsa maiores hic.",
    author : "Charles Leclerc",
    post : new Date(),
    image : "https://akcdn.detik.net.id/visual/2022/10/24/motor-f1-usa_169.jpeg?w=650",
    isLogin : false
  }
]



function blog(req,res){

  res.render('blog', {
    dummyDataBlog,
    isLogin: req.session.isLogin,
    user: req.session.user
  })
}

function formBlog(req,res){
  res.render('form-blog',  {
    isLogin: req.session.isLogin,
    user: req.session.user})
}


function blogDetail(req,res){
  const { id } = req.params

  res.render('blog-detail', { 
    blog: dummyDataBlog[id],
    isLogin: req.session.isLogin,
    user: req.session.user
  })
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

  res.render('edit-blog', { 
    blog: dummyDataBlog[id],
    isLogin: req.session.isLogin,
    user: req.session.user
  })
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

