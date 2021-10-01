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
new PictureInfo('Cthulhu','cthulhu.jpeg');
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

addPreviousRounds();

//adds view and click counts from previous rounds
function addPreviousRounds(){

    // runs the retrieve function and stores it
    let previousAllImages = retrieveValues();

    //updates the views and clicks
    if(previousAllImages !== null){
        for(let i =0; i<allImages.length; i ++){
            if(previousAllImages[i].name === allImages[i].name){
                allImages[i].imageView = previousAllImages[i].imageView;
                allImages[i].imageVote = previousAllImages[i].imageVote;
            }
        }
    }

}

//random number generator
function numberGenerator(lengthOfArray){
    let randomNumber = Math.floor(Math.random() * lengthOfArray);
    return randomNumber;
}


// creates a modified array that does not include the last displayed images
function modifiedPictures(){

    let newSelectionArray = [];

    // filters out previous round of pictures for next selection group
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

    // checks to make sure there is no duplicates. Technically possible infinite loop but very unlikely
    while(totalIndex[0]=== totalIndex[1]||totalIndex[0] === totalIndex[2]||totalIndex[1]=== totalIndex[2]){

        totalIndex[0] = numberGenerator(length);
        totalIndex[1] = numberGenerator(length);
        totalIndex[2] = numberGenerator(length);
        console.log('how long is too long');
    }

    //stores final index in temp to be used to create modified list
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
let leftImage = document.getElementById('leftImage');
let centerImage = document.getElementById('centerImage');
let rightImage = document.getElementById('rightImage');


// picture click event function
function imageClicker(event){

    event.preventDefault;
    
    //increments the total votes global variable
    totalVotes++;

    let imageName = event.target;

    //checks what image was clicked and increments the imageVote value
    for (let i =0; i <allImages.length; i++){
        if(imageName.name === allImages[i].name){
            allImages[i].imageVote++;
            break;
        }
    }
    // console.log(totalVotes);

    //this is what runs while voting is open
    if (totalVotes<25){
        beforeVotingClosed();
        }
    else{
        afterVotingClosed();
    }
}

//this is what runs while voting is open
function beforeVotingClosed(){
    let modifiedAllImages = modifiedPictures();
    let newRandom =randomNumberIndex(modifiedAllImages.length);
    nameArray = imageChooser(newRandom,modifiedAllImages);
}

//this is what runs when voting is closed
function afterVotingClosed(){
    //removes functionality of picture clicks
    leftImage.removeEventListener('click',imageClicker);
    centerImage.removeEventListener('click',imageClicker);
    rightImage.removeEventListener('click',imageClicker);

    //creates result button
    let parentEl = document.getElementById('tab');
    let buttonEl = document.createElement('button');
    buttonEl.setAttribute('id','buttonResults');
    buttonEl.innerText = 'View Results';
    parentEl.appendChild(buttonEl);

    //adds functionality to button click
    let buttonResults = document.getElementById('buttonResults');
    buttonResults.addEventListener('click',printResults);

}

// event function on press of result button
function printResults (event){
    event.preventDefault();
    let ulEl = document.getElementById('results');
    ulEl.innerHTML = '';

    //written results of votes
    for(let i = 0; i<allImages.length; i++){
        let liEl = document.createElement('li');
        liEl.innerText =allImages[i].name + ' has ' + allImages[i].imageVote + ' votes, and was seen ' + allImages[i].imageView + ' times.';
        ulEl.appendChild(liEl);

    }

    //creates chart and parent element
    let chartParent = document.getElementById('imagePlacement');
    let chartCreate = document.createElement('canvas');
    chartCreate.setAttribute('id','clickChart');
    chartParent.appendChild(chartCreate);
    createTable();
}

//function to store all image Objects in local storage
function storeValues(){
    let storeTest = [];
    for(let i= 0; i<allImages.length; i++){
        storeTest.push(allImages[i]);
    }
    let modifiedTest = JSON.stringify(storeTest);
    let storedValue = localStorage.setItem('images',modifiedTest);

}

// retrieves all images from local storage
function retrieveValues(){
    let retrievedTest = localStorage.getItem('images');
    let unmodifiedTest = JSON.parse(retrievedTest);
    return unmodifiedTest;
}

// associated function to create chart.js table
function createTable(){

    //actually stores all image Ojects
    storeValues();

    //produces data sets
    let title =[];
    let views =[];
    let clicks =[];
    for (let i = 0; i<allImages.length; i++){
        title.push(allImages[i].name);
        views.push(allImages[i].imageView);
        clicks.push(allImages[i].imageVote);
    }

    //identifes location for table
    const ctx = document.getElementById('clickChart').getContext('2d');

    //creates chart from data above
    const voteChart = new Chart(ctx, {
        type: 'bar',
        data:{
            labels:title,
            datasets:[
            {
                label:'# of clicks',
                backgroundColor: 'blue',
                data:clicks,
            },
            {
                label:'# of views',
                backgroundColor: 'red',
                data:views,
            }
        ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



//sets event listeners on pictures
leftImage.addEventListener('click',imageClicker);
centerImage.addEventListener('click',imageClicker);
rightImage.addEventListener('click',imageClicker);

//creates intial selection of pictures
let starterIndex = randomNumberIndex(allImages.length);
let nameArray = imageChooser(starterIndex,allImages);


