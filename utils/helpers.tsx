import { Alert } from 'react-native'

interface Meals{
    category: string;
    id : number; 
    image : string; 
    name : string; 
    price : number;
    quantity : number;
    short_description : string;
  }


export const getAllCartFoods = (items) => {
    let allFoods = []
    const foodsData = items.map(x => x.foods)
    foodsData.map(food => {
        food.map(x => {
            allFoods = [...allFoods, x]
        })
    })
    return allFoods
}

export const getTotalCartItemPrice = (items) => {
    let allFoods = []
    const foodsData = items.map(x => x.foods)
    foodsData.map(food => {
        food.map(x => {
            allFoods = [...allFoods, x]
        })
    })
    return allFoods.reduce((total, item) => total + item.price, 0).toFixed(1)
}

