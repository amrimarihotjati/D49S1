const express = require('express')
const app = express()
const port = 3000
const path = require('path')

//LocalHost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//handlebars
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

//staticfiles
app.use(express.static('src/assets'))

app.use(express.urlencoded({extended:false}))

//routing
//Get
app.get('/', home)
app.get('/myproject', myproject)
app.get('/contact', contact)
app.get('/testimonials', testimonials)
app.get('/detailproject', detailproject)
app.get('/blog', blog)
app.get('/blog-detail', blogDetail)
app.get('/form-blog', formBlog)

//post
app.post('/form-blog', addBlog)
app.post('/myproject', addProject)

function home(req,res){
  res.render('index')
}

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
  const {id} = req.params

  const data = {
    id,
    title: "Pasar Coding di Indonesia Dinilai Masih Menjanjikan",
    content: "Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir."
  }

  res.render('blog', {data})
}

function blogDetail(req,res){
  res.render('blog-detail')
}

function formBlog(req,res){
  res.render('form-blog')
}

function addBlog(req,res){
  const { title, content, image } = req.body

  console.log(title)
  console.log(content)
  console.log(image)

  console.log(req.body)

  res.redirect('blog')
}

function addProject(req,res){
  const { projectName, startDate, endDate, projectDesc, nodeJS, reactJS, javaScript, HTML, image } = req.body

  console.log(projectName)
  console.log(projectDesc)
  console.log(startDate)
  console.log(endDate)
  console.log(nodeJS)
  console.log(reactJS)
  console.log(javaScript)
  console.log(HTML)
  console.log(image)

  console.log(req.body)

  res.redirect('myproject')
}


