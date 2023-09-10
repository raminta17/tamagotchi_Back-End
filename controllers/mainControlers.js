const path = require('path');

const animals = [
    {
        petName: 'sloth',
        petImages: {
            level1: 'https://i.pinimg.com/originals/c3/17/1d/c3171dfe0eb3194002162fae0af26151.png',
            level2: 'https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f9a5.png',
            level3: 'https://www.wildrepublic.com/wp-content/uploads/2022/05/sloth_fall_down.png',
            level4: 'https://images.fineartamerica.com/images/artworkimages/medium/3/sloth-tired-sleeping-sloth-todo-list-eq-designs-transparent.png',
            level5: 'https://cdn-icons-png.flaticon.com/512/7508/7508459.png'
        }
    },
    {
        petName: 'giraffe',
        petImages: {
            level1: 'https://i.pinimg.com/originals/c3/17/1d/c3171dfe0eb3194002162fae0af26151.png',
            level2: 'https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f9a5.png',
            level3: 'https://www.wildrepublic.com/wp-content/uploads/2022/05/sloth_fall_down.png',
            level4: 'https://images.fineartamerica.com/images/artworkimages/medium/3/sloth-tired-sleeping-sloth-todo-list-eq-designs-transparent.png',
            level5: 'https://cdn-icons-png.flaticon.com/512/7508/7508459.png'
        },
        petImage: 'https://clipart-library.com/images/BTgEg7yec.png'
    },
    {
        petName: 'cat',
        petImages: {
            level1: 'https://i.pinimg.com/originals/c3/17/1d/c3171dfe0eb3194002162fae0af26151.png',
            level2: 'https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f9a5.png',
            level3: 'https://www.wildrepublic.com/wp-content/uploads/2022/05/sloth_fall_down.png',
            level4: 'https://images.fineartamerica.com/images/artworkimages/medium/3/sloth-tired-sleeping-sloth-todo-list-eq-designs-transparent.png',
            level5: 'https://cdn-icons-png.flaticon.com/512/7508/7508459.png'
        },
        petImage: 'https://static.vecteezy.com/system/resources/previews/008/483/594/original/cute-cat-cartoon-kitten-pet-png.png'
    },
    {
        petName: 'dog',
        petImages: {
            level1: 'https://i.pinimg.com/originals/c3/17/1d/c3171dfe0eb3194002162fae0af26151.png',
            level2: 'https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f9a5.png',
            level3: 'https://www.wildrepublic.com/wp-content/uploads/2022/05/sloth_fall_down.png',
            level4: 'https://images.fineartamerica.com/images/artworkimages/medium/3/sloth-tired-sleeping-sloth-todo-list-eq-designs-transparent.png',
            level5: 'https://cdn-icons-png.flaticon.com/512/7508/7508459.png'
        },
        petImage: 'https://cdn.pixabay.com/photo/2023/03/09/23/10/dog-7841024_1280.png'
    }

]

let petInfo = {
    petSelected: {
        petName: '',
        petImage: ''
    },
    hunger: 100,
    money: 0,
    foodPrice: 10,
    eggs: [],
    level: 1,
    xp: 0,
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
            petSelected: {
                petName: '',
                petImage: ''
            },
            hunger: 100,
            money: 0,
            foodPrice: 10,
            eggs: [],
            level: 1,
            xp: 0,
            gameover: false
        };
        let {petName, petImages} = animals.find(animal => animal.petName === pet);
        petInfo.petSelected = {petName:petName, petImage: petImages.level1};
        const filePath = path.resolve("./images/"+ pet+ '.png');
        if(!interval)
        {
            interval = setInterval(randomHungerEggXp, 1000);
        }
        function randomHungerEggXp() {
            let randomHunger = randomNum(4);
            petInfo.hunger -= randomHunger;
            if(petInfo.hunger<0) {
                petInfo.gameover = true;
            }
            if(petInfo.hunger>100) {
                petInfo.hunger=100;
                petInfo.gameover = false;
            }
            if(randomNum(100)> 70) petInfo.eggs.push({eggPrice: randomNum(5)+1});
            petInfo.xp += 5;
            if(petInfo.xp >=100) {
                petInfo.level =2;
                petInfo.petSelected.petImage = petImages.level2;
            }
            if(petInfo.xp >=200) {
                petInfo.level =3;
                petInfo.petSelected.petImage = petImages.level3;

            }
            if(petInfo.xp >=300) {
                petInfo.level =4;
                petInfo.petSelected.petImage = petImages.level4;

            }
            if(petInfo.xp >=400) {
                petInfo.level =5;
                petInfo.petSelected.petImage = petImages.level5;
            }


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
        petInfo.money += petInfo.eggs[eggIndex].eggPrice;
        petInfo.eggs = petInfo.eggs.filter((egg,index) => index !== Number(eggIndex))
        res.send({petInfo, message:'egg sold'});
    }

}