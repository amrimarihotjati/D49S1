//Dummy Card
function dummyCard() {
  document.getElementById("container-project-list").innerHTML = "";

  for (let i = 0; i < 8; i++) {
    // random image

    let listImageDummyRandom = [
      "https://hips.hearstapps.com/hmg-prod/images/george-russel-mercedes-amg-f1-team-mercedes-amg-f1-w13-e-news-photo-1656621604.jpg",
      "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2022/5/25/j8tzdfqjfnxciaca06qc/f1-22-red-bull-racing-rb18-sergio-perez",
      "https://awsimages.detik.net.id/community/media/visual/2023/02/14/ferrari_169.jpeg?w=1200",
      "https://www.goodwood.com/globalassets/.road--racing/f1/2023/---standings-and-calendar---/hungarian-gp-steve-etherington-mi-01.jpg?crop=(0,0,2600,1463)&width=1600",
      "https://cdn.antaranews.com/cache/1200x800/2023/03/04/000_339X3AR.jpg",
      "https://cdn-9.motorsport.com/images/amp/0ZRK5g40/s6/lewis-hamilton-mercedes-f1-w14.jpg",
      "https://media.formula1.com/image/upload/content/dam/fom-website/manual/2023/Testing2023/verstappen.png.transform/9col/image.png",
      "https://e0.365dm.com/23/02/2048x1152/skysports-ferrari-f1-car-launch_6056922.jpg",
      "https://akcdn.detik.net.id/visual/2022/10/24/motor-f1-usa_169.jpeg?w=650",
    ];

    let imageRandom = parseInt(Math.random() * listImageDummyRandom.length);

    console.log(imageRandom);
    console.log(listImageDummyRandom[imageRandom]);

    document.getElementById("container-project-list").innerHTML += `
    <div class="card" style="width: 18rem;">
    <img src="${listImageDummyRandom[imageRandom]}" class="card-img-top" style="height:200px; object-fit:cover;">
    <div class="card-body">
        <h2 class="card-title text-start">Redbull Project</h2>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem nisi distinctio, perspiciatis necessitatibus culpa iusto! Accusamus tenetur sunt.</p>
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
    </div>
          `;
  }
}

dummyCard();
