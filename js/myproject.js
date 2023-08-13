

let dataProject = [

]

function addMyProject(){
  event.preventDefault();

  let projectImage = document.getElementById("upload-image").files;
  let projectName = document.getElementById("input-project-name").value;
  let projectDescription = document.getElementById("input-description").value;

  //CheckBox

  // IconToPush
  const iconNodeJS = '<i class="fa-brands fa-node-js fa-xl"></i>';
  const iconReactJS = '<i class="fa-brands fa-react fa-xl"></i>';
  const iconJavaScript = '<i class="fa-brands fa-js fa-xl"></i>';
  const iconHTML5 = '<i class="fa-brands fa-html5 fa-xl"></i>';

  //ConditionCheck
  let checkNodeJS = document.getElementById("check-nodejs").checked
    ? iconNodeJS
    : "";
  let checkReactJS = document.getElementById("check-reactjs").checked
    ? iconReactJS
    : "";
  let checkJavaScript = document.getElementById("check-javascript").checked
    ? iconJavaScript
    : "";
  let checkHTML5 = document.getElementById("check-html5").checked
    ? iconHTML5
    : "";

  //Durasi Project
  let startDate = document.getElementById("input-start-date").value;
  let endDate = document.getElementById("input-end-date").value;

  let startDateValue = new Date(startDate);
  let endDateValue = new Date(endDate);

  let rentangWaktu = endDateValue.getTime() - startDateValue.getTime();
  let rentangHari = rentangWaktu / (1000 * 3600 * 24);
  let rentangMinggu = Math.floor(rentangHari / 7);
  let rentangBulan = Math.floor(rentangHari / 30);
  let rentangProject = "";

  if(startDateValue.getTime() > endDateValue.getTime()){
    return Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Pastikan Start Date Lebih ',
      confirmButtonColor: '#930e2d',
      iconColor: '#930e2d'
  })
  }

  if( rentangBulan > 0){
    rentangProject = rentangBulan + " Bulan Lagi";
  } else if(rentangMinggu > 0){
    rentangProject = rentangMinggu + " Minggu Lagi";
  } else {
    rentangProject = rentangHari + " Hari Lagi";
  }


  imageBlob = URL.createObjectURL(projectImage[0]);

  let pushDataProjects = {
    imageBlob,
    projectName,
    projectDescription,
    checkNodeJS,
    checkJavaScript,
    checkReactJS,
    checkHTML5,
    rentangProject
  };

  //AlertForm
  if(projectName == ""||projectDescription == ""){
    return Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Harap lengkapi semua form!',
        confirmButtonColor: '#930e2d',
        iconColor: '#930e2d'
    })
  }

  dataProject.push(pushDataProjects);
  renderProject();
}

function renderProject(){
    document.getElementById("container-project-list").innerHTML = "";

    for(let i = 0; i < dataProject.length; i++){
        document.getElementById("container-project-list").innerHTML += `
        <div class="container-card-project">
                <div class="image-project-container">
                    <img id="image-project-list" class="image-project-list" src="${dataProject[i].imageBlob}"/>
                </div>
                <div class="title-project">
                    <h3>${dataProject[i].projectName}</h3>
                </div>
                <div class="duration-project">
                    <p>Duration : ${dataProject[i].rentangProject}</p>
                </div>
                <div class="description-project">
                    <p>${dataProject[i].projectDescription}</p>
                </div>
                <div class="tech-card-container">
                    <div class="tech-project">
                        ${dataProject[i].checkNodeJS}
                        ${dataProject[i].checkJavaScript}
                        ${dataProject[i].checkReactJS}
                        ${dataProject[i].checkHTML5}
                    </div>
                </div>
                <div class="button-card-container">
                    <button type="button" id="edit-button">Edit</button>
                    <button type="button" id="delete-button">Delete</button>
                </div>
            </div>
        `;
    }
}


//Dummy Card
function dummyCard() {
  document.getElementById("container-project-list").innerHTML = "";

  for (let i = 0; i < 6; i++) {
    // random image

    let listImageDummyRandom = [
      "https://hips.hearstapps.com/hmg-prod/images/george-russel-mercedes-amg-f1-team-mercedes-amg-f1-w13-e-news-photo-1656621604.jpg",
      "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2022/5/25/j8tzdfqjfnxciaca06qc/f1-22-red-bull-racing-rb18-sergio-perez",
      "https://awsimages.detik.net.id/community/media/visual/2023/02/14/ferrari_169.jpeg?w=1200",
      "https://www.goodwood.com/globalassets/.road--racing/f1/2023/---standings-and-calendar---/hungarian-gp-steve-etherington-mi-01.jpg?crop=(0,0,2600,1463)&width=1600",
      "https://cdn.antaranews.com/cache/1200x800/2023/03/04/000_339X3AR.jpg",
      "https://cdn-9.motorsport.com/images/amp/0ZRK5g40/s6/lewis-hamilton-mercedes-f1-w14.jpg",
      "https://media.formula1.com/image/upload/content/dam/fom-website/manual/2023/Testing2023/verstappen.png.transform/9col/image.png",
    ];

    let imageRandom = parseInt(Math.random() * listImageDummyRandom.length);

    console.log(imageRandom);
    console.log(listImageDummyRandom[imageRandom]);

    document.getElementById("container-project-list").innerHTML += `
        <div class="container-card-project">
        <div class="image-project-container">
            <img id="image-project-list" class="image-project-list" src="${listImageDummyRandom[imageRandom]}"/>
        </div>
        <div class="title-project">
            <h3>Redbull Project</h3>
        </div>
        <div class="duration-project">
            <p>Duration : 3 Bulan</p>
        </div>
        <div class="description-project">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate quidem, aperiam quia libero reprehenderit, ut quisquam similique expedita nisi nihil veritatis pariatur corporis distinctio alias inventore asperiores soluta. Voluptatibus, esse.</p>
        </div>
        <div class="tech-card-container">
            <div class="tech-project">
                <i class="fa-brands fa-node-js fa-xl"></i>
                <i class="fa-brands fa-js fa-xl"></i>
                <i class="fa-brands fa-react fa-xl"></i>
                <i class="fa-brands fa-html5 fa-xl"></i>
            </div>
        </div>
        <div class="button-card-container">
            <button onclick="location.href='detailproject.html'" type="button" id="edit-button">Edit</button>
            <button type="button" id="delete-button">Delete</button>
        </div>
         </div>
        `;
  }
}


dummyCard()



