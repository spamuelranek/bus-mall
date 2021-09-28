'use strict';

let allImages=[];
let tempImage = [0,0,0];
let totalVotes = 0;

// creates instances of Pictures in voting
function PictureInfo(picName, fileName){
    this.name = picName;
    this.fileName = 'img/' + fileName;
    this.imageView = 0;
    this.imageVote = 0;
    allImages.push(this);
}

// created with these instaiations
new PictureInfo('Baby','baby.png');
new PictureInfo('Banana','banana.jpeg');
new PictureInfo('Bathroom','bathroom.jpeg');
new PictureInfo('Boots','boots.jpeg');
new PictureInfo('Breakfast','breakfast.jpeg');
new PictureInfo('Bubblegum','bubblegum.jpeg');
new PictureInfo('Chair','chair.jpeg');
new PictureInfo('Cthulhu','Cthulhu.jpeg');
new PictureInfo('Dog Duck','dog-duck.jpeg');
new PictureInfo('Dragon','dragon.jpeg');
new PictureInfo('Pen','pen.jpeg');
new PictureInfo('Pet-Sweep','pet-sweep.jpeg');
new PictureInfo('Scissors', 'scissors.jpeg');
new PictureInfo('Shark', 'shark.jpeg');
new PictureInfo('R2D2', 'starwars-bag.jpeg');
new PictureInfo('Tauntaun', 'tauntaun.jpeg');
new PictureInfo('Unicorn', 'unicorn.jpeg');
new PictureInfo('Water-can', 'water-can.jpeg');
let testCase = new PictureInfo('Wine-glass', 'wine-glass.jpeg');

//random number generator
function numberGenerator(lengthOfArray){
    let randomNumber = Math.floor(Math.random() * lengthOfArray);
    return randomNumber;
}


// creates a modified array that does not include the last displayed images
function modifiedPictures(){

    let newSelectionArray = [];
    console.log(nameArray);

    for (let i = 0; i < allImages.length; i++){
        if (allImages[i].name === nameArray[0]){
            continue;
        }
        if (allImages[i].name === nameArray[1]){
            continue;
        }
        if (allImages[i].name === nameArray[2]){
            continue;
        }
        else{
            newSelectionArray.push(allImages[i]);
        }

    }

    return newSelectionArray;
}


//random number index
function randomNumberIndex (length){

    let totalIndex = [];
    for(let i =0; i< 3; i++){
        totalIndex.push(numberGenerator(length));
    }

    while(totalIndex[0]=== totalIndex[1]||totalIndex[0] === totalIndex[2]||totalIndex[1]=== totalIndex[2]){

        totalIndex[0] = numberGenerator(length);
        totalIndex[1] = numberGenerator(length);
        totalIndex[2] = numberGenerator(length);
        console.log('how long is too long');
    }

    for(let i = 0; i<totalIndex.length; i++){
        tempImage[i] = totalIndex[i];
    }


    return totalIndex;
}

// chooses the images displayed
function imageChooser(randomIndex,totalArray){

    let nameS = [];

    //  makes easier to read
    let leftAllIndex = totalArray[randomIndex[0]];
    let centerAllIndex = totalArray[randomIndex[1]];
    let rightAllIndex = totalArray[randomIndex[2]];

    // adds source for the left image and name is set
    leftImage.src = leftAllIndex.fileName;
    leftImage.name = leftAllIndex.name;
    leftAllIndex.imageView++;
    nameS.push(leftImage.name);

    // adds source for the left image and name is set
    centerImage.src = centerAllIndex.fileName;
    centerImage.name = centerAllIndex.name;
    centerAllIndex.imageView++;
    nameS.push(centerImage.name);

    // adds source for the left image and name is set
    rightImage.src = rightAllIndex.fileName;
    rightImage.name = rightAllIndex.name;
    rightAllIndex.imageView++;
    nameS.push(rightImage.name);

    return nameS;

}

// collects the different HTML elements needed to run event
let imageLanding = document.getElementById('imagePlacement');
let leftImage = document.getElementById('leftImage');
let centerImage = document.getElementById('centerImage');
let rightImage = document.getElementById('rightImage');


// picture click event function
function imageClicker(event){

    event.preventDefault;

    totalVotes++;

    let imageName = event.target;

    for (let i =0; i <allImages.length; i++){
        if(imageName.name === allImages[i].name){
            allImages[i].imageVote++;
            break;
        }
    }
    console.log(totalVotes);
    if (totalVotes<25){
    let modifiedAllImages = modifiedPictures();
    let newRandom =randomNumberIndex(modifiedAllImages.length);
    nameArray = imageChooser(newRandom,modifiedAllImages);
    }
    else{
        leftImage.removeEventListener('click',imageClicker);
        centerImage.removeEventListener('click',imageClicker);
        rightImage.removeEventListener('click',imageClicker);
        let parentEl = document.getElementById('tab');
        let buttonEl = document.createElement('button');
        buttonEl.setAttribute('id','buttonResults');
        buttonEl.innerText = 'View Results';
        parentEl.appendChild(buttonEl);
        let buttonResults = document.getElementById('buttonResults');
        buttonResults.addEventListener('click',printResults);

    }
}


function printResults (event){
    event.preventDefault();
    let ulEl = document.getElementById('results');
    ulEl.innerHTML = '';
    for(let i = 0; i<allImages.length; i++){
        console.log ('woot');
        let liEl = document.createElement('li');
        liEl.innerText =allImages[i].name + ' has ' + allImages[i].imageVote + ' votes, and was seen ' + allImages[i].imageView + ' times.';
        ulEl.appendChild(liEl);

    }
}






leftImage.addEventListener('click',imageClicker);
centerImage.addEventListener('click',imageClicker);
rightImage.addEventListener('click',imageClicker);

// console.log(allImages);
let starterIndex = randomNumberIndex(allImages.length);
let nameArray = imageChooser(starterIndex,allImages);

