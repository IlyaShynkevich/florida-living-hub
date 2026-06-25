const express = require("express");
const router = express.Router();
const { electricityBase, waterBase, internetCost, waterPerPerson } = require("../data/utilityRates");

// POST /api/utility-estimate
router.post("/utility-estimate", (req, res) => {
  try {
    const { city, apartmentSize, numberOfPeople, internetNeeded } = req.body;

    const validCities = Object.keys(electricityBase);
    const validSizes = ["Studio", "1 Bedroom", "2 Bedroom", "3 Bedroom"];

    if (!city || !validCities.includes(city)) {
      return res.status(400).json({ success: false, message: "Invalid city" });
    }
    if (!apartmentSize || !validSizes.includes(apartmentSize)) {
      return res.status(400).json({ success: false, message: "Invalid apartment size" });
    }
    const people = parseInt(numberOfPeople);
    if (isNaN(people) || people < 1 || people > 5) {
      return res.status(400).json({ success: false, message: "Number of people must be 1–5" });
    }

    const electricity = electricityBase[city][apartmentSize];
    const water = waterBase[city] + people * waterPerPerson;
    const internet = internetNeeded ? internetCost : 0;
    const total = electricity + water + internet;

    res.json({
      success: true,
      data: {
        city,
        apartmentSize,
        numberOfPeople: people,
        estimates: {
          electricity,
          water,
          internet,
          total
        },
        disclaimer: "These are rough estimates and should not be treated as exact prices."
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Calculation failed" });
  }
});

module.exports = router;
