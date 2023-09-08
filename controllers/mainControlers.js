const path = require('path');

const animals = [
    {
        petName: 'sloth',
        petImage: 'https://i.pinimg.com/originals/c3/17/1d/c3171dfe0eb3194002162fae0af26151.png'
    },
    {
        petName: 'giraffe',
        petImage: 'https://clipart-library.com/images/BTgEg7yec.png'
    },
    {
        petName: 'cat',
        petImage: 'https://static.vecteezy.com/system/resources/previews/008/483/594/original/cute-cat-cartoon-kitten-pet-png.png'
    },
    {
        petName: 'dog',
        petImage: 'https://cdn.pixabay.com/photo/2023/03/09/23/10/dog-7841024_1280.png'
    }

]

let petInfo = {
    petSelected: '',
    hunger: 100,
    money: 100,
    foodPrice: 10,
    eggs: [],
    gameover: false
};
let interval;

function randomNum(num) {
    return Math.floor(Math.random() * num);
}

module.exports = {

    sendPetSelection: (req,res) => {
        res.send(animals);
        if(interval)
        {
            clearInterval(interval);
            interval = 0;
        }
    },
    selectPet: (req,res) => {
        let {pet} = req.params;
        petInfo = {
            petSelected: '',
            hunger: 100,
            money: 100,
            foodPrice: 10,
            eggs: [],
            gameover: false
        };
        let petSelected = animals.find(animal => animal.petName === pet);
        petInfo.petSelected = petSelected;
        const filePath = path.resolve("./images/"+ pet+ '.png');
        if(!interval)
        {
            interval = setInterval(randomHungerAndEgg, 1000);
        }
        function randomHungerAndEgg() {
            let randomHunger = Math.floor(Math.random() * 4);
            petInfo.hunger -= randomHunger;
            if(petInfo.hunger<0) {
                petInfo.gameover = true;
            }
            if(petInfo.hunger>100) {
                petInfo.hunger=100;
                petInfo.gameover = false;
            }
            if(randomNum(100)> 70) petInfo.eggs.push({eggPrice: randomNum(5)+1});
            return petInfo;
        }
        // res.sendFile(filePath);
        res.send({petInfo, message:'data refreshed', gameover: petInfo.gameover});

    },
    sendPetData: (req,res) => {
        res.send({petInfo, message:'data send', gameover: petInfo.gameover});
    },
    feed: (req,res) => {
        if(petInfo.money < petInfo.foodPrice) {
            return res.send({petInfo, message:'not enough money'});
        }else if(petInfo.hunger ===100){
            return res.send({petInfo, message:'your pet is not hungry'});
        }else {
            petInfo.hunger += Math.floor(Math.random() * 8)+3;
            if(petInfo.hunger > 100) {
                petInfo.hunger = 100;
            }
            petInfo.money -= petInfo.foodPrice;
        }
        res.send({petInfo, message:'pet fed'});
    },
    sellEgg: (req,res) => {
        const {eggIndex} = req.params;
        petInfo.money += 5;
        petInfo.eggs = petInfo.eggs.filter((egg,index) => index !== Number(eggIndex))
        res.send({petInfo, message:'egg sold'});
    }

}