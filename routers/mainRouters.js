const express = require('express');
const router = express.Router();

const {
    sendPetSelection,
    sendPetData,
    feed,
    sellEgg, selectPet
} = require('../controllers/mainControlers');

router.get("/sendAnimalSelection", sendPetSelection);
router.get("/select/:pet", selectPet);
router.get("/getPetData", sendPetData);
router.get("/feed", feed);
router.get("/sellEgg/:eggIndex", sellEgg);


module.exports = router;