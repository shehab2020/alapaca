let partsStyles = {
    neck: ["default", "forward", "backward", "thick"],
    ears: ["default", "forward", "backward"],
    accessories: ["headphone", "earings", "flower", "glasses"],
    hair: ["default", "bang", "curls", "elegant", "fancy", "quiff", "short"],
    eyes: ["default", "angry", "naughty", "panda","smart","star"],
    leg: ["default", "bubble", "cookie", "game-console","forward","backward"],
    mouth: ["default", "astonished", "eating", "laugh","tongue"],
    backgrounds: ["blue", "green", "red", "yellow","darkblue"],
};

let partsList = document.querySelectorAll('.alpacaParts');
let partStyles = document.querySelectorAll('.partStyles');
let image = document.querySelector('.image');
let randomStylesBtn = document.getElementById("randomStyles");
let downloadBtn = document.getElementById("download");

//loaddefaults
loadDefaults();

// loadparts
loadParts();

//loadstyles
loadstyles()


// Event listeners for parts and styles
partsList[0].addEventListener('click', function(event) {
  if (event.target.classList.contains('alpacaPart')) {
    partsList[0].querySelector('.active').classList.remove('active');
    event.target.classList.add('active');
    loadstyles();
  }
});
partStyles[0].addEventListener('click', function(event) {
  if (event.target.classList.contains('partStyle')) {
    partStyles[0].querySelector('.active')?.classList.remove('active');
    event.target.classList.add('active');
    let activePart = document.querySelector(".alpacaParts .active");
    let a=`alpaca${activePart.id}`;
    let change =document.querySelector(`.${a}`);
    change.src = `alpaca/${activePart.id}/${event.target.id}.png`;
    change.classList.add(`alpaca${activePart.id}`);
    change.id = activePart.id +"-"+ event.target.id;
  }
});
randomStylesBtn.addEventListener("click", function() {
  Object.entries(partsStyles).forEach(([part, styles]) => {
    // Pick a random style from the available options for this part
    let randomStyle = styles[Math.floor(Math.random() * styles.length)];
    
    // Select the corresponding image element
    let img = document.querySelector(`.alpaca${part}`);
    if (img) {
      img.src = `alpaca/${part}/${randomStyle}.png`;
      img.id = part + "-" + randomStyle;
    }

    // If this part is the currently active part, update the active style button
    let activePart = document.querySelector(".alpacaParts .active");
    if (activePart && activePart.id === part) {
      // Remove current active style class
      partStyles[0].querySelector(".active")?.classList.remove("active");

      // Find and activate the random style li
      let randomStyleLi = partStyles[0].querySelector(`#${randomStyle}`);
      if (randomStyleLi) {
        randomStyleLi.classList.add("active");
      }
    }
  });
});
downloadBtn.addEventListener("click", function () {
  let imageContainer = document.getElementById("image");
  
  html2canvas(imageContainer, {
    backgroundColor: null  // Keeps background transparent
  }).then(function (canvas) {
    // Create a link to trigger download
    let link = document.createElement("a");
    link.download = "alpaca.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

//functions

function loadDefaults() {
  let image = document.getElementById("image") || document.createElement("div");
  image.id = "image";
  
  Object.entries(partsStyles).forEach(([part, styles]) => {
    let firstStyle = styles[0];
    let img = document.createElement("img");
    img.src = `alpaca/${part}/${firstStyle}.png`;
    img.classList.add(`alpaca${part}`);
    image.appendChild(img);
    img.id = part + "-"+firstStyle;
  });
let nose =document.createElement("img");
nose.classList.add("alpacanose");
nose.src = "alpaca/nose.png";
image.appendChild(nose);
}

function loadParts() {
    Object.entries(partsStyles).forEach(([part]) => {
    let li = document.createElement('li');
    li.className = "alpacaPart " + part;
    li.innerHTML = part;
    li.id = part;
    partsList[0].appendChild(li);
});
let firstChild = partsList[0].firstChild;
if (firstChild) {
    firstChild.classList.add("active");     
}
}

function loadstyles() {
  // Get the active part li
  let activePart = document.querySelector(".alpacaParts .active");

  let partName = activePart.id;

  // Clear previous styles
  partStyles[0].innerHTML = "";

  // Check if the part exists in partsStyles
  if (partsStyles[partName]) {
    partsStyles[partName].forEach(style => {
      let li = document.createElement('li');
      li.className = "partStyle " + partName + " " + style;
      li.innerHTML = style;
      li.id = style;
      partStyles[0].appendChild(li);
    });
 }
}
