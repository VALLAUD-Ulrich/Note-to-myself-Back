require('dotenv').config();
const { faker } = require('@faker-js/faker');
const debug = require('debug')('seeding');

const db = require('../app/db/pg');
debug.queryCount = 0;

faker.locale = 'fr';
const NB_USERS = 1;
const NB_RESTAURANTS = 50;
const NB_RESTAURANTS_TAGS = 60;
const NB_MEAL = 70;
const NB_MEAL_TAGS = 90;
const NB_MEMENTOS = 7;

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

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to = 'aaaaeeeeiiiioooouuuunc------';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

// Fonction de géneration des utilisateur
function generateUsers(nbUsers) {
  const users = [];
  for (let i = 0; i < nbUsers; i += 1) {
    const user = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      photo_url: faker.internet.avatar(),
    };
    users.push(user);
  }
  return users;
}
// Insertion des utilisateurs générés dans la BDD
async function insertUsers(users) {
  await db.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');
  const userValues = users.map(
    (user) => `(
      '${user.username}',
      '${user.email}',
      '${user.password}',
      '${user.photo_url}'
    )`
  );

  const queryStr = `
      INSERT INTO "user"
    (
      "username",
      "email",
      "password",
      "photo_url"
    )
      VALUES
    (
      'Ulrich',
      'ulrich@oclock.io',
      '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy',
      'https://avatars.githubusercontent.com/u/36332744?v=4'
    ),-- superpass
    (
      'Alexis',
      'alexis@oclock.io',
      '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy',
      'https://avatars.githubusercontent.com/u/74763572?v=4'
    ), -- superpass
    (
      'Yann',
      'yann@oclock.io',
      '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy',
      'https://avatars.githubusercontent.com/u/17363842?v=4'
    ), -- superpass
    (
      'Jonas',
      'jonas@oclock.io',
      '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy',
      'https://avatars.githubusercontent.com/u/12894353?v=4'
    ), -- superpass
    (
      'Sebastien',
      'sebastien@oclock.io',
      '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy',
      'https://avatars.githubusercontent.com/u/87674596?v=4'
    ), -- superpass
    ${userValues}
    RETURNING id
  `;
  const result = await db.query(queryStr);
  return result.rows;
}

// Fonction de génération des restaurants
async function generateRestaurant(nbResto, userId) {
  const restaurants = [];
  for (let i = 0; i < nbResto; i += 1) {
    let name = `Chez ${faker.name.firstName()} ${faker.name.suffix()}`;
    let slug = string_to_slug(name);
    let photo_url = 'https://loremflickr.com/640/480/restaurant,food';
    let location = `${faker.address.buildingNumber()} ${faker.address.street()}, ${faker.address.city()} ${faker.address.zipCode()} France`;
    let coordinate = '-2.333333 - 48.866667';

    const restaurant = {
      name,
      slug,
      comment: faker.company.catchPhrase(),
      photo_url,
      favorite: faker.datatype.boolean(),
      user_id: userId[faker.datatype.number({ min: 0, max: userId.length - 1 })],
      location,
      coordinate
    };
    restaurants.push(restaurant);
  }
  return restaurants;
}
// Insertion des restaurants générés dans la BDD
async function insertRestaurant(restaurants) {
  await db.query('TRUNCATE TABLE "restaurant" RESTART IDENTITY CASCADE');
  const restaurantValues = restaurants.map((restaurant) => {
    const newRestaurant = pgQuoteEscape(restaurant);
    return `(
               '${newRestaurant.name}',
               '${newRestaurant.slug}',
               '${newRestaurant.comment}',
               '${newRestaurant.photo_url}',
               ${newRestaurant.favorite},
               ${newRestaurant.user_id},
               '${newRestaurant.location}',
               '${newRestaurant.coordinate}'
            )`;
  });

  const queryStr = `
    INSERT INTO "restaurant"
      (
      "name",
      "slug",
      "comment",
      "photo_url",
      "favorite",
      "user_id",
      "location",
      "coordinate"
      )
      VALUES
      ${restaurantValues}
      RETURNING id
    `;
  const result = await db.query(queryStr);
  return result.rows;
}

// Fonction de génération des tags de restaurant
function generateTagRestaurant(nbTagRestaurant, restaurantId) {
  const tagsRestaurant = [];
  for (let i = 0; i < nbTagRestaurant; i += 1) {
    const tagRestaurant = {
      label: faker.address.country(),
      restaurantId:
        restaurantId[
          faker.datatype.number({ min: 0, max: restaurantId.length - 1 })
        ],
    };
    tagsRestaurant.push(tagRestaurant);
  }
  return tagsRestaurant;
}
// Insertion des tags de restaurant générés dans la BDD
async function insertTagRestaurant(tagsRestaurant) {
  await db.query('TRUNCATE TABLE "tag_restaurant" RESTART IDENTITY CASCADE');
  const tagRestaurantValues = tagsRestaurant.map((tagRestaurant) => {
    const newTagRestaurant = pgQuoteEscape(tagRestaurant);
    return `(
      '${newTagRestaurant.label}',
      ${newTagRestaurant.restaurantId}
    )`;
  });

  const queryStr = `
    INSERT INTO "tag_restaurant"
    (
      "label",
      "tag_restaurant_id"
    )
    VALUES
    ${tagRestaurantValues}
    RETURNING id
  `;
  const result = await db.query(queryStr);
  return result.rows;
}

