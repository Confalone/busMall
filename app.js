'use strict';

var counter = 0;
var justShown = [];
var productArray = [];

function Product(name, pathWay) {
  this.name = name;
  this.pathWay = pathWay;
  this.shown = 0;
  this.clicked = 0;
  productArray.push(this);
}

var bananas = new Product('banana', './imgdir/banana.jpg');
var boots = new Product('boots', './imgdir/boots.jpg');
var breakfast = new Product('breakfast', './imgdir/breakfast.jpg');
var chair = new Product('chair', './imgdir/chair.jpg');
var dog = new Product('dogDuck', './imgdir/dog-duck.jpg');
var dragon = new Product('dragon', './imgdir/dragon.jpg');
var goblin = new Product('goblin', './imgdir/goblin.jpg');
var ipad = new Product('ipadStand', './imgdir/ipadStand.jpg');
var meat = new Product('meatballs', './imgdir/meatballs.jpg');
var pen = new Product('pen', './imgdir/pen.jpg');
var pet = new Product('pet-sweep', './imgdir/pet-sweep.jpg');
var r2d2 = new Product('r2d2', './imgdir/r2d2.jpg');
var sleep = new Product('sleep', './imgdir/sleep.jpg');
var unicorn = new Product('unicorn', './imgdir/unicorn.jpg');
var usb = new Product('usb', './imgdir/usb.gif');
var water = new Product('water', './imgdir/water-can.jpg');
var wine = new Product('wine', './imgdir/wine-glass.jpg');

function randomProduct() {
  var getRandomIndex = Math.random() * productArray.length;
  var roundRandomIndex = Math.floor(getRandomIndex);
  return [productArray[roundRandomIndex], roundRandomIndex];
}

var image1 = document.getElementById('image1');
var image2 = document.getElementById('image2');
var image3 = document.getElementById('image3');

var firstRan;
var secondRan;
var thirdRan;

function showRandomImages() {
  firstRan = randomProduct();
  image1.setAttribute('src', firstRan[0].pathWay);

  secondRan = randomProduct();
  while (firstRan[1] === secondRan[1]) {
    secondRan = randomProduct();
  }
  image2.setAttribute('src', secondRan[0].pathWay);

  thirdRan = randomProduct();
  while (secondRan[1] === thirdRan[1] || thirdRan[1] === firstRan[1]) {
    thirdRan = randomProduct();
  }
  image3.setAttribute('src', thirdRan[0].pathWay);

  justShown = [];
  justShown.push(firstRan[1]);
  justShown.push(firstRan[1]);
  justShown.push(firstRan[1]);
}

image1.addEventListener('click', function () {
  firstRan.clicked += 1;
  counter += 1;
  showRandomImages();
});
image2.addEventListener('click', function () {
  secondRan.clicked += 1;
  counter += 1;
  showRandomImages();
});
image3.addEventListener('click', function () {
  thirdRan.clicked += 1;
  counter += 1;
  showRandomImages();
});

showRandomImages();

if (counter >= 25) {
  document.getElementById('test').style.display = "none";
}

function imagesToDom () {
  if (counter <25) {
    showRandomImages();
  } else if(counter >= 25) {
    document.getElementById('test').display = 'none';
  }
}