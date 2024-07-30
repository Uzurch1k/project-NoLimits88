const calculateWaterDrunkPerDay = records => {
  let totalAmount = 0;

  for (let i = 0; i <= records; i += 1) {
    totalAmount += records[i].amount;
  }

  return totalAmount;
};

const someWater = [
  { id: '1', amount: 0.2 },
  { id: '2', amount: 0.4 },
];

console.log(calculateWaterDrunkPerDay(someWater));
