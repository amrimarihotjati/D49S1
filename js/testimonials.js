
// let dataTestimonials = [
//     {
//         image : "https://media.formula1.com/image/upload/t_16by9South/f_auto/q_auto/v1692021567/fom-website/2023/August%20Break/GettyImages-1252687923.jpg.transform/9col-retina/image.jpg",
//         quote : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo.",
//         author : "Amri",
//         rating : 2
//     },
//     {
//         image : "https://media.formula1.com/image/upload/t_16by9Centre/f_auto/q_auto/v1692029137/fom-website/2023/August%20Break/GettyImages-1247794161.jpg.transform/9col-retina/image.jpg",
//         quote : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo.",
//         author : "Izzan",
//         rating : 2
//     },
//     {
//         image : "https://media.formula1.com/image/upload/t_16by9North/f_auto/q_auto/v1691841385/fom-website/2023/August%20Break/GettyImages-1488026858.jpg.transform/9col-retina/image.jpg",
//         quote : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo.",
//         author : "Nauvalsev",
//         rating : 3
//     },
//     {
//         image : "https://media.formula1.com/image/upload/t_16by9Centre/f_auto/q_auto/v1691597307/fom-website/2023/Red%20Bull/GettyImages-1248220932.jpg.transform/9col-retina/image.jpg",
//         quote : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo.",
//         author : "Elfady",
//         rating : 4
//     },
//     {
//         image : "https://media.formula1.com/image/upload/v1690734334/trackside-images/2023/F1_Grand_Prix_of_Belgium/1580921322.jpg.transform/9col-retina/image.jpg",
//         quote : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo.",
//         author : "Jati",
//         rating : 3
//     },
//     {
//         image : "https://static01.nyt.com/images/2021/12/16/multimedia/16sp-review-next-inyt1/16sp-review-next-inyt1-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
//         quote : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo.",
//         author : "Verstappen",
//         rating : 3
//     },
//     {
//         image : "https://cdn.antaranews.com/cache/1200x800/2022/08/20/IMG-F1-1-01.jpeg.webp",
//         quote : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo.",
//         author : "Alonso",
//         rating : 4
//     },
//     {
//         image : "https://assets.kompasiana.com/items/album/2023/05/24/1045223-646e166e822199339709c2f4.jpg?t=o&v=400",
//         quote : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo.",
//         author : "Raikonen",
//         rating : 5
//     }
// ]


const dataTestimonials = new Promise((resolve,reject) => {

    const newData = new XMLHttpRequest()

    newData.open("GET", "https://api.npoint.io/7f5023cd7eb4cd962fb8", true)

    newData.onload = function(){
        if(newData.status == 200){
            resolve(JSON.parse(newData.response))
        }else{
            reject("Error loading data")
        }
    }

    newData.onerror = function(){
        reject("Network Error")
    }

    newData.send()
})


// Show All Testimonials
async function allTestimonials(){

    try {
        const dataJSON = await dataTestimonials
        console.log(dataJSON)

        let testimonialsHTML = ``

        dataJSON.forEach((cardTesti) => {
            testimonialsHTML += `
            <div class="card shadow-sm" style="width: 16rem;" id="card-testi">
            <img class="image-card" src="${cardTesti.image}"
                class="card-img-top" alt="...">
            <div class="card-body">
                <div class="card-header rounded mb-1">
                    Quote
                </div>
                <blockquote class="blockquote mb-3">
                    <p>"${cardTesti.quote}"</p>
                </blockquote>
                <div class="card-footer rounded d-flex justify-content-center gap-5">
                            <div class="author">
                                <small class="text-body-secondary">${cardTesti.author}</small>
                            </div>
                            <div class="star">
                                <i class="fa-solid fa-star" style="color: #930e2d;"></i>
                                <small class="text-body-secondary">${cardTesti.rating}</small>
                            </div>
                </div>
            </div>
            </div>
            `
        })
        document.getElementById("container-testi").innerHTML= testimonialsHTML

    } catch (error) {
        console.log(error)
    }

}

allTestimonials()


async function filterTestimonials(rating){

    try {

        const dataJSON =  await dataTestimonials

        let filteredHTML = ``
    
        const filteredData = dataJSON.filter((cardTesti) => {
            return cardTesti.rating === rating
        })
    
        console.log(filteredData)
    
        if(filteredData.length == 0){
            filteredHTML = `
            <h1>Ooops, Data Not Found </h1>
            `
        }
        
        filteredData.forEach((cardTesti) => {
            filteredHTML += `
            <div class="card shadow-sm" style="width: 16rem;" id="card-testi">
            <img class="image-card" src="${cardTesti.image}"
                class="card-img-top" alt="...">
            <div class="card-body">
                <div class="card-header rounded mb-1">
                    Quote
                </div>
                <blockquote class="blockquote mb-3">
                    <p>"${cardTesti.quote}"</p>
                </blockquote>
                <div class="card-footer rounded d-flex justify-content-center gap-5">
                            <div class="author">
                                <small class="text-body-secondary">${cardTesti.author}</small>
                            </div>
                            <div class="star">
                                <i class="fa-solid fa-star" style="color: #930e2d;"></i>
                                <small class="text-body-secondary">${cardTesti.rating}</small>
                            </div>
                </div>
            </div>
            </div>
            `
        })
    
        document.getElementById("container-testi").innerHTML= filteredHTML
        
    } catch (error) {
        console.log(error)
    }
}

