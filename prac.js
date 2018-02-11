'use strict';

var imageBox = document.getElementById('itemContainer');
var beginAsking = document.getElementById('beginAsking');
var userClicks = 0;
var imageShown = 3;
var allPics = [];
var shownPics = [];
var picNames = [];
var selected = [];

function Item(name, pic, shown, clicked) {
  this.name = name;
  this.pic = pic;
  this.shown = shown;
  this.clicked = clicked;
  picNames.push(this);
}

if (localStorage.allProducts) {
  var retrieveStorage = localStorage.getItem('allPics');
  allPics = JSON.parse(retrieveStorage);
}
else {
  new Item('banana', './imgdir/banana.jpg', 0, 0);
  new Item('boots', './imgdir/boots.jpg', 0, 0);
  new Item('breakfast', './imgdir/breakfast.jpg', 0, 0);
  new Item('chair', './imgdir/chair.jpg', 0, 0);
  new Item('dogDuck', './imgdir/dog-duck.jpg', 0, 0);
  new Item('dragon', './imgdir/dragon.jpg', 0, 0);
  new Item('goblin', './imgdir/goblin.jpg', 0, 0);
  new Item('ipadStand', './imgdir/ipadStand.jpg', 0, 0);
  new Item('meatballs', './imgdir/meatballs.jpg', 0, 0);
  new Item('pen', './imgdir/pen.jpg', 0, 0);
  new Item('pet-sweep', './imgdir/pet-sweep.jpg', 0, 0);
  new Item('r2d2', './imgdir/r2d2.jpg', 0, 0);
  new Item('sleep', './imgdir/sleep.jpg', 0, 0);
  new Item('unicorn', './imgdir/unicorn.jpg', 0, 0);
  new Item('usb', './imgdir/usb.jpg', 0, 0);
  new Item('water', './imgdir/water.jpg', 0, 0);
  new Item('wine', './imgdir/wine.jpg', 0, 0);
  localStorage.setItem('allPics', JSON.stringify(allPics));
}


function handleBegin() {
  createRandomItems();
  beginAsking.innerHTML = '';
}
function handleRandoms(event) {
  event.preventDefault();
  if(event.target === event.currentTarget) {
    alert('Select 1 picture please.  Thanks');
    return;
  }
  userClicks =+ 1;
  for(var i=0; i<shownPics.length; i++) {
    if(event.target.id === shownPics[i].name) {
      shownPics[i].clicked += 1;
      clearItems();
      createRandomItems();
      break;
    }
  }
}

function createRandomItems() {
  if (allPics.length < imageShown) {
    resetArrays();
  }
  for (var i = 0; i < imageShown; i++) {
    var image = document.createElement('img');
    var randomIndex = Math.floor(Math.random() * allPics.length);
    image.pic = allPics[randomIndex].pic;
    image.id = allPics[randomIndex].name;
    itemContainer.appendChild(image);
    allPics[randomIndex].displayed += 1;
    shownPics.push(allPics[randomIndex]);
    allPics.splice(randomIndex, 1);
  }
  if (userClicks === 25) {
    end();
    return;
  }
  console.log(allPics);
  console.log(shownPics);
  return;
}

//createRandomItems();

function clearItems() {
  imageBox.innerHTML = '';
}

function resetArrays() {
  allPics = allPics.concat(shownPics);
  shownPics = [];
}

// function handleRandom(event) {
//   event.preventDefault();

//   if (event.target === event.currentTarget) {
//     alert('Please choose one!');
//     return;
//   }
//   userClicks += 1;
//   for (var i = 0; i < shownPics.length; i++) {
//     if (event.target.id === shownPics[i].name) {
//       shownPics[i].clicked += 1;
//       clearItems();
//       createRandomItems();
//       break;
//     }
//   }
// }

function end() {
  clearItems();
  resetArrays();
  alert('Thanks for helping.');
  imageBox.removeEventListener('click', handleRandoms);

  for (var i = 0; i < allPics.length; i++) {
    selected[i] = allPics[i].clicked;
    picNames[i] = allPics[i].name;
  }

  var done = localStorage.setItem('allPics', JSON.stringify(allPics));
  console.log(done);

  var chosenListButtonHere = document.getElementById('chosenListButtonHere');
  var chosenListButton = document.createElement('button');
  chosenListButton.id = 'chosenListButton';  
  chosenListButton.type = 'chosen';
  chosenListButton.textContent = 'Outcomes';
  chosenListButtonHere.appendChild(chosenListButton);
  chosenListButtonHere.addEventListener('click', showListChosen);

  var chartButtonHere = document.getElementById('chartButtonHere');
  var chartButton = document.createElement('button');
  chartButton.id = 'chartButton';  
  chartButton.type = 'chosen';
  chartButton.textContent = 'Outcomes';
  chartButtonHere.appendChild(chartButton);
  chartButtonHere.addEventListener('click', showChartChosen);
}
function showListChosen(event) {
  event.preventDefault();
  chosenListButtonHere.innerHTML = '';
  chosenListButtonHere.removeEventListener('click', showListChosen);
  var chosenList = document.getElementById('chosenList');
  for (var i = o; i < allPics.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = allPics[i].name + ' has been clicked ' + allPics[i].clicked + ' times.  It has been shown ' + allPics[i].shown + ' times.';
    chosenList.appendChild(liEl);
  }        //       click.appendChild(liEl);
}

function showChartChosen(event) {
  event.preventDefault();
  chartButtonHere.innerHTML = '';
  chartButtonHere.removeEventListener('click', showChartChosen);
  var barData = {
    labels: picNames,
    datasets: [{ data: selected, }]
  };
  var chosen = document.getElementById('chosen').getContext('2d');
  var chosenChart = new Chart(chosen).Bar(barData);
}

beginAsking.addEventListener('click', handleBegin);
imageBox.addEventListener('click', handleRandoms);
//     clearImages();
//     alert("Thanks, you have clicked 25 times");
//     imageBox.removeEventListener('click', handleRandom);
//     resetArrays();
//     var click = document.getElementById('click');
//     for(var i=0; i< allPics.length; i++){
//       var liEl = document.createElement('li');
//       liEl.textContect=allPics[i].name + ' has been clicked ' + allPics[i].clicked + 'times.  It has been shown ' + allPics[i].shown + ' times.';
//       click.appendChild(liEl);
//     }
//   }
//   userClicks += 1;
//   for(var i=0; i < shownPics.length; i++) {
//     if (event.target.id === shownPics[i].name) {
//       shownPics[i].clicked += 1 ;
//       clearImages();
//       createRandomItems();
//       break;
//     }
//   }
// }