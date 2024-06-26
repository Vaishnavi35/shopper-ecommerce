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

export const dashboard = [
  {"day": 1, "sales_amount": 1000, "customers": 20},
  {"day": 2, "sales_amount": 1200, "customers": 25},
  {"day": 3, "sales_amount": 1300, "customers": 22},
  {"day": 4, "sales_amount": 1100, "customers": 18},
  {"day": 5, "sales_amount": 1050, "customers": 21},
  {"day": 6, "sales_amount": 1250, "customers": 24},
  {"day": 7, "sales_amount": 1400, "customers": 26},
  {"day": 8, "sales_amount": 1150, "customers": 19},
  {"day": 9, "sales_amount": 1300, "customers": 23},
  {"day": 10, "sales_amount": 1350, "customers": 28},
  {"day": 11, "sales_amount": 1200, "customers": 20},
  {"day": 12, "sales_amount": 1100, "customers": 17},
  {"day": 13, "sales_amount": 1000, "customers": 15},
  {"day": 14, "sales_amount": 1450, "customers": 30},
  {"day": 15, "sales_amount": 1250, "customers": 25},
  {"day": 16, "sales_amount": 1150, "customers": 21},
  {"day": 17, "sales_amount": 1100, "customers": 20},
  {"day": 18, "sales_amount": 1300, "customers": 26},
  {"day": 19, "sales_amount": 1400, "customers": 27},
  {"day": 20, "sales_amount": 1500, "customers": 29},
  {"day": 21, "sales_amount": 1350, "customers": 24},
  {"day": 22, "sales_amount": 1250, "customers": 22},
  {"day": 23, "sales_amount": 1200, "customers": 21},
  {"day": 24, "sales_amount": 1100, "customers": 18},
  {"day": 25, "sales_amount": 1050, "customers": 17},
  {"day": 26, "sales_amount": 1000, "customers": 16},
  {"day": 27, "sales_amount": 1400, "customers": 28},
  {"day": 28, "sales_amount": 1500, "customers": 30},
  {"day": 29, "sales_amount": 1450, "customers": 29},
  {"day": 30, "sales_amount": 1300, "customers": 24},
  {"day": 31, "sales_amount": 1200, "customers": 20}
]
    
export const categories = [
  { label: 'Home and Living', value: 'Home and Living' },
  { label: 'Kitchen and Dining', value: 'Kitchen and Dining' }
];

export const subCategories = {
  'Home and Living': [
      { label: 'Home Decoration', value: 'Home Decoration' },
      { label: 'Furniture', value: 'Furniture' },
      { label: 'Lighting', value: 'Lighting' },
      { label: 'Bedding and Bath', value: 'Bedding and Bath' },
      { label: 'Storage and Organization', value: 'Storage and Organization' },
      { label: 'Rugs and Carpets', value: 'Rugs and Carpets' },
      { label: 'Curtains and Blinds', value: 'Curtains and Blinds' },
      { label: 'Wall Art and Paintings', value: 'Wall Art and Paintings' },
      { label: 'Home Improvement', value: 'Home Improvement' }
  ],
  'Kitchen and Dining': [
      { label: 'Cookware', value: 'Cookware' },
      { label: 'Dinnerware', value: 'Dinnerware' },
      { label: 'Serveware', value: 'Serveware' },
      { label: 'Kitchen Storage', value: 'Kitchen Storage' },
      { label: 'Kitchen Tools', value: 'Kitchen Tools' },
      { label: 'Table Linen', value: 'Table Linen' },
      { label: 'Dining Furniture', value: 'Dining Furniture' }
  ]
};
    
