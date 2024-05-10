import Dashboard from './assets/Dashboard.png';
import Cart from './assets/Cart.png';
import star from './assets/Empty_Star.png';
import Product from './assets/Product.png';
import Settings from './assets/Settings.png';
import Users from './assets/Users.png';
const moment = require('moment');

function changeDateFormat(dateString) {
    return moment(dateString).format('DD MMM, YYYY');
}

export const left_menu_list = [
    {
    name : "Dashboard",
    image : Dashboard
    },
    {
    name : "Products",
    image : Product
    },
    {
    name : "Orders",
    image : Cart
    },
    {
    name : "Customers",
    image : Users
    },
    {
    name : "Reviews",
    image : star
    },
    {
    name : "Settings",
    image : Settings
    }
];

export const ordered_products = [
    {
        "item": "Laptop",
        "date": changeDateFormat("2024-05-10"),
        "amount": "$1200.00",
        "status": "Delivered"
      },
      {
        "item": "Smartphone",
        "date": changeDateFormat("2024-05-09"),
        "amount": "$800.00",
        "status": "Processing"
      },
      {
        "item": "Headphones",
        "date": changeDateFormat("2024-05-08"),
        "amount": "$150.00",
        "status": "Pending"
      },
      {
        "item": "Tablet",
        "date": changeDateFormat("2024-05-07"),
        "amount": "$500.00",
        "status": "Delivered"
      },
      {
        "item": "Smartwatch",
        "date": changeDateFormat("2024-05-06"),
        "amount": "$300.00",
        "status": "Delivered"
      }
];
    
    // export {left_menu_list};
    
