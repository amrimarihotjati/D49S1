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


//MyProject
// const dummyProjectData = [
//    {
//     id : 1,
//     projectName : "Redbull Project",
//     startDate : "2023-06-16",
//     endDate : "2023-08-10",
//     projectDesc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi fugiat eaque itaque ratione natus similique facere ab magnam? Libero, deleniti rem aliquam magni soluta dolorem debitis minus ipsa maiores hic.",
//     nodeJS : "on",
//     javaScript : "on",
//     image : "https://media.formula1.com/image/upload/content/dam/fom-website/manual/2023/Testing2023/verstappen.png.transform/9col/image.png"
//    },
//    {
//     id : 2,
//     projectName : "Winner Car Project",
//     startDate : "2023-06-16",
//     endDate : "2023-08-10",
//     projectDesc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi fugiat eaque itaque ratione natus similique facere ab magnam? Libero, deleniti rem aliquam magni soluta dolorem debitis minus ipsa maiores hic.",
//     nodeJS : "on",
//     javaScript : "on",
//     image : "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2022/5/25/j8tzdfqjfnxciaca06qc/f1-22-red-bull-racing-rb18-sergio-perez"
//    },
//    {
//     id : 3,
//     projectName : "Ferrari Project",
//     startDate : "2023-06-16",
//     endDate : "2023-08-10",
//     projectDesc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi fugiat eaque itaque ratione natus similique facere ab magnam? Libero, deleniti rem aliquam magni soluta dolorem debitis minus ipsa maiores hic.",
//     nodeJS : "on",
//     javaScript : "on",
//     image : "https://awsimages.detik.net.id/community/media/visual/2023/02/14/ferrari_169.jpeg?w=1200"
//   }

// ]

//routing
//Get
app.get('/', home)
app.get('/contact', contact)
app.get('/testimonials', testimonials)
//Project
app.get('/myproject', myproject)
app.get('/detailproject/:id', projectDetail)
app.get('/delete-project/:id',deleteProject)
app.get('/myproject-edit/:id',myprojectEdit)
app.get('/detailproject', detailproject)
//Blog
app.get('/blog', blog)
app.get('/form-blog', formBlog)
app.get('/blog-detail/:id', blogDetail)
app.get('/delete-blog/:id',deleteBlog)
app.get('/edit-blog/:id', editBlogPage)

//post
//Project
app.post('/myproject', addProject)
app.post('/myproject-edit/:id',editProject)
//blog
app.post('/form-blog', addBlog)
app.post('/edit-blog/:id',editBlog)

async function home(req,res){

  try {
    const query = `SELECT id, name, start_date, end_date, description, technologies, image, "createdAt", "updatedAt" FROM public.projects`;
    let obj =  await sequelize.query(query, {type: QueryTypes.SELECT});

    const data = obj.map((res) => ({
      ...res,
      duration: dateDuration(res.start_date, res.end_date),
      technologies:{
        nodeJS: true,
        reactJS: true,
        javaScript : false,
        HTML : true,
      },
    }));

    // console.log(data)
    
    res.render('index', {project : data})
  } catch (error) {
    console.log(err)
  }

}


function projectDetail(req,res){
  const { id } = req.params

  res.render('detailproject', { project: dummyProjectData[id] })
}


//AddProject
function addProject(req,res){
  const {
    projectName,
    startDate,
    endDate,
    projectDesc,
    nodeJS,
    reactJS,
    javaScript,
    HTML,
    image,
  } = req.body;

  //Duration
  let startDateValue = new Date(startDate);
  let endDateValue = new Date(endDate);

  let rentangWaktu = endDateValue.getTime() - startDateValue.getTime();
  let rentangHari = rentangWaktu / (1000 * 3600 * 24);
  let rentangMinggu = Math.floor(rentangHari / 7);
  let rentangBulan = Math.floor(rentangHari / 30);
  let rentangTahun = Math.floor(rentangHari / 365);
  let durationProject = "";

  if (rentangTahun > 0) {
    durationProject = rentangTahun + " Tahun Lagi";
  } else if (rentangBulan > 0) {
    durationProject = rentangBulan + " Bulan Lagi";
  } else if (rentangMinggu > 0) {
    durationProject = rentangMinggu + " Minggu Lagi";
  } else {
    durationProject = rentangHari + " Hari Lagi";
  }

  const newDataProject = {
    projectName,
    startDate,
    endDate,
    durationProject,
    projectDesc,
    nodeJS,
    reactJS,
    javaScript,
    HTML,
    image:
      "https://akcdn.detik.net.id/visual/2022/10/24/motor-f1-usa_169.jpeg?w=650",
  };

  dummyProjectData.push(newDataProject);
  res.redirect("/");
}

//DeleteProject
function deleteProject (req,res){
  const {id} = req.params

  dummyProjectData.splice(id, 1)
  
  res.redirect('/')
}


//EditProject
function myprojectEdit(req,res){

  const {id} = req.params

  res.render('myproject-edit', {project:dummyProjectData[id]})
}

function editProject(req,res){

  const { id } = req.params;

  const {
    projectName,
    startDate,
    endDate,
    projectDesc,
    nodeJS,
    reactJS,
    javaScript,
    HTML,
    image,
  } = req.body;

  //Duration
  let startDateValue = new Date(startDate);
  let endDateValue = new Date(endDate);

  let rentangWaktu = endDateValue.getTime() - startDateValue.getTime();
  let rentangHari = rentangWaktu / (1000 * 3600 * 24);
  let rentangMinggu = Math.floor(rentangHari / 7);
  let rentangBulan = Math.floor(rentangHari / 30);
  let rentangTahun = Math.floor(rentangHari / 365);
  let durationProject = "";

  if (rentangTahun > 0) {
    durationProject = rentangTahun + " Tahun Lagi";
  } else if (rentangBulan > 0) {
    durationProject = rentangBulan + " Bulan Lagi";
  } else if (rentangMinggu > 0) {
    durationProject = rentangMinggu + " Minggu Lagi";
  } else {
    durationProject = rentangHari + " Hari Lagi";
  }

  const newDataProject = {
    projectName,
    startDate,
    endDate,
    durationProject,
    projectDesc,
    nodeJS,
    reactJS,
    javaScript,
    HTML,
    image:
      "https://akcdn.detik.net.id/visual/2022/10/24/motor-f1-usa_169.jpeg?w=650",
  };

  dummyProjectData[id] = newDataProject

  res.redirect('/')

}





// ==========================================================================

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
  // const {id} = req.params

  // const data = {
  //   id,
  //   title: "Pasar Coding di Indonesia Dinilai Masih Menjanjikan",
  //   content: "Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir."
  // }

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

