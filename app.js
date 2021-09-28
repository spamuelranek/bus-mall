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

// function newIndexcheckTemp (indexLocation,tempImageIndex){
//      while(indexLocation === tempImageIndex){
//          indexLocation = numberGenerator();
//      }
// }

function modifiedPictures(){

    let newSelectionArray = [];
    console.log(nameArray);

    for (let i = 0; i < allImages.length; i++){
        if (allImages[i].name === nameArray[0]){
            console.log(allImages[i]);
            continue;
        }
        if (allImages[i].name === nameArray[1]){
            console.log(allImages[i]);
            continue;
        }
        if (allImages[i].name === nameArray[2]){
            console.log(allImages[i]);
        }
        else{
            newSelectionArray.push(allImages[i]);
        }

    }
    console.log(newSelectionArray);
    return newSelectionArray;
}


//random number index
function randomNumberIndex (length){
    
    let totalIndex = [];
    for(let i =0; i< 3; i++){
        totalIndex.push(numberGenerator(length));
    }
    // let leftIndex = numberGenerator();
    // newIndexcheckTemp(leftIndex,tempImage[0]);

    // let centerIndex = numberGenerator();
    // newIndexcheckTemp(centerIndex,tempImage[1]);

    // let rightIndex = numberGenerator();
    // newIndexcheckTemp(rightIndex,tempImage[2]);

    // let totalIndex=[leftIndex,centerIndex,rightIndex];

    while(totalIndex[0]=== totalIndex[1]||totalIndex[0] === totalIndex[2]||totalIndex[1]=== totalIndex[2]){

        totalIndex[0] = numberGenerator(length);
        totalIndex[1] = numberGenerator(length);
        totalIndex[2] = numberGenerator(length);
        console.log('how long is too long');
    }
    console.log(totalIndex);
    for(let i = 0; i<totalIndex.length; i++){
        tempImage[i] = totalIndex[i];
    }
    console.log(totalIndex);

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
            console.log(allImages[i].name,'The amount of votes: ' + allImages[i].imageVote + ' per ' +allImages[i].imageView);
            break;
        }
    }

    let modifiedAllImages = modifiedPictures();
    let newRandom =randomNumberIndex(modifiedAllImages.length);
    nameArray = imageChooser(newRandom,modifiedAllImages);
}

leftImage.addEventListener('click',imageClicker);
centerImage.addEventListener('click',imageClicker);
rightImage.addEventListener('click',imageClicker);

console.log(allImages);
let starterIndex = randomNumberIndex(allImages.length);
let nameArray = imageChooser(starterIndex,allImages);

