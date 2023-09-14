const animals = [
    {
        petName: 'sloth',
        petImages: [
            'https://i.pinimg.com/originals/c3/17/1d/c3171dfe0eb3194002162fae0af26151.png',
            'https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f9a5.png',
            'https://www.wildrepublic.com/wp-content/uploads/2022/05/sloth_fall_down.png',
            'https://cdn-icons-png.flaticon.com/512/7508/7508402.png',
            'https://cdn-icons-png.flaticon.com/512/7508/7508459.png'
        ]
    },
    {
        petName: 'giraffe',
        petImages: [
            'https://clipart-library.com/images/BTgEg7yec.png',
            'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/9964/giraffe-pirate-clipart-md.png',
            'https://www.pinclipart.com/picdir/big/525-5253968_cartoon-giraffe-clipart.png',
            'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/17618/giraffe-baker-clipart-md.png',
            'https://freesvg.org/img/Giraffe_verliebt.png'
        ]
    },
    {
        petName: 'cat',
        petImages: [
            'https://upload.wikimedia.org/wikipedia/en/f/fd/Pusheen_the_Cat.png',
            'https://i.pinimg.com/originals/c7/5b/95/c75b95690008c9b4cb71426d4b8aff78.png',
            'https://stickershop.line-scdn.net/stickershop/v1/product/23974/LINEStorePC/main.png',
            'https://media1.giphy.com/media/ewQ0xZev0wSRMWXS0V/200w.gif?cid=82a1493b68dwyfk7ommrofdqd5vc79eaih30ob2o9mbrk87f&ep=v1_gifs_related&rid=200w.gif&ct=s',
            'https://media0.giphy.com/media/YT8NIA8fU2pz6Gf2kR/giphy.gif?cid=6c09b952ogt2yhz2xeiorvv8oqfuvz0now4g11q84zgnutin&ep=v1_stickers_related&rid=giphy.gif&ct=s'
        ]
    },
    {
        petName: 'dog',
        petImages: [
            'https://cdn.pixabay.com/photo/2023/03/09/23/10/dog-7841024_1280.png',
            'https://cdn.pixabay.com/photo/2019/02/12/23/41/animation-3993429_640.png',
            'https://petkeen.com/wp-content/uploads/2023/05/Santas-Little-Helper-20th-Television-Animation-property-of-The-Walt-Disney-Company.png',
            'https://static.vecteezy.com/system/resources/previews/026/419/511/original/cute-dog-in-the-style-of-colorful-animation-generative-ai-png.png',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Goat_cartoon_04.svg/376px-Goat_cartoon_04.svg.png'
        ]
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

function startGame(pet) {
    if (!interval) {
        interval = setInterval(randomHungerEggXp, 1000);
    }
    // setInterval(randomHungerEggXp, 1000);
    let {petName, petImages} = animals.find(animal => animal.petName === pet);
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
    function randomHungerEggXp() {
        let randomHunger = randomNum(4);
        petInfo.hunger -= randomHunger;
        if (petInfo.hunger < 0) {
            petInfo.gameover = true;
        }
        if (petInfo.hunger > 100) {
            petInfo.hunger = 100;
            petInfo.gameover = false;
        }
        if (randomNum(100) > 70) petInfo.eggs.push({eggPrice: randomNum(5) + 1});
        petInfo.xp += 5;
        if (petInfo.xp >= 100) {
            petInfo.level = 2;
        }
        if (petInfo.xp >= 200) {
            petInfo.level = 3;
        }
        if (petInfo.xp >= 300) {
            petInfo.level = 4;
        }
        if (petInfo.xp >= 400) {
            petInfo.level = 5;
        }

        petInfo.petSelected.petImage = petImages[petInfo.level - 1];
        return petInfo;
    }
}

module.exports = {
    petSelection: () => {
        if (interval) {
            clearInterval(interval);
            interval = 0;
        }
        return animals;
    },
    selectPet: (pet) => {
        startGame(pet);
        let {petName, petImages} = animals.find(animal => animal.petName === pet);
        petInfo.petSelected = {petName: petName, petImage: petImages[petInfo.level - 1]};
        return petInfo;
    },
    sendData: () => {
        return petInfo;
    },
    feedPet: () => {
        petInfo.hunger += Math.floor(Math.random() * 8) + 3;
        if (petInfo.hunger > 100) {
            petInfo.hunger = 100;
        }
        petInfo.money -= petInfo.foodPrice;
        return petInfo;
    },
    sell: (eggIndex) => {
        petInfo.money += petInfo.eggs[eggIndex].eggPrice;
        petInfo.eggs = petInfo.eggs.filter((egg,index) => index !== Number(eggIndex))
        return petInfo;
    }
}