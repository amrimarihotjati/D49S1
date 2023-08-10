

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

  if (rentangHari <= 6) {
    rentangProject = rentangHari + " Hari Lagi";
  } else if (rentangMinggu <= 3) {
    rentangProject = rentangMinggu + " Minggu Lagi";
  } else if (rentangBulan >= 1) {
    rentangProject = rentangBulan + " Bulan Lagi";
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
    document.getElementById("container-project-list").innerHTML += `
        <div class="container-card-project">
        <div class="image-project-container">
            <img id="image-project-list" class="image-project-list" src="https://media.formula1.com/image/upload/v1685200925/trackside-images/2023/F1_Grand_Prix_of_Monaco___Qualifying/1493777111.jpg.transform/9col-retina/image.jpg"/>
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
            <button type="button" id="edit-button">Edit</button>
            <button type="button" id="delete-button">Delete</button>
        </div>
         </div>
        `;
  }
}

dummyCard()