// Fonction de génération des plats
async function generateMeal(nbMeal, restaurantId) {
  const meals = [];
  for (let i = 0; i < nbMeal; i += 1) {
    let name = `Steak de ${faker.animal.type()}`;
    let slug = string_to_slug(name);
    let photo_url = 'https://loremflickr.com/640/480/food,meal';

    const meal = {
      name,
      slug,
      photo_url,
      favorite: faker.datatype.boolean(),
      review: faker.company.catchPhrase(),
      meal_restaurant_id:
        restaurantId[
          faker.datatype.number({ min: 0, max: restaurantId.length - 1 })
        ],
    };
    meals.push(meal);
  }
  return meals;
}
// Insertion des plats générés dans la BDD
async function insertMeal(meals) {
  await db.query('TRUNCATE TABLE "meal" RESTART IDENTITY CASCADE');
  const mealValues = meals.map((meal) => {
    const newMeal = pgQuoteEscape(meal);
    return `(
               '${newMeal.name}',
               '${newMeal.slug}',
               '${newMeal.photo_url}',
               ${newMeal.favorite},
               '${newMeal.review}',
               ${newMeal.meal_restaurant_id}
           )`;
  });

  const queryStr = `
           INSERT INTO "meal"
           (
               "name",
               "slug",
               "photo_url",
               "favorite",
               "review",
               "meal_restaurant_id"
           )
           VALUES
           ${mealValues}
           RETURNING id
   `;
  const result = await db.query(queryStr);
  return result.rows;
}

// Fonction de génération des tags de plats
function generateTagMeal(nbMealTags, mealId) {
  const mealTags = [];
  for (let i = 0; i < nbMealTags; i += 1) {
    const mealTag = {
      label: faker.word.adjective(),
      mealId:
      mealId[
        faker.datatype.number({ min: 0, max: mealId.length - 1 })
      ]
    };
    mealTags.push(mealTag);
  }
  return mealTags;
}
// Insertion des tags de plats générés dans la BDD
async function insertTagMeal(mealTags) {
  await db.query('TRUNCATE TABLE "tag_meal" RESTART IDENTITY CASCADE');
  const mealTagsValues = mealTags.map((mealTag) => {
    const newMealTag = pgQuoteEscape(mealTag);
    return `(
          '${newMealTag.label}',
          ${newMealTag.mealId}
      )`;
  });

  const queryStr = `
           INSERT INTO "tag_meal"
           (
               "label",
               "tag_meal_id"
           )
           VALUES
           ${mealTagsValues}
           RETURNING id
   `;
  const result = await db.query(queryStr);
  return result.rows;
}

// Fonction de génération des mementos
async function generateMemento(nbMemento, restaurantId) {
  const mementos = [];
  for (let i = 0; i < nbMemento; i += 1) {
    const memento = {
      name: faker.hacker.noun(),
      content: faker.hacker.phrase(),
      reminder: faker.datatype.number({ min: 0, max: 2 }),
      restaurantId:
        restaurantId[
          faker.datatype.number({ min: 0, max: restaurantId.length - 1 })
        ],
    };
    mementos.push(memento);
  }
  return mementos;
}
// Insertion des mementos générés dans la BDD
async function insertMemento(mementos) {
  await db.query('TRUNCATE TABLE "memento" RESTART IDENTITY CASCADE');
  const mementoValues = mementos.map((memento) => {
    const newMemento = pgQuoteEscape(memento);
    return `(
              '${newMemento.name}',
              '${newMemento.content}',
              ${newMemento.reminder},
              ${newMemento.restaurantId}
           )`;
  });

  const queryStr = `
           INSERT INTO "memento"
           (
               "name",
               "content",
               "reminder",
               "memento_restaurant_id"
           )
           VALUES
           ${mementoValues}
           RETURNING id
   `;
  const result = await db.query(queryStr);
  return result.rows;
}

(async () => {
  /**
   * Générations d'utilisateurs fake
   * Ajout de ces utilisateurs en BDD
   */
  const users = generateUsers(NB_USERS);
  const insertedUsers = await insertUsers(users);
  debug(`${insertedUsers.length} users inserted`);
  const userIds = insertedUsers.map((user) => user.id);

  /**
   * Génération des restaurants fake
   * Ajout de ces restaurants dans la BDD
   */
  const restaurants = await generateRestaurant(NB_RESTAURANTS, userIds);
  const insertedRestaurants = await insertRestaurant(restaurants);
  debug(`${insertedRestaurants.length} restaurants inserted`);
  const restaurantIds = insertedRestaurants.map((restaurant) => restaurant.id);

  /**
   * Génération des tags restaurant fake
   * Ajout de ces tags restaurant en BDD
   */
  const tagsRestaurant = generateTagRestaurant(NB_RESTAURANTS_TAGS, restaurantIds);
  const insertedTagRestaurant = await insertTagRestaurant(tagsRestaurant);
  debug(`${insertedTagRestaurant.length} tag_restaurant inserted`);

  /**
   * Génération des plats fake
   * Ajout de ces restaurants dans la BDD
   */
  const meals = await generateMeal(NB_MEAL, restaurantIds);
  const insertedMeals = await insertMeal(meals);
  debug(`${insertedMeals.length} meals inserted`);
  const mealIds = insertedMeals.map((meal) => meal.id);

  /**
   * Génération des tags meal fake
   * Ajout de ces tags meal en BDD
   */
  const tagsMeal = generateTagMeal(NB_MEAL_TAGS, mealIds);
  const insertedTagMeal = await insertTagMeal(tagsMeal);
  debug(`${insertedTagMeal.length} tag_meal inserted`);

  /**
   * Génération des mementos fake
   * Ajout de ces mementos en BDD
   */
  const mementos = await generateMemento(NB_MEMENTOS, restaurantIds);
  const insertedMemento = await insertMemento(mementos);
  debug(`${insertedMemento.length} tag_meal inserted`);

  db.originalClient.end();
})();
