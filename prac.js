'use strict';
// var counter = 0;
// var justShown = [];
// var productArray = [];

// function Product(name, pathWay) {
//   this.name = name;
//   this.pathWay = pathWay;
//   this.shown = 0;
//   this.clicked = 0;
//   productArray.push(this);
// }

Product.names = ['banana', 'boots', 'breakfast', 'chair', 'dog-duck', 'dragon', 'goblin', 'iPadStand', 'meatballs', 'pen', 'pet-sweep', 'r2d2', 'sleep', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// var bananas = new Product('banana', './imgdir/banana.jpg');
// var boots = new Product('boots', './imgdir/boots.jpg');
// var breakfast = new Product('breakfast', './imgdir/breakfast.jpg');
// var chair = new Product('chair', './imgdir/chair.jpg');
// var dog = new Product('dogDuck', './imgdir/dog-duck.jpg');
// var dragon = new Product('dragon', './imgdir/dragon.jpg');
// var goblin = new Product('goblin', './imgdir/goblin.jpg');
// var ipad = new Product('ipadStand', './imgdir/ipadStand.jpg');
// var meat = new Product('meatballs', './imgdir/meatballs.jpg');
// var pen = new Product('pen', './imgdir/pen.jpg');
// var pet = new Product('pet-sweep', './imgdir/pet-sweep.jpg');
// var r2d2 = new Product('r2d2', './imgdir/r2d2.jpg');
// var sleep = new Product('sleep', './imgdir/sleep.jpg');
// var unicorn = new Product('unicorn', './imgdir/unicorn.jpg');
// var usb = new Product('usb', './imgdir/usb.gif');
// var water = new Product('water', './imgdir/water-can.jpg');
// var wine = new Product('wine', './imgdir/wine-glass.jpg');

Product.all = [];
Product.container = document.getElemetnbyID('image_container');
Product.justViewed=[];
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementByID('tally');
Product.totalClicks = 0;

function Product(name) {
  this.name= name;
  this.path = 'imgdir/' + name + '.jpg'; //this is brilliant
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
}
for(var i = 0; i < Product.names.length; i++) {
  new Product(Product.names[i]);
}

// function randomProduct() {
//   var getRandomIndex = Math.random() * productArray.length;
//   var roundRandomIndex = Math.floor(getRandomIndex);
//   return [productArray[roundRandomIndex], roundRandomIndex];
// }

function makeRandom() {
  return Math.floor(Math.random() * Product.names.length);
}


function displayPics(){
  var currentlyShowing= [];

  currentlyShowing[0] = makeRandom();
  while (Product.justViewed.indexOf(currentlyShowing[0]) !== -1) {
    console.error('Duplicate, or in prior view, re-run.');
    currentlyShowing[0] = makeRandom();
  }
  currentlyShowing[1] = makeRandom();
  while (currentlyShowing[0] === currentlyShowing[1] || Product.justViewed.indexOf(currentlyShowing[1]) !== -1) {
    console.error('Ducplicate at center, or in prior view, re-run.');
    currentlyShowing[1] = makeRandom();
  }
  currentlyShowing[2] = makeRandom();
  while (currentlyShowing[0] === currentlyShowing[2] || currentlyShowing[1] === currentlyShowing[2] || Product.justViewed.indexOf(currentlyShowing[2]) !== -1) {
    console.error('Duplicate on the right, re-run.');
    currentlyShowing[2] = makeRandom();
  }
  for(var i = 0; i <3; i++) {
    Product.pics[i].src = Product.all[currentlyShowing[i]].path;
    Product.pics[i].id = Product.all[currentlyShowing[i]].name;
    Product.all[currentlyShowing[i]].views += 1;
    Product.justViewed[i] = currentlyShowing[i];
  }
}

// image1.addEventListener('click', function () {
//   firstRan.clicked += 1;
//   counter += 1;
//   showRandomImages();
// });
// image2.addEventListener('click', function () {
//   secondRan.clicked += 1;
//   counter += 1;
//   showRandomImages();
// });
// image3.addEventListener('click', function () {
//   thirdRan.clicked += 1;
//   counter += 1;
//   showRandomImages();
// });

// showRandomImages();

// if (counter >= 25) {
//   document.getElementById('test').style.display = "none";
// }

function handleClick(event) {
  console.log(Product.totalClicks, 'total clicks');
  if(Product.totalClicks > 24) {
    Product.container.removeEventListener('click', handleClick);
    showTally();
  }
  if(event.target.id === 'image_container') {
    return alert('Please click on an image, thanks.');
  }

  Product.totalClicks +=1;
  for(var i=0; i< Product.names.length; i++) {
    if(event.target.id === Product.all[i].name) {
      Product.all[i].votes += 1;
      console.log(event.target.id + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views!');
    }
  }
  displayPics();
}

function showTally() {
  for(var i=0; i<Product.all.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views!';
    Product.tally.appendChild(liEl);
  }
}

Product.container.addEventListner('click', handleClick);
displayPics();

// function imagesToDom () {
//   if (counter <25) {
//     showRandomImages();
//   } else if(counter >= 25) {
//     document.getElementById('test').display = 'none';
//   }
// }


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