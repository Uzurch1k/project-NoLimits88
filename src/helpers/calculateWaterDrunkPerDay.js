export const calculateWaterDrunkPerDay = records => {
  let totalAmount = 0;

  for (let i = 0; i < records.length; i += 1) {
    totalAmount += records[i].amount;
  }

  return Number(totalAmount.toFixed(2));
};
