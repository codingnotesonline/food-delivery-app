import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const menuImgPath = ["./menu_1.png", "./menu_2.png", "./menu_3.png", "./menu_4.png", "./menu_5.png", "./menu_6.png", "./menu_7.png", "./menu_8.png"];

const foodImgPath = ["./food_1.png", "./food_2.png", "./food_3.png", "./food_4.png", "./food_5.png", "./food_6.png", "./food_7.png", "./food_8.png", "./food_9.png", "./food_10.png", "./food_11.png" , "./food_12.png", "./food_13.png", "./food_14.png", "./food_15.png", "./food_16.png", "./food_17.png", "./food_18.png", "./food_19.png", "./food_20.png", "./food_21.png", "./food_22.png" , "./food_23.png", "./food_24.png", "./food_25.png", "./food_26.png", "./food_27.png", "./food_28.png", "./food_29.png", "./food_30.png", "./food_31.png", "./food_32.png"];


const menu_list = [
    {
        menu_name: "Salad"
    },
    {
        menu_name: "Rolls"
    },
    {
        menu_name: "Deserts"
    },
    {
        menu_name: "Sandwich"
    },
    {
        menu_name: "Cake"
    },
    {
        menu_name: "Pure Veg"
    },
    {
        menu_name: "Pasta"
    },
    {
        menu_name: "Noodles"
    }]

const food_list = [
    {
        _id: "1",
        name: "Greek Salad",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        _id: "2",
        name: "Veg Salad",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, {
        _id: "3",
        name: "Clover Salad",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, {
        _id: "4",
        name: "Chicken Salad",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, {
        _id: "5",
        name: "Lasagna Rolls",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "6",
        name: "Peri Peri Rolls",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "7",
        name: "Chicken Rolls",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "8",
        name: "Veg Rolls",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "9",
        name: "Ripple Ice Cream",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, {
        _id: "10",
        name: "Fruit Ice Cream",
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, {
        _id: "11",
        name: "Jar Ice Cream",
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, {
        _id: "12",
        name: "Vanilla Ice Cream",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "13",
        name: "Chicken Sandwich",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "14",
        name: "Vegan Sandwich",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, {
        _id: "15",
        name: "Grilled Sandwich",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, {
        _id: "16",
        name: "Bread Sandwich",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, {
        _id: "17",
        name: "Cup Cake",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "18",
        name: "Vegan Cake",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "19",
        name: "Butterscotch Cake",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "20",
        name: "Sliced Cake",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "21",
        name: "Garlic Mushroom ",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, {
        _id: "22",
        name: "Fried Cauliflower",
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, {
        _id: "23",
        name: "Mix Veg Pulao",
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, {
        _id: "24",
        name: "Rice Zucchini",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        _id: "25",
        name: "Cheese Pasta",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        _id: "26",
        name: "Tomato Pasta",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, {
        _id: "27",
        name: "Creamy Pasta",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, {
        _id: "28",
        name: "Chicken Pasta",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, {
        _id: "29",
        name: "Buttter Noodles",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, {
        _id: "30",
        name: "Veg Noodles",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, {
        _id: "31",
        name: "Somen Noodles",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, {
        _id: "32",
        name: "Cooked Noodles",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }
]

let i = 0;
for(let menuItem of menu_list){
    const data = new FormData();
    const img = fs.createReadStream(menuImgPath[i]);
    data.append("name", menuItem.menu_name);
    data.append("image", img);
    i++;

    axios.post("http://127.0.0.1:5000/api/foodMenu/add", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

i = 0;

for(let foodItem of food_list){
    const data = new FormData();
    const img = fs.createReadStream(foodImgPath[i]);
    data.append("_id", foodItem._id);
    data.append("name", foodItem.name);
    data.append("description", foodItem.description);
    data.append("category", foodItem.category);
    data.append("image", img);
    data.append("price", foodItem.price);
    i++;

    axios.post("http://127.0.0.1:5000/api/food/add", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}