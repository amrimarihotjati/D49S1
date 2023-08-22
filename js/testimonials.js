
//get data from JSON
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



//FilteredTestimonials
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

