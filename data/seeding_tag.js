require('dotenv').config();
const { faker } = require('@faker-js/faker');
const debug = require('debug')('seeding');

const db = require('../app/db/pg');
debug.queryCount = 0;

faker.locale = 'fr';
const NB_SUGGESTED_TAG_RESTO = 10;
const NB_SUGGESTED_TAG_MEAL = 10;

function pgQuoteEscape(row) {
  const newRow = {};
  Object.entries(row).forEach(([prop, value]) => {
    if (typeof value !== 'string') {
      newRow[prop] = value;
      return;
    }
    // eslint-disable-next-line
    newRow[prop] = value.replaceAll("'", "''");
  });
  return newRow;
}

function generateSuggestedTagReso(nbTagResto) {
  const suggestedTagsRestaurant = [];
  for (let i = 0; i < nbTagResto; i += 1) {
    const suggestedTagRestaurant = {
      label: faker.address.country(),
    };
    suggestedTagsRestaurant.push(suggestedTagRestaurant);
  }
  return suggestedTagsRestaurant;
}
async function insertSuggestdTagRestaurant(suggestedTagsRestaurant) {
  await db.query('TRUNCATE TABLE "suggested_tag_restaurant" RESTART IDENTITY CASCADE');
  const suggestedTagRestaurantValues = suggestedTagsRestaurant.map((suggestedTagRestaurant) => {
    const newSuggestedTagRestaurant = pgQuoteEscape(suggestedTagRestaurant);
    return `('${newSuggestedTagRestaurant.label}')`;
  });
  const queryStr = `
    INSERT INTO "suggested_tag_restaurant"
    (
      "label"
    )
    VALUES
    ${suggestedTagRestaurantValues}
    RETURNING *
  `;
  const result = await db.query(queryStr);
  return result.rows;
}

function generateSuggestedTagMeal(nbTagMeal) {
  const suggestedTagsMeal = [];
  for (let i = 0; i < nbTagMeal; i += 1) {
    const suggestedTagMeal = {
      label: faker.commerce.productAdjective()
    };
    suggestedTagsMeal.push(suggestedTagMeal);
  }
  return suggestedTagsMeal;
}
async function insertGeneratedTagMeal(suggestedTagsMeal) {
  await db.query('TRUNCATE TABLE "suggested_tag_meal" RESTART IDENTITY CASCADE');
  const suggestedTagMealValues = suggestedTagsMeal.map((suggestedTagMeal) => {
    const newSuggestedTagMeal = pgQuoteEscape(suggestedTagMeal);
    return `('${newSuggestedTagMeal.label}')`;
  });
  const queryStr = `
    INSERT INTO "suggested_tag_meal"
    (
      "label"
    )
    VALUES
    ${suggestedTagMealValues}
    RETURNING *
  `;
  const result = await db.query(queryStr);
  return result.rows;
}

(async () => {
  const suggestedTagsRestaurant = generateSuggestedTagReso(NB_SUGGESTED_TAG_RESTO);
  const insertedTagRestaurant = await insertSuggestdTagRestaurant(suggestedTagsRestaurant);
  debug(`${insertedTagRestaurant.length} suggested tag restaurant inserted`);

  const suggestedTagsMeal = generateSuggestedTagMeal(NB_SUGGESTED_TAG_MEAL);
  const insertedTagMeal = await insertGeneratedTagMeal(suggestedTagsMeal);
  debug(`${insertedTagMeal.length} suggested tag meal inserted`);
})();
