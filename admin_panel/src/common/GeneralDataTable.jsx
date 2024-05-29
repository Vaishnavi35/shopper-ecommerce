import React, { useState, useEffect, useRef } from 'react';
import { apiIntegration } from "../customHook/apiIntegration";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BsSearch } from "react-icons/bs";
import { Menu } from 'primereact/menu'; 
import { useNavigate, Link } from "react-router-dom";
import {dataTableDetails} from '../../dataTableDetails';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { Dialog } from 'primereact/dialog';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';
import { Rating } from 'primereact/rating';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

export default function GeneralDataTable() {

    const sectionType = useSelector((state) => state.leftMenu.leftMenu);
    console.log("sectionType : ",sectionType);
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    
    // const {data, loading, error} = apiIntegration({ url: "http://localhost:3000/orders" });
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const menuRight = useRef(null);
    const [selectedAction, setSeletedAction] = useState({});
    const [data,setData]= useState();
    const [dialogVisible, setDialogVisible] = useState(false);
    const toast = useRef(null);

    const data_test = {
      "products": [
        {
            "product_id": 1,
            "image": "https://example.com/product1.jpg",
            "name": "T-Shirt",
            "SKU": "SKU001",
            "price": "$19.99",
            "category": "Clothing",
            "stock": true,
            "available_quantity": 50,
            "size": "M",
            "color": "Blue",
            "rating": 4.5,
            "color_code": "#0000FF"
        },
        {
            "product_id": 2,
            "image": "https://example.com/product2.jpg",
            "name": "Smartphone",
            "SKU": "SKU002",
            "price": "$24.99",
            "category": "Electronics",
            "stock": true,
            "available_quantity": 20,
            "size": null,
            "color": "Black",
            "rating": 4.2,
            "color_code": "#000000"
        },
        {
            "product_id": 3,
            "image": "https://example.com/product3.jpg",
            "name": "Blender",
            "SKU": "SKU003",
            "price": "$49.99",
            "category": "Home & Kitchen",
            "stock": false,
            "available_quantity": 0,
            "size": "L",
            "color": "Red",
            "rating": 3.8,
            "color_code": "#FF0000"
        },
        {
            "product_id": 4,
            "image": "https://example.com/product4.jpg",
            "name": "Novel",
            "SKU": "SKU004",
            "price": "$9.99",
            "category": "Books",
            "stock": true,
            "available_quantity": 100,
            "size": null,
            "color": null,
            "rating": 4.9,
            "color_code": null
        },
        {
            "product_id": 5,
            "image": "https://example.com/product5.jpg",
            "name": "Tent",
            "SKU": "SKU005",
            "price": "$34.99",
            "category": "Sports & Outdoors",
            "stock": true,
            "available_quantity": 10,
            "size": "XL",
            "color": "Green",
            "rating": 4.0,
            "color_code": "#008000"
        },
        {
            "product_id": 6,
            "image": "https://example.com/product6.jpg",
            "name": "Board Game",
            "SKU": "SKU006",
            "price": "$14.99",
            "category": "Toys & Games",
            "stock": true,
            "available_quantity": 30,
            "size": null,
            "color": "Yellow",
            "rating": 3.6,
            "color_code": "#FFFF00"
        },
        {
            "product_id": 7,
            "image": "https://example.com/product7.jpg",
            "name": "Laptop",
            "SKU": "SKU007",
            "price": "$39.99",
            "category": "Electronics",
            "stock": true,
            "available_quantity": 15,
            "size": null,
            "color": "Silver",
            "rating": 4.7,
            "color_code": "#C0C0C0"
        },
        {
            "product_id": 8,
            "image": "https://example.com/product8.jpg",
            "name": "Shampoo",
            "SKU": "SKU008",
            "price": "$29.99",
            "category": "Beauty & Personal Care",
            "stock": false,
            "available_quantity": 0,
            "size": null,
            "color": null,
            "rating": 4.3,
            "color_code": null
        },
        {
            "product_id": 9,
            "image": "https://example.com/product9.jpg",
            "name": "Jacket",
            "SKU": "SKU009",
            "price": "$49.99",
            "category": "Clothing",
            "stock": true,
            "available_quantity": 25,
            "size": "S",
            "color": "Pink",
            "rating": 4.1,
            "color_code": "#FFC0CB"
        },
        {
            "product_id": 10,
            "image": "https://example.com/product10.jpg",
            "name": "Cookware Set",
            "SKU": "SKU010",
            "price": "$79.99",
            "category": "Home & Kitchen",
            "stock": true,
            "available_quantity": 5,
            "size": null,
            "color": "White",
            "rating": 4.8,
            "color_code": "#FFFFFF"
        },
        {
            "product_id": 11,
            "image": "https://example.com/product11.jpg",
            "name": "Headphones",
            "SKU": "SKU011",
            "price": "$54.99",
            "category": "Electronics",
            "stock": true,
            "available_quantity": 12,
            "size": null,
            "color": "Blue",
            "rating": 4.4,
            "color_code": "#0000FF"
        },
        {
            "product_id": 12,
            "image": "https://example.com/product12.jpg",
            "name": "Fitness Tracker",
            "SKU": "SKU012",
            "price": "$64.99",
            "category": "Sports & Outdoors",
            "stock": true,
            "available_quantity": 8,
            "size": "M",
            "color": "Black",
            "rating": 4.5,
            "color_code": "#000000"
        },
        {
            "product_id": 13,
            "image": "https://example.com/product13.jpg",
            "name": "Biography",
            "SKU": "SKU013",
            "price": "$44.99",
            "category": "Books",
            "stock": true,
            "available_quantity": 20,
            "size": null,
            "color": null,
            "rating": 4.9,
            "color_code": null
        },
        {
            "product_id": 14,
            "image": "https://example.com/product14.jpg",
            "name": "Puzzle",
            "SKU": "SKU014",
            "price": "$29.99",
            "category": "Toys & Games",
            "stock": true,
            "available_quantity": 40,
            "size": null,
            "color": "Red",
            "rating": 4.0,
            "color_code": "#FF0000"
        },
        {
            "product_id": 15,
            "image": "https://example.com/product15.jpg",
            "name": "Face Cream",
            "SKU": "SKU015",
            "price": "$19.99",
            "category": "Beauty & Personal Care",
            "stock": false,
            "available_quantity": 0,
            "size": null,
            "color": "Pink",
            "rating": 3.7,
            "color_code": "#FFC0CB"
        },
        {
            "product_id": 16,
            "image": "https://example.com/product16.jpg",
            "name": "Dress",
            "SKU": "SKU016",
            "price": "$39.99",
            "category": "Clothing",
            "stock": true,
            "available_quantity": 30,
            "size": "L",
            "color": "Green",
            "rating": 4.3,
            "color_code": "#008000"
        },
        {
            "product_id": 17,
            "image": "https://example.com/product17.jpg",
            "name": "Coffee Maker",
            "SKU": "SKU017",
            "price": "$49.99",
            "category": "Home & Kitchen",
            "stock": true,
            "available_quantity": 10,
            "size": null,
            "color": "Blue",
            "rating": 4.6,
            "color_code": "#0000FF"
        },
        {
            "product_id": 18,
            "image": "https://example.com/product18.jpg",
            "name": "Bluetooth Speaker",
            "SKU": "SKU018",
            "price": "$14.99",
            "category": "Electronics",
            "stock": true,
            "available_quantity": 60,
            "size": null,
            "color": "Black",
            "rating": 4.2,
            "color_code": "#000000"
        },
        {
            "product_id": 19,
            "image": "https://example.com/product19.jpg",
            "name": "Treadmill",
            "SKU": "SKU019",
            "price": "$69.99",
            "category": "Sports & Outdoors",
            "stock": true,
            "available_quantity": 7,
            "size": "XL",
            "color": "White",
            "rating": 4.5,
            "color_code": "#FFFFFF"
        },
        {
            "product_id": 20,
            "image": "https://example.com/product20.jpg",
            "name": "Action Figure",
            "SKU": "SKU020",
            "price": "$24.99",
            "category": "Toys & Games",
            "stock": false,
            "available_quantity": 0,
            "size": null,
            "color": "Red",
            "rating": 4.1,
            "color_code": "#FF0000"
        }
    ],
      "orders": [
        {
            "order_id": "ORD001",
            "product_image": "image_url_1",
            "product_name": "Product 1",
            "ordered_date": "2024-05-12",
            "total_amount": "$50.00",
            "status": "Shipped"
        },
        {
            "order_id": "ORD002",
            "product_image": "image_url_2",
            "product_name": "Product 2",
            "ordered_date": "2024-05-11",
            "total_amount": "$35.00",
            "status": "Pending"
        },
        {
            "order_id": "ORD003",
            "product_image": "image_url_3",
            "product_name": "Product 3",
            "ordered_date": "2024-05-10",
            "total_amount": "$75.00",
            "status": "Delivered"
        },
        {
            "order_id": "ORD004",
            "product_image": "image_url_4",
            "product_name": "Product 4",
            "ordered_date": "2024-05-09",
            "total_amount": "$90.00",
            "status": "Cancelled"
        },
        {
            "order_id": "ORD005",
            "product_image": "image_url_5",
            "product_name": "Product 5",
            "ordered_date": "2024-05-08",
            "total_amount": "$120.00",
            "status": "Shipped"
        },
        {
            "order_id": "ORD006",
            "product_image": "image_url_6",
            "product_name": "Product 6",
            "ordered_date": "2024-05-07",
            "total_amount": "$25.00",
            "status": "Pending"
        },
        {
            "order_id": "ORD007",
            "product_image": "image_url_7",
            "product_name": "Product 7",
            "ordered_date": "2024-05-06",
            "total_amount": "$80.00",
            "status": "Delivered"
        },
        {
            "order_id": "ORD008",
            "product_image": "image_url_8",
            "product_name": "Product 8",
            "ordered_date": "2024-05-05",
            "total_amount": "$65.00",
            "status": "Shipped"
        },
        {
            "order_id": "ORD009",
            "product_image": "image_url_9",
            "product_name": "Product 9",
            "ordered_date": "2024-05-04",
            "total_amount": "$110.00",
            "status": "Pending"
        },
        {
            "order_id": "ORD010",
            "product_image": "image_url_10",
            "product_name": "Product 10",
            "ordered_date": "2024-05-03",
            "total_amount": "$150.00",
            "status": "Delivered"
        },
        {
            "order_id": "ORD011",
            "product_image": "image_url_11",
            "product_name": "Product 11",
            "ordered_date": "2024-05-02",
            "total_amount": "$200.00",
            "status": "Cancelled"
        },
        {
            "order_id": "ORD012",
            "product_image": "image_url_12",
            "product_name": "Product 12",
            "ordered_date": "2024-05-01",
            "total_amount": "$95.00",
            "status": "Shipped"
        },
        {
            "order_id": "ORD013",
            "product_image": "image_url_13",
            "product_name": "Product 13",
            "ordered_date": "2024-04-30",
            "total_amount": "$45.00",
            "status": "Delivered"
        },
        {
            "order_id": "ORD014",
            "product_image": "image_url_14",
            "product_name": "Product 14",
            "ordered_date": "2024-04-29",
            "total_amount": "$85.00",
            "status": "Pending"
        },
        {
            "order_id": "ORD015",
            "product_image": "image_url_15",
            "product_name": "Product 15",
            "ordered_date": "2024-04-28",
            "total_amount": "$60.00",
            "status": "Shipped"
        },
        {
            "order_id": "ORD016",
            "product_image": "image_url_16",
            "product_name": "Product 16",
            "ordered_date": "2024-04-27",
            "total_amount": "$70.00",
            "status": "Cancelled"
        },
        {
            "order_id": "ORD017",
            "product_image": "image_url_17",
            "product_name": "Product 17",
            "ordered_date": "2024-04-26",
            "total_amount": "$40.00",
            "status": "Delivered"
        },
        {
            "order_id": "ORD018",
            "product_image": "image_url_18",
            "product_name": "Product 18",
            "ordered_date": "2024-04-25",
            "total_amount": "$55.00",
            "status": "Pending"
        },
        {
            "order_id": "ORD019",
            "product_image": "image_url_19",
            "product_name": "Product 19",
            "ordered_date": "2024-04-24",
            "total_amount": "$105.00",
            "status": "Shipped"
        },
        {
            "order_id": "ORD020",
            "product_image": "image_url_20",
            "product_name": "Product 20",
            "ordered_date": "2024-04-23",
            "total_amount": "$125.00",
            "status": "Delivered"
        }
      ],
    
      "customers": [
        {
            "customer_id": "CUST001",
            "customer_name": "John Doe",
            "customer_email": "john.doe@example.com",
            "customer_address": "123 Main St, Anytown, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "JD"
        },
        {
            "customer_id": "CUST002",
            "customer_name": "Jane Smith",
            "customer_email": "jane.smith@example.com",
            "customer_address": "456 Elm St, Othertown, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "JS"
        },
        {
            "customer_id": "CUST003",
            "customer_name": "Alice Johnson",
            "customer_email": "alice.johnson@example.com",
            "customer_address": "789 Oak St, Anothertown, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "AJ"
        },
        {
            "customer_id": "CUST004",
            "customer_name": "Bob Williams",
            "customer_email": "bob.williams@example.com",
            "customer_address": "101 Pine St, Somewhere, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "BW"
        },
        {
            "customer_id": "CUST005",
            "customer_name": "Emily Brown",
            "customer_email": "emily.brown@example.com",
            "customer_address": "111 Cedar St, Anywhere, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "EB"
        },
        {
            "customer_id": "CUST006",
            "customer_name": "Michael Lee",
            "customer_email": "michael.lee@example.com",
            "customer_address": "222 Maple St, Nowhere, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "ML"
        },
        {
            "customer_id": "CUST007",
            "customer_name": "Sarah Miller",
            "customer_email": "sarah.miller@example.com",
            "customer_address": "333 Birch St, Sometown, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "SM"
        },
        {
            "customer_id": "CUST008",
            "customer_name": "David Wilson",
            "customer_email": "david.wilson@example.com",
            "customer_address": "444 Walnut St, Everytown, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "DW"
        },
        {
            "customer_id": "CUST009",
            "customer_name": "Jennifer Taylor",
            "customer_email": "jennifer.taylor@example.com",
            "customer_address": "555 Oak St, Anyplace, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "JT"
        },
        {
            "customer_id": "CUST010",
            "customer_name": "Matthew Garcia",
            "customer_email": "matthew.garcia@example.com",
            "customer_address": "666 Elm St, Noway, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "MG"
        },
        {
            "customer_id": "CUST011",
            "customer_name": "Lisa Martinez",
            "customer_email": "lisa.martinez@example.com",
            "customer_address": "777 Pine St, Anyville, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "LM"
        },
        {
            "customer_id": "CUST012",
            "customer_name": "Christopher Robinson",
            "customer_email": "christopher.robinson@example.com",
            "customer_address": "888 Maple St, Noplace, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "CR"
        },
        {
            "customer_id": "CUST013",
            "customer_name": "Amanda Clark",
            "customer_email": "amanda.clark@example.com",
            "customer_address": "999 Birch St, Otherplace, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "AC"
        },
        {
            "customer_id": "CUST014",
            "customer_name": "Kevin Rodriguez",
            "customer_email": "kevin.rodriguez@example.com",
            "customer_address": "123 Pine St, Anywhereville, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "KR"
        },
        {
            "customer_id": "CUST015",
            "customer_name": "Mary Hernandez",
            "customer_email": "mary.hernandez@example.com",
            "customer_address": "234 Maple St, Nowheresville, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "MH"
        },
        {
            "customer_id": "CUST016",
            "customer_name": "Justin Hill",
            "customer_email": "justin.hill@example.com",
            "customer_address": "345 Elm St, Somewheresville, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "JH"
        },
        {
            "customer_id": "CUST017",
            "customer_name": "Laura Young",
            "customer_email": "laura.young@example.com",
            "customer_address": "456 Birch St, Anyhow, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "LY"
        },
        {
            "customer_id": "CUST018",
            "customer_name": "Daniel Scott",
            "customer_email": "daniel.scott@example.com",
            "customer_address": "567 Pine St, Nowayville, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "DS"
        },
        {
            "customer_id": "CUST019",
            "customer_name": "Samantha King",
            "customer_email": "samantha.king@example.com",
            "customer_address": "678 Maple St, Anyhowsville, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "SK"
        },
        {
            "customer_id": "CUST020",
            "customer_name": "Thomas Hall",
            "customer_email": "thomas.hall@example.com",
            "customer_address": "789 Elm St, Nowayhow, USA",
            "created_at": "Mar 08, 2024",
            "avatar_name": "TH"
        }
    ],
    
        "reviews" : [
            {
              "review_id": "REV001",
              "customer_name": "John Doe",
              "review_rate": 4.5,
              "review_submitted_at": "2024-05-12T10:30:00Z",
              "review": "Great service, highly recommend!"
            },
            {
              "review_id": "REV002",
              "customer_name": "Jane Smith",
              "review_rate": 5,
              "review_submitted_at": "2024-05-11T15:45:00Z",
              "review": "Absolutely fantastic experience!"
            },
            {
              "review_id": "REV003",
              "customer_name": "David Johnson",
              "review_rate": 4,
              "review_submitted_at": "2024-05-10T08:20:00Z",
              "review": "Good service overall, could improve in some areas."
            },
            {
              "review_id": "REV004",
              "customer_name": "Emily Brown",
              "review_rate": 4.5,
              "review_submitted_at": "2024-05-09T12:00:00Z",
              "review": "Very satisfied with the product!"
            },
            {
              "review_id": "REV005",
              "customer_name": "Michael Wilson",
              "review_rate": 3.5,
              "review_submitted_at": "2024-05-08T14:30:00Z",
              "review": "Decent service, but room for improvement."
            },
            {
              "review_id": "REV006",
              "customer_name": "Sarah Martinez",
              "review_rate": 5,
              "review_submitted_at": "2024-05-07T17:10:00Z",
              "review": "Excellent customer support!"
            },
            {
              "review_id": "REV007",
              "customer_name": "Christopher Lee",
              "review_rate": 4,
              "review_submitted_at": "2024-05-06T09:45:00Z",
              "review": "Overall a good experience, would recommend."
            },
            {
              "review_id": "REV008",
              "customer_name": "Amanda Taylor",
              "review_rate": 4.5,
              "review_submitted_at": "2024-05-05T11:20:00Z",
              "review": "Happy with the service, will use again."
            },
            {
              "review_id": "REV009",
              "customer_name": "James Rodriguez",
              "review_rate": 3.5,
              "review_submitted_at": "2024-05-04T13:55:00Z",
              "review": "Service was okay, could be better."
            },
            {
              "review_id": "REV010",
              "customer_name": "Jessica Garcia",
              "review_rate": 5,
              "review_submitted_at": "2024-05-03T16:40:00Z",
              "review": "Absolutely amazing, exceeded expectations!"
            },
            {
              "review_id": "REV011",
              "customer_name": "Daniel Brown",
              "review_rate": 4,
              "review_submitted_at": "2024-05-02T08:30:00Z",
              "review": "Good service, but delivery was a bit slow."
            },
            {
              "review_id": "REV012",
              "customer_name": "Olivia Wilson",
              "review_rate": 4.5,
              "review_submitted_at": "2024-05-01T10:15:00Z",
              "review": "Satisfied with the purchase, great value for money."
            },
            {
              "review_id": "REV013",
              "customer_name": "William Taylor",
              "review_rate": 3.5,
              "review_submitted_at": "2024-04-30T14:20:00Z",
              "review": "Average experience, nothing extraordinary."
            },
            {
              "review_id": "REV014",
              "customer_name": "Sophia Martinez",
              "review_rate": 4,
              "review_submitted_at": "2024-04-29T16:55:00Z",
              "review": "Good service overall, but could improve in some areas."
            },
            {
              "review_id": "REV015",
              "customer_name": "Benjamin Rodriguez",
              "review_rate": 4.5,
              "review_submitted_at": "2024-04-28T09:10:00Z",
              "review": "Impressed with the quality, would recommend!"
            },
            {
              "review_id": "REV016",
              "customer_name": "Isabella Garcia",
              "review_rate": 3,
              "review_submitted_at": "2024-04-27T11:40:00Z",
              "review": "Service was okay, but could be better."
            },
            {
              "review_id": "REV017",
              "customer_name": "Mason Brown",
              "review_rate": 5,
              "review_submitted_at": "2024-04-26T13:25:00Z",
              "review": "Excellent service, very satisfied!"
            },
            {
              "review_id": "REV018",
              "customer_name": "Harper Wilson",
              "review_rate": 4,
              "review_submitted_at": "2024-04-25T15:50:00Z",
              "review": "Good experience overall, but delivery was a bit slow."
            },
            {
              "review_id": "REV019",
              "customer_name": "Ethan Taylor",
              "review_rate": 4.5,
              "review_submitted_at": "2024-04-24T08:15:00Z",
              "review": "Very happy with the product, exceeded expectations!"
            },
            {
              "review_id": "REV020",
              "customer_name": "Ava Martinez",
              "review_rate": 3.5,
              "review_submitted_at": "2024-04-23T10:45:00Z",
              "review": "Decent service, but could improve in some areas."
            }
        ]
    };

    const dataTableDetails = {
      orders: {
        columns: [
          {
            field: "",
            name: "Image"
          },
          {
            field: "product_name",
            name: "Order"
          },
          {
            field: "ordered_date",
            name: "Date"
          },
          {
            field: "total_amount",
            name: "Total"
          },
          {
            field: "status",
            name: "Status"
          },
          {
            field: "",
            name: "Action"
          }
        ],
        actions: [
          {
            label: 'Change Status',
            action: 'order_change_status',
            command: (event) => handleActionClick('order_change_status')
          },
          {
            label: 'View Details',
            action: 'order_view_details',
            command: (event) => handleActionClick('order_view_details')
          }
        ]
      },
      products: {
        columns: [
          {
            field: "image",
            name: "Image"
          },
          {
            field: "name",
            name: "Name"
          },
          {
            field: "SKU",
            name: "SKU"
          },
          {
            field: "price",
            name: "Price"
          },
          {
            field: "category",
            name: "Categories"
          },
          {
            field: "",
            name: "Action"
          }
        ],
        actions: [
          {
            label: 'View',
            action: 'product_view',
            command: (event) => handleActionClick('product_view')
          },
          {
            label: 'Edit',
            action: 'product_edit',
            command: (event) => handleActionClick('product_edit')
          },
          {
            label: 'Delete',
            action: 'product_delete',
            command: (event) => handleActionClick('product_delete')
          }
        ]
      },
      customers: {
        columns: [
          {
            field: "image",
            name: "Image"
          },
          {
            field: "customer_name",
            name: "Name"
          },
          {
            field: "customer_email",
            name: "Email"
          },
          {
            field: "customer_address",
            name: "Shipping Address"
          },
          {
            field: "",
            name: "Action"
          }
        ],
        actions: [
          {
            label: 'Edit',
            action: 'customer_edit',
            command: (event) => handleActionClick('customer_edit')
          },
        ]
      },
      reviews : {
        columns: [
          {
            field: "image",
            name: "Image"
          },
          {
            field: "customer_name",
            name: "Name"
          },
          {
            field: "review",
            name: "Review"
          },
          {
            field: "review_rate",
            name: "Rating"
          },
          {
            field: "review_submitted_at",
            name: "Submitted at"
          },
          {
            field: "",
            name: "Action"
          }
        ],
        actions: [
          {
            label: 'View',
            action: 'view_review',
            command: (event) => handleActionClick('view_review')
          },
          {
            label: 'Reply',
            action: 'reply_review',
            command: (event) => handleActionClick('reply_review')
          },
          {
            label: 'Delete',
            action: 'delete_review',
            command: (event) => handleActionClick('delete_review')
          },
        ]
      },
      categories : {
        columns: [
          {
            field: "image",
            name: "Image"
          },
          {
            field: "category_name",
            name: "Name"
          },
          {
            field: "category_description",
            name: "Description"
          },
          {
            field: "",
            name: "Action"
          }
        ],
        actions: [
          {
            label: 'Edit',
            action: 'edit_category',
            command: (event) => handleActionClick('edit_category')
          },
          {
            label: 'Delete',
            action: 'delete_category',
            command: (event) => handleActionClick('delete_category')
          },
        ]
      },
      attributes : {
        columns: [
          {
            field: "image",
            name: "Image"
          },
          {
            field: "attribute_name",
            name: "Name"
          },
          {
            field: "attribute_value",
            name: "Value"
          },
          {
            field: "",
            name: "Action"
          }
        ],
        actions: [
          {
            label: 'Edit',
            action: 'edit_attribute',
            command: (event) => handleActionClick('edit_attribute')
          },
          {
            label: 'Delete',
            action: 'delete_attribute',
            command: (event) => handleActionClick('delete_attribute')
          },
        ]
      }
    };

    useEffect(() => {
      console.log("sectionType useEffect : ",sectionType);
      if(sectionType != 'products'){
        if(sectionType == "customers"){
          setData(data_test.customers);
          setLoading(false);
        }else{
          setLoading(true);
        }
      }else{
        setData(data_test.products);
        setLoading(false);
      }
    },[sectionType])

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Deleted', detail: 'Record is deleted successfully.', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Cancelled', detail: 'Delete action is cancelled.', life: 3000 });
    }

    const confirm = () => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };
    
    const getSeverity = (stock) => {
      switch (stock) {
          case true:
              return 'success';

          case false:
              return 'danger';

          default:
              return 'danger';
      }
  };
    
    const getActions = () => {
        let action;
        switch (sectionType) {
            case 'products':
                action = dataTableDetails?.products.actions;
                break;
            case 'orders':
                action = dataTableDetails?.orders.actions;
                break;
            case 'reviews':
                action = dataTableDetails?.reviews.actions;
                break;
            case 'customers': 
                action =  dataTableDetails?.customers.actions;
                break;
            case 'categories': 
                action =  dataTableDetails?.categories.actions;
                break;
            case 'attributes': 
                action =  dataTableDetails?.attributes.actions;
                break;
            // Add more cases for other section types if needed
            default:
                action = null; // Handle default case appropriately
        }
        return action;
    }

    const getColumns = () => {
        let columns;
        switch (sectionType) {
            case 'products':
                columns = dataTableDetails?.products.columns;
                break;
            case 'orders':
                columns = dataTableDetails?.orders.columns;
                break;
            case 'reviews':
                columns = dataTableDetails?.reviews.columns;
                break;
            case 'customers': 
                columns = dataTableDetails?.customers.columns;
                break;
            case 'categories': 
                columns =  dataTableDetails?.categories.columns;
                break;
            case 'attributes': 
                columns =  dataTableDetails?.attributes.columns;
                break;
            // Add more cases for other section types if needed
            default:
                columns = null; // Handle default case appropriately
        }
        return columns;
    };
    
    const columns = getColumns();

    const getId = (rowData) => {
        let id;
        switch (sectionType) {
            case 'products':
                id = rowData?.product_id;
                break;
            case 'orders':
                id = rowData?.order_id;
                break;
            case 'reviews':
                id = rowData?.review_id;
                break;
            case 'customers': 
                id =  rowData?.customer_id;
                break;
            case 'categories': 
                id =  rowData?.category_id;
                break;
            case 'attributes': 
                id =  rowData?.attribute_id;
                break;
            // Add more cases for other section types if needed
            default:
                id = null; // Handle default case appropriately
        }
        return id;
    }

    const getDataTableDataKeyId = () => {
        let id;
        switch (sectionType) {
            case 'products':
                id = "product_id";
                break;
            case 'orders':
                id = "order_id";
                break;
            case 'reviews':
                id = "review_id";
                break;
            case 'customers': 
                id =  "customer_id";
                break;
            case 'categories': 
                id =  "category_id";
                break;
            case 'attributes': 
                id =  "attribute_id";
                break;
            // Add more cases for other section types if needed
            default:
                id = null; // Handle default case appropriately
        }
        return id;
    }
       

    const handleAction = (event, selected_data) => {
        menuRight.current.toggle(event);
        setSeletedAction(selected_data);
      }
    
      const rederCustomTemplate = (rowData, colIndex) => {
        let id = getId(rowData);
          if (colIndex === 0) {
            if(sectionType == "customers"){
                return  <Avatar label={rowData.avatar_name} size="large" className=' tw-text-lg ' />
            }else{
                return <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt={`product_img_${rowData.id}`} className=' tw-w-9 tw-h-9'/>
            }
          }else{
            let actions = getActions();
              return (
                  <div>
                      <div className=' tw-cursor-pointer' aria-controls={`product_action_${id}`} aria-haspopup onClick={(event) => handleAction(event,rowData)}>...</div>
                      <Menu model={actions} id={`product_action_${id}`} popupAlignment="right" ref={menuRight} popup className=' tw-w-32'/>
                  </div>
              )
          }
      }
    
      const handleActionClick = (action) => {
        if (action === 'product_edit') {
            // Navigate to product/:id for Edit or View actions
            navigate(`/productDetails?id=${selectedAction.product_id}`);
        } else if (action === 'product_view') {
            setDialogVisible(true);
        }else if (action === 'product_delete') {
            confirm();
            // Trigger API call for Delete action
            // You can add your API call here
            // For example:
            // fetch(`/api/products/${rowData.product_id}`, {
            //     method: 'DELETE'
            // }).then(response => {
            //     // Handle response
            // });
        }else if (action === 'order_change_status') {
           // open a popup which allows admin to change the status of the order
        } else if (action === 'order_view_details') {
          // open a popup which shows the details of order like customer details, product size, color, 
        }else if (action === 'customer_edit') {
            
        }else if (action === 'reply_review') {
            // open a popup which allows admin to change the status of the order
        } else if (action === 'delete_review') {
        // open a popup which shows the details of order like customer details, product size, color, 
        }else if (action === 'view_review') {
            
        }
    };

    const goToProductDetails = () => {
        navigate("/productDetails");
    }

    const dialogHeader = (
      <div className=' tw-flex tw-justify-between'>
          <div className=' tw-flex tw-gap-3 tw-items-center'>
            <i className="pi pi-tag"></i>
            <div className=' tw-text-lg'>{selectedAction.category}</div>
          </div>
      </div>
    );

    const header = (
        <div className=' tw-flex tw-justify-between tw-px-10 tw-py-5 tw-items-center'>
            <div className=' tw-text-lg tw-text-[#0E1422] tw-font-medium tw-capitalize'>
                {sectionType}
            </div>
            <div className="tw-flex tw-gap-5">
                { (sectionType === 'products' ||  sectionType === 'categories' ||  sectionType === 'attributes') && 
                    <Button className=' tw-h-10 tw-grid tw-w-32 shopper-bgcolor tw-text-white tw-rounded-md  tw-text-sm tw-font-medium' onClick={goToProductDetails}> 
                        Add {sectionType}
                    </Button>
                }
                <div className=' tw-relative tw-w-64 tw-h-10'>
                    <BsSearch className=' tw-absolute tw-top-3 tw-w-5 tw-h-5 tw-left-3'/>
                    <input type='text' className=' tw-h-10  tw-w-64 tw-border-2 tw-border-[#E6E7E8] !tw-pl-10  tw-rounded-lg tw-capitalize' value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder={`Search ${sectionType}`} />
                </div>
            </div>
        </div>
        
      );

  return (
    <div className='data_table  tw-p-10'>
        <Toast ref={toast} />
        <ConfirmDialog />
        <Dialog header={dialogHeader} visible={dialogVisible} className=' tw-w-80' onHide={() => {if (!dialogVisible) return; setDialogVisible(false); }} resizable={false} draggable={false}>
            <div className=' tw-grid tw-gap-5'>
              <div className=' tw-grid tw-gap-3 tw-justify-center'>
                  <div className=' tw-justify-self-center'>
                      <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="" className=' !tw-w-28 !tw-h-28'/>
                  </div>
                  <div className=' tw-text-center tw-text-2xl tw-font-bold'>{selectedAction.name}</div>
                  <Rating className=' tw-justify-center' value={selectedAction.rating} readOnly cancel={false}></Rating>
              </div>
              <div className=' tw-flex tw-justify-between'>
                <div>{selectedAction.price}</div>
                <div className='tw-w-5 tw-h-5 tw-rounded-full' style={{backgroundColor: `${selectedAction.color_code}`}} />
              </div>
              <div className=' tw-flex tw-justify-between'>
                <Tag value={`${selectedAction.stock == true? 'INSTOCK' : 'OUTOFSTOCK'}`} severity={getSeverity(selectedAction.stock)}></Tag>
                <div>{selectedAction.available_quantity}</div>
              </div>
            </div>
        </Dialog>
        <DataTable value={data}  selectionMode="checkbox"  selection={selectedRows}  onSelectionChange={(e) => setSelectedRows(e.value)} paginator header={header} rows={5} tableStyle={{ minWidth: '50rem', paddingInline: '40px' }} emptyMessage={`No ${sectionType} are available.`}>
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} body={<Skeleton shape="circle" size="4rem"/>}></Column>    
            { columns && columns.map((col,i) => {
                    if(i === 0 || i === columns?.length - 1 ){
                        return(
                            <Column key={`${sectionType}_${col.name}`} field={col.field} header={col.name}  body={(rowData) => rederCustomTemplate(rowData, i)} ></Column>
                        )
                    }else{
                        return(
                            <Column key={`${sectionType}_${col.name}`} field={col.field} header={col.name} body={loading ? <Skeleton /> : ''}></Column>
                        )
                    }
                    
                })
            }
        </DataTable>
    </div>
  )
}
