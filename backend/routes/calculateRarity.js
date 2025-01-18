// calculateRarity.js

const calculateRarity = (preferences) => {
    const { gender, age, skinColor, height, income } = preferences;
  
    // Example rarity logic
    let rarityScore = 1;
  
    // Gender rarity
    if (gender === 'male') rarityScore *= 0.49; // Approx 49% male in global population
    if (gender === 'female') rarityScore *= 0.51; // Approx 51% female
  
    // Age rarity
    if (age < 20 || age > 40) rarityScore *= 0.2; // Narrow age groups are rarer
    else rarityScore *= 0.8;
  
    // Skin color rarity (adjust percentages based on region)
    if (skinColor === 'white') rarityScore *= 0.4;
    if (skinColor === 'black') rarityScore *= 0.2;
    if (skinColor === 'brown') rarityScore *= 0.4;
  
    // Height rarity
    if (height < 150 || height > 200) rarityScore *= 0.15; // Unusual height is rare
    else rarityScore *= 0.85;
  
    // Income rarity
    if (income) {
      if (income > 100000) rarityScore *= 0.1; // High income is rare
      else if (income < 20000) rarityScore *= 0.2;
      else rarityScore *= 0.7;
    } else {
      rarityScore *= 0.9; // No preference for income
    }
  
    // Convert to percentage
    const rarityPercentage = (rarityScore * 100).toFixed(2);
    return rarityPercentage;
  };
  
  module.exports = calculateRarity;
  