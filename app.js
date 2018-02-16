'use strict';

Product.names = ['banana', 'boots', 'breakfast', 'chair', 'dog-duck', 'dragon', 'goblin', 'iPadStand', 'meatballs', 'pen', 'pet-sweep', 'r2d2', 'sleep', 'unicorn', 'usb', 'water-can', 'wine-glass'];

Product.all = [];
Product.container = document.getElementById('image-container');
Product.justViewed=[];
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementById('tally');
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
function handleClick(event) {
  console.log(Product.totalClicks, 'total clicks');
  if(Product.totalClicks > 24) {
    Product.container.removeEventListener('click', handleClick);
    showTally();
    makeChart();
  }
  if(event.target.id === 'image-container') {
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

Product.container.addEventListener('click', handleClick);
displayPics();

function makeChart () {
  var data= [];
  var labels =[];

  for (i =0; i < Product.all.length; i++) {
    data.push(Product.all[i].votes);
    labels.push(Product.all[i].name);
    console.log('loading chart array ' +i);
  }
  
  var ctx =document.getElementById('chart').getContext('2d');

  var myChart = new Chart (ctx, {
    type: 'bar',
    data: {
      lables: labels,
      datasets: [{
        label: 'number of votes',
        data: data,
        backgroundColor:'red'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}