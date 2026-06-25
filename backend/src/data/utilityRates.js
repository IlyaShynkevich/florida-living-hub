// Base monthly utility costs by city and apartment size
const electricityBase = {
  Tampa:         { Studio: 80,  "1 Bedroom": 105, "2 Bedroom": 140, "3 Bedroom": 175 },
  Miami:         { Studio: 95,  "1 Bedroom": 125, "2 Bedroom": 165, "3 Bedroom": 210 },
  Orlando:       { Studio: 78,  "1 Bedroom": 100, "2 Bedroom": 135, "3 Bedroom": 168 },
  Sarasota:      { Studio: 75,  "1 Bedroom": 98,  "2 Bedroom": 130, "3 Bedroom": 162 },
  Jacksonville:  { Studio: 72,  "1 Bedroom": 94,  "2 Bedroom": 125, "3 Bedroom": 155 }
};

const waterBase = {
  Tampa:         20,
  Miami:         28,
  Orlando:       18,
  Sarasota:      17,
  Jacksonville:  16
};

const internetCost = 65;

const waterPerPerson = 8;

module.exports = { electricityBase, waterBase, internetCost, waterPerPerson };
