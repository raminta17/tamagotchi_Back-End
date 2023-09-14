const {petSelection, selectPet, sendData, feedPet, sell} = require('../modules/petModule');


module.exports = {
    sendPetSelection: (req, res) => {
        res.send(petSelection());
    },
    selectPet: (req, res) => {
        let {pet} = req.params;
        const petInfo = selectPet(pet);
        res.send({petInfo, message: 'data refreshed', gameover: petInfo.gameover});

    },
    sendPetData: (req, res) => {
        const petInfo = sendData();
        res.send({petInfo, message: 'data send', gameover: petInfo.gameover});
    },
    feed: (req, res) => {
        const petInfo = sendData();
        if (petInfo.money < petInfo.foodPrice) {
            return res.send({petInfo, message: 'not enough money'});
        }
        if (petInfo.hunger === 100) {
            return res.send({petInfo, message: 'your pet is not hungry'});
        }
        feedPet();
        res.send({petInfo, message: 'pet fed'});
    },
    sellEgg: (req, res) => {
        const {eggIndex} = req.params;
        const petInfo = sell(eggIndex);
        res.send({petInfo, message: 'egg sold'});
    }

}