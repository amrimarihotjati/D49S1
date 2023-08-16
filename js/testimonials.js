
let dataTestimonials = [
    {
        Image : "https://media.formula1.com/image/upload/t_16by9South/f_auto/q_auto/v1692021567/fom-website/2023/August%20Break/GettyImages-1252687923.jpg.transform/9col-retina/image.jpg",
        Quote : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo.",
        Author : "Amri",
        Star : "4"
    },
    {
        Image : "https://media.formula1.com/image/upload/t_16by9Centre/f_auto/q_auto/v1692029137/fom-website/2023/August%20Break/GettyImages-1247794161.jpg.transform/9col-retina/image.jpg",
        Quote : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo.",
        Author : "Izzan",
        Star : "3"
    },
    {
        Image : "https://media.formula1.com/image/upload/t_16by9North/f_auto/q_auto/v1691841385/fom-website/2023/August%20Break/GettyImages-1488026858.jpg.transform/9col-retina/image.jpg",
        Quote : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo.",
        Author : "Nauvalsev",
        Star : "1"
    },
    {
        Image : "https://media.formula1.com/image/upload/t_16by9Centre/f_auto/q_auto/v1691597307/fom-website/2023/Red%20Bull/GettyImages-1248220932.jpg.transform/9col-retina/image.jpg",
        Quote : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo.",
        Author : "Elfady",
        Star : "2"
    },
    {
        Image : "https://media.formula1.com/image/upload/v1690734334/trackside-images/2023/F1_Grand_Prix_of_Belgium/1580921322.jpg.transform/9col-retina/image.jpg",
        Quote : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore pariatur ea possimus provident explicabo.",
        Author : "Jati",
        Star : "5"
    }
]


console.log(dataTestimonials[0].Image)
console.log(dataTestimonials[0].Quote)
console.log(dataTestimonials[0].Author)

function addTestimonials(){
    document.getElementById("container-testi").innerHTML=""

    for(let i = 0; i < dataTestimonials.length; i++){
        document.getElementById("container-testi").innerHTML += `
        <div class="card shadow-sm" style="width: 16rem;" id="card-testi">
        <img src="${dataTestimonials[i].Image}"
            class="card-img-top" alt="...">
        <div class="card-body">
            <div class="card-header rounded mb-1">
                Quote
            </div>
            <blockquote class="blockquote mb-3">
                <p>"${dataTestimonials[i].Quote}"</p>
            </blockquote>
            <div class="card-footer rounded d-flex justify-content-center gap-5">
                        <div class="author">
                            <small class="text-body-secondary">${dataTestimonials[i].Author}</small>
                        </div>
                        <div class="star">
                            <i class="fa-solid fa-star" style="color: #930e2d;"></i>
                            <small class="text-body-secondary">5</small>
                        </div>
            </div>
        </div>
    </div>
        `;
    }
}

addTestimonials()