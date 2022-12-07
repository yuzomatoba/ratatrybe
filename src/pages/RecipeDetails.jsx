import React, { useContext, useEffect, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import DetailsPageContext from '../context/DetailsPageContext';
import FoodContext from '../context/FoodContext';
import './RecipeDetails.css';

function RecipeDetails() {
  const six = 6;
  const location = useLocation();
  const history = useHistory();
  const {
    ingredientsAndMeasures,
    mealInfos,
    drinkInfos,
    ytVideo,
    setId,
    id,
    foodRecomendation,
    drinkRecomendation,
  } = useContext(DetailsPageContext);

  const { setChangeBtn, changeBtn, foodLocal, setFoodLocal } = useContext(FoodContext);
  const [mealsReco, setMealsReco] = useState([]);
  const [drinksReco, setDrinksReco] = useState([]);
  const [recipeIsDone, setRecipeIsDone] = useState(false);

  useEffect(() => setId(location.pathname.split('/')[2]), []);

  useEffect(() => {
    const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocal === undefined || getLocal === null) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify([]),
      );
    }

    if (foodRecomendation) {
      setMealsReco(foodRecomendation);
      const done = JSON.parse(localStorage.getItem('doneRecipes')) !== null
        ? JSON.parse(localStorage.getItem('doneRecipes'))
        : [];
      setRecipeIsDone(done.some((recipe) => mealInfos.strMeal === recipe));
    }
    if (drinkRecomendation) {
      setDrinksReco(drinkRecomendation);
      const done = JSON.parse(localStorage.getItem('doneRecipes')) !== null
        ? JSON.parse(localStorage.getItem('doneRecipes'))
        : [];
      setRecipeIsDone(done.some((recipe) => drinkInfos.strDrink === recipe));
    }
  }, [JSON.stringify(foodRecomendation), JSON.stringify(drinkRecomendation)]);

  const click = () => {
    // console.log(drinkInfos);
  //  console.log(mealInfos);
    const inProgressRecipes1 = [];
    if (location.pathname === `/drinks/${id}`) {
      const drinks = {
        drinks: {
          [drinkInfos.idDrink]: [drinkInfos.strInstructions] },

      };
      inProgressRecipes1.push(drinks);
      setFoodLocal([...foodLocal, inProgressRecipes1]);
    } else {
      console.log(foodLocal);
      console.log(Object.keys(mealInfos));
      const allObj = Object.entries(mealInfos);

      const ingre = allObj.filter((element) => (element[0]
        .includes('strIngredient')));
      console.log(ingre);
      console.log(mealInfos);
      const meals = {
        meals: {
          [mealInfos.idMeal]: [ingre] },
      };
      inProgressRecipes1.push(meals);
      setFoodLocal([...foodLocal, inProgressRecipes1]);
    }

    // mealInfos.forEach((e) => console.log(e[ingre]));

    //  const filterIngre = () => { }
    const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON.stringify([...getLocal, id]));
    setChangeBtn(true);

    // console.log(id);
    if (location.pathname === `/drinks/${id}`) {
      history.push(`/drinks/${id}/in-progress`);
    } else { history.push(`/meals/${id}/in-progress`); }
  };
  useEffect(() => {
    const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const check = getLocal.some((element1) => element1.includes(id));
    if (check) { setChangeBtn(true); } else { setChangeBtn(false); }
    // console.log(getLocal);
    // console.log(check);

    // console.log(getLocal);
  }, [id]);
  // console.log(drinksReco);

  return (
    <div>
      {location.pathname.includes('/meals') ? (
        <div>
          <img
            src={ mealInfos.strMealThumb }
            alt="imagem"
            data-testid="recipe-photo"
          />
          <p
            data-testid="recipe-title"
          >
            {mealInfos.strMeal}

          </p>
          <p
            data-testid="recipe-category"
          >
            {mealInfos.strCategory}
          </p>
          <h4>Ingredientes:</h4>
          {
            ingredientsAndMeasures.ingredients.map((el, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ el[0] }
              >
                {el[1]}
              </p>
            ))
          }
          <h4>Medidas:</h4>
          {
            ingredientsAndMeasures.measures.map((e, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ e[0] }
              >
                {e[1]}
              </p>
            ))
          }
          <p
            data-testid="instructions"
          >
            {mealInfos.strInstructions}
          </p>
          <iframe
            width="853"
            height="480"
            data-testid="video"
            src={ ytVideo }
            title="YouTube Video Player"
            frameBorder="0"
            allowFullScreen
          />
          <div className="carousel">
            {drinkRecomendation ? drinksReco.slice(0, six).map((element2, i) => (
              <div key={ i } data-testid={ `${i}-recommendation-card` }>
                <p data-testid={ `${i}-recommendation-title` }>{element2.strDrink}</p>
                <img
                  className="img-carousel"
                  src={ element2.strDrinkThumb }
                  alt="drink"
                />
              </div>
            )) : null}
          </div>
          {!recipeIsDone && (
            <button
              data-testid="start-recipe-btn"
              className="startBtn"
              type="button"
              onClick={ click }
            >
              {changeBtn ? 'Continue Recipe' : 'Start Recipe'}

            </button>
          )}
        </div>

      )
        : null}

      {location.pathname.includes('/drinks') ? (

        <div>
          <img
            src={ drinkInfos.strDrinkThumb }
            alt="imagem"
            data-testid="recipe-photo"
          />
          <p
            data-testid="recipe-title"
          >
            {drinkInfos.strDrink}

          </p>
          <p
            data-testid="recipe-category"
          >
            {drinkInfos.strCategory}
            {drinkInfos.strAlcoholic}
          </p>
          <h4>Ingredientes: </h4>
          {
            ingredientsAndMeasures.ingredients.map((el1, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ el1[0] }
              >
                {el1[1]}
              </p>
            ))
          }
          <h4>Medidas: </h4>
          {
            ingredientsAndMeasures.measures.map((e1, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ e1[0] }
              >
                {e1[1]}
              </p>
            ))
          }
          <p
            data-testid="instructions"
          >
            {drinkInfos.strInstructions}
          </p>
          <div className="carousel">
            {foodRecomendation ? mealsReco.slice(0, six).map((element1, i) => (
              <div key={ i } data-testid={ `${i}-recommendation-card` }>
                <p data-testid={ `${i}-recommendation-title` }>{element1.strMeal}</p>
                <img className="img-carousel" src={ element1.strMealThumb } alt="drink" />
              </div>
            )) : null}
          </div>
          {!recipeIsDone && (
            <button
              data-testid="start-recipe-btn"
              className="startBtn"
              type="button"
              onClick={ click }
            >
              {changeBtn ? 'Continue Recipe' : 'Start Recipe'}

            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
export default RecipeDetails;
