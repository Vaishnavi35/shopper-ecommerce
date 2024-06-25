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
import { Image } from 'primereact/image';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Accordion, AccordionTab } from 'primereact/accordion';
        
export default function GeneralDataTable() {
    
    const baseURL = "products";
    const sectionType = useSelector((state) => state.leftMenu.leftMenu);
    console.log("sectionType : ",sectionType);
    const navigate = useNavigate();
    const [staticLoading,setStaticLoading] = useState(false);
    
    // const {data, loading, error} = apiIntegration({ url: "http://localhost:3000/orders" });
    const {data, loading, error, fetchData} = apiIntegration()
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const menuRight = useRef(null);
    const [selectedActionRecord, setSelectedActionRecord] = useState({});
    const [staticData,setStaticData]= useState();
    const [dialogVisible, setDialogVisible] = useState(false);
    const toast = useRef(null);
    const [selectedAction, setSelectedAction] = useState("");
    const order_delivery_events = [
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];

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
        "order_no": "ORD000001",
        "order_date": "2024-05-25 12:14:35",
        "Order_Status": "Shipped",
        "Customer_Name": "Customer 1",
        "Email": "customer1@example.com",
        "Phone": "+1234567891",
        "Shipping_Address": "1231 Main Street, City, State, ZIP",
        "Shipping_Method": "Standard",
        "Estimated_Delivery_Date": "2024-05-29",
        "Tracking_Number": "TRACK000001",
        "Billing_Address": "1231 Main Street, City, State, ZIP",
        "Payment_Method": "Credit Card",
        "Card_Value": "VisaXXXXX1234",
        "Products": [
          {
            "Product_Name": "Camera",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 372.62,
            "Total_Price": 372.62
          },
          {
            "Product_Name": "Smartphone",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 3,
            "Price": 185.33,
            "Total_Price": 555.99
          }
        ],
        "Subtotal": 928.61,
        "Shipping_Cost": 13.58,
        "Tax": 74.29,
        "Discounts": 5.96,
        "Total_Amount": 1010.52
      },
      {
        "order_no": "ORD000002",
        "order_date": "2024-05-26 10:20:45",
        "Order_Status": "Processing",
        "Customer_Name": "Customer 2",
        "Email": "customer2@example.com",
        "Phone": "+1987654321",
        "Shipping_Address": "456 Elm Street, City, State, ZIP",
        "Shipping_Method": "Express",
        "Estimated_Delivery_Date": "2024-05-28",
        "Tracking_Number": "TRACK000002",
        "Billing_Address": "456 Elm Street, City, State, ZIP",
        "Payment_Method": "Credit Card",
        "Card_Value": "MasterCardXXXXX5678",
        "Products": [
          {
            "Product_Name": "Laptop",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 2,
            "Price": 899.99,
            "Total_Price": 1799.98
          }
        ],
        "Subtotal": 1799.98
      },
      {
        "order_no": "ORD000003",
        "order_date": "2024-05-27 14:30:22",
        "Order_Status": "Shipped",
        "Customer_Name": "Customer 3",
        "Email": "customer3@example.com",
        "Phone": "+1122334455",
        "Shipping_Address": "789 Oak Avenue, City, State, ZIP",
        "Shipping_Method": "Standard",
        "Estimated_Delivery_Date": "2024-06-02",
        "Tracking_Number": "TRACK000003",
        "Billing_Address": "789 Oak Avenue, City, State, ZIP",
        "Payment_Method": "PayPal",
        "Card_Value": "N/A",
        "Products": [
          {
            "Product_Name": "Headphones",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 99.99,
            "Total_Price": 99.99
          }
        ],
        "Subtotal": 99.99,
        "Shipping_Cost": 8.50,
        "Tax": 8.00,
        "Discounts": 0.00,
        "Total_Amount": 116.49
      },
      {
        "order_no": "ORD000004",
        "order_date": "2024-05-28 09:45:18",
        "Order_Status": "Delivered",
        "Customer_Name": "Customer 4",
        "Email": "customer4@example.com",
        "Phone": "+9988776655",
        "Shipping_Address": "101 Pine Street, City, State, ZIP",
        "Shipping_Method": "Express",
        "Estimated_Delivery_Date": "2024-05-30",
        "Tracking_Number": "TRACK000004",
        "Billing_Address": "101 Pine Street, City, State, ZIP",
        "Payment_Method": "Debit Card",
        "Card_Value": "VisaXXXXX9876",
        "Products": [
          {
            "Product_Name": "Tablet",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 349.99,
            "Total_Price": 349.99
          }
        ],
        "Subtotal": 349.99,
        "Shipping_Cost": 15.00,
        "Tax": 28.00,
        "Discounts": 10.00,
        "Total_Amount": 382.99
      },
      {
        "order_no": "ORD000005",
        "order_date": "2024-05-29 11:55:07",
        "Order_Status": "Processing",
        "Customer_Name": "Customer 5",
        "Email": "customer5@example.com",
        "Phone": "+1122334455",
        "Shipping_Address": "456 Maple Avenue, City, State, ZIP",
        "Shipping_Method": "Standard",
        "Estimated_Delivery_Date": "2024-06-03",
        "Tracking_Number": "",
        "Billing_Address": "456 Maple Avenue, City, State, ZIP",
        "Payment_Method": "Credit Card",
        "Card_Value": "AmexXXXXX2468",
        "Products": [
          {
            "Product_Name": "Printer",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 2,
            "Price": 129.99,
            "Total_Price": 259.98
          }
        ],
        "Subtotal": 259.98,
        "Shipping_Cost": 10.00,
        "Tax": 20.80,
        "Discounts": 0.00,
        "Total_Amount": 290.78
      },
      {
        "order_no": "ORD000006",
        "order_date": "2024-05-30 08:10:15",
        "Order_Status": "Shipped",
        "Customer_Name": "Customer 6",
        "Email": "customer6@example.com",
        "Phone": "+1122334455",
        "Shipping_Address": "789 Cedar Street, City, State, ZIP",
        "Shipping_Method": "Express",
        "Estimated_Delivery_Date": "2024-06-01",
        "Tracking_Number": "TRACK000006",
        "Billing_Address": "789 Cedar Street, City, State, ZIP",
        "Payment_Method": "Credit Card",
        "Card_Value": "DiscoverXXXXX1357",
        "Products": [
          {
            "Product_Name": "Monitor",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 199.99,
            "Total_Price": 199.99
          }
        ],
        "Subtotal": 199.99,
        "Shipping_Cost": 20.00,
        "Tax": 16.00,
        "Discounts": 5.00,
        "Total_Amount": 230.99
      },
      {
        "order_no": "ORD000007",
        "order_date": "2024-05-31 13:20:30",
        "Order_Status": "Processing",
        "Customer_Name": "Customer 7",
        "Email": "customer7@example.com",
        "Phone": "+1122334455",
        "Shipping_Address": "101 Oak Street, City, State, ZIP",
        "Shipping_Method": "Standard",
        "Estimated_Delivery_Date": "2024-06-05",
        "Tracking_Number": "",
        "Billing_Address": "101 Oak Street, City, State, ZIP",
        "Payment_Method": "PayPal",
        "Card_Value": "N/A",
        "Products": [
          {
            "Product_Name": "Keyboard",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 49.99,
            "Total_Price": 49.99
          },
          {
            "Product_Name": "Mouse",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 29.99,
            "Total_Price": 29.99
          }
        ],
        "Subtotal": 79.98,
        "Shipping_Cost": 5.00,
        "Tax": 6.40,
        "Discounts": 0.00,
        "Total_Amount": 91.38
      },
      {
        "order_no": "ORD000008",
        "order_date": "2024-06-01 09:45:18",
        "Order_Status": "Delivered",
        "Customer_Name": "Customer 8",
        "Email": "customer8@example.com",
        "Phone": "+1122334455",
        "Shipping_Address": "789 Pine Street, City, State, ZIP",
        "Shipping_Method": "Express",
        "Estimated_Delivery_Date": "2024-06-03",
        "Tracking_Number": "TRACK000008",
        "Billing_Address": "789 Pine Street, City, State, ZIP",
        "Payment_Method": "Debit Card",
        "Card_Value": "MasterCardXXXXX4567",
        "Products": [
          {
            "Product_Name": "External Hard Drive",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 79.99,
            "Total_Price": 79.99
          }
        ],
        "Subtotal": 79.99,
        "Shipping_Cost": 8.00,
        "Tax": 6.40,
        "Discounts": 0.00,
        "Total_Amount": 94.39
      },
      {
        "order_no": "ORD000009",
        "order_date": "2024-06-02 11:55:07",
        "Order_Status": "Processing",
        "Customer_Name": "Customer 9",
        "Email": "customer9@example.com",
        "Phone": "+1122334455",
        "Shipping_Address": "456 Walnut Street, City, State, ZIP",
        "Shipping_Method": "Standard",
        "Estimated_Delivery_Date": "2024-06-07",
        "Tracking_Number": "",
        "Billing_Address": "456 Walnut Street, City, State, ZIP",
        "Payment_Method": "Credit Card",
        "Card_Value": "VisaXXXXX2468",
        "Products": [
          {
            "Product_Name": "Wireless Router",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 69.99,
            "Total_Price": 69.99
          }
        ],
        "Subtotal": 69.99,
        "Shipping_Cost": 7.00,
        "Tax": 5.60,
        "Discounts": 0.00,
        "Total_Amount": 82.59
      },
      {
        "order_no": "ORD000010",
        "order_date": "2024-06-03 15:30:45",
        "Order_Status": "Shipped",
        "Customer_Name": "Customer 10",
        "Email": "customer10@example.com",
        "Phone": "+1122334455",
        "Shipping_Address": "101 Maple Street, City, State, ZIP",
        "Shipping_Method": "Express",
        "Estimated_Delivery_Date": "2024-06-05",
        "Tracking_Number": "TRACK000010",
        "Billing_Address": "101 Maple Street, City, State, ZIP",
        "Payment_Method": "Credit Card",
        "Card_Value": "AmexXXXXX7890",
        "Products": [
          {
            "Product_Name": "Smart Watch",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 149.99,
            "Total_Price": 149.99
          }
        ],
        "Subtotal": 149.99,
        "Shipping_Cost": 12.00,
        "Tax": 12.00,
        "Discounts": 0.00,
        "Total_Amount": 173.99
      },
      {
        "order_no": "ORD000011",
        "order_date": "2024-06-04 09:45:18",
        "Order_Status": "Delivered",
        "Customer_Name": "Customer 11",
        "Email": "customer11@example.com",
        "Phone": "+1122334455",
        "Shipping_Address": "789 Elm Street, City, State, ZIP",
        "Shipping_Method": "Standard",
        "Estimated_Delivery_Date": "2024-06-08",
        "Tracking_Number": "TRACK000011",
        "Billing_Address": "789 Elm Street, City, State, ZIP",
        "Payment_Method": "Debit Card",
        "Card_Value": "VisaXXXXX6547",
        "Products": [
          {
            "Product_Name": "Wireless Earbuds",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 89.99,
            "Total_Price": 89.99
          },
          {
            "Product_Name": "Bluetooth Speaker",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 59.99,
            "Total_Price": 59.99
          }
        ],
        "Subtotal": 149.98,
        "Shipping_Cost": 10.00,
        "Tax": 12.00,
        "Discounts": 5.00,
        "Total_Amount": 166.98
      },
      {
        "order_no": "ORD000012",
        "order_date": "2024-06-05 11:55:07",
        "Order_Status": "Processing",
        "Customer_Name": "Customer 12",
        "Email": "customer12@example.com",
        "Phone": "+1122334455",
        "Shipping_Address": "456 Oak Street, City, State, ZIP",
        "Shipping_Method": "Standard",
        "Estimated_Delivery_Date": "2024-06-10",
        "Tracking_Number": "",
        "Billing_Address": "456 Oak Street, City, State, ZIP",
        "Payment_Method": "Credit Card",
        "Card_Value": "DiscoverXXXXX2468",
        "Products": [
          {
            "Product_Name": "Digital Camera",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 279.99,
            "Total_Price": 279.99
          }
        ],
        "Subtotal": 279.99,
        "Shipping_Cost": 15.00,
        "Tax": 22.40,
        "Discounts": 0.00,
        "Total_Amount": 317.39
      },
      {
        "order_no": "ORD000013",
        "order_date": "2024-06-06 14:30:22",
        "Order_Status": "Shipped",
        "Customer_Name": "Customer 13",
        "Email": "customer13@example.com",
        "Phone": "+1122334455",
        "Shipping_Address": "789 Cedar Street, City, State, ZIP",
        "Shipping_Method": "Express",
        "Estimated_Delivery_Date": "2024-06-07",
        "Tracking_Number": "TRACK000013",
        "Billing_Address": "789 Cedar Street, City, State, ZIP",
        "Payment_Method": "Credit Card",
        "Card_Value": "MasterCardXXXXX7532",
        "Products": [
          {
            "Product_Name": "Fitness Tracker",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 129.99,
            "Total_Price": 129.99
          },
          {
            "Product_Name": "Yoga Mat",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 39.99,
            "Total_Price": 39.99
          }
        ],
        "Subtotal": 169.98,
        "Shipping_Cost": 20.00,
        "Tax": 13.60,
        "Discounts": 0.00,
        "Total_Amount": 203.58
      },
      {
        "order_no": "ORD000014",
        "order_date": "2024-06-07 09:45:18",
        "Order_Status": "Delivered",
        "Customer_Name": "Customer 14",
        "Email": "customer14@example.com",
        "Phone": "+1122334455",
        "Shipping_Address": "101 Pine Street, City, State, ZIP",
        "Shipping_Method": "Standard",
        "Estimated_Delivery_Date": "2024-06-11",
        "Tracking_Number": "TRACK000014",
        "Billing_Address": "101 Pine Street, City, State, ZIP",
        "Payment_Method": "Debit Card",
        "Card_Value": "VisaXXXXX3579",
        "Products": [
          {
            "Product_Name": "Gaming Mouse",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 49.99,
            "Total_Price": 49.99
          }
        ],
        "Subtotal": 49.99,
        "Shipping_Cost": 5.00,
        "Tax": 4.00,
        "Discounts": 0.00,
        "Total_Amount": 58.99
      },
      {
        "order_no": "ORD000015",
        "order_date": "2024-06-08 11:55:07",
        "Order_Status": "Processing",
        "Customer_Name": "Customer 15",
        "Email": "customer15@example.com",
        "Phone": "+1122334455",
        "Shipping_Address": "456 Elm Street, City, State, ZIP",
        "Shipping_Method": "Standard",
        "Estimated_Delivery_Date": "2024-06-12",
        "Tracking_Number": "",
        "Billing_Address": "456 Elm Street, City, State, ZIP",
        "Payment_Method": "Credit Card",
        "Card_Value": "AmexXXXXX3698",
        "Products": [
          {
            "Product_Name": "Wireless Keyboard",
            "Product_Image": "http://example.com/image.jpg",
            "Quantity": 1,
            "Price": 59.99,
            "Total_Price": 59.99
          }
        ],
        "Subtotal": 59.99,
        "Shipping_Cost": 7.00,
        "Tax": 4.80,
        "Discounts": 0.00,
        "Total_Amount": 71.79
      },
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
            field: "Customer_Name",
            name: "Customer"
          },
          {
            field: "order_date",
            name: "Date"
          },
          {
            field: "Total_Amount",
            name: "Total"
          },
          {
            field: "Order_Status",
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
          },
          {
            label: 'View Delivery Status',
            action: 'view_delivery_details',
            command: (event) => handleActionClick('view_delivery_details')
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
            name: "Shipping_Address"
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
      setStaticLoading(false);
      if(sectionType == 'products'){
        let val = {
            httpType : 'POST',
            apiURL : `${baseURL}/getProducts`,
        }
        fetchData(val);
        console.log(" data : ",data);
        console.log(" loading : ",loading);
        console.log(" error : ",error);
        setStaticData(data_test.products);
        
        // if(sectionType == "customers"){
        //   setStaticData(data_test.customers);
        //   setStaticLoading(false);
        // }else{
          
        // }
      }else if(sectionType == "orders"){
        setStaticData(data_test.orders);
      } else{
        setStaticLoading(true);
        
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

    const orderStatusSeverity = (status) => {
      switch (status){
        case 'Ordered' : 
            return 'info';

        case 'Processing' : 
            return 'warning';  

        case 'Shipped' : 
            return 'secondary';

        case 'Delivered' : 
            return 'success'; 

        case 'Cancelled' : 
            return 'danger'; 

        default:
            return 'danger';
      }
    }

    const orderStatusIcon = (status) => {
      switch (status){
        case 'Ordered' : 
            return 'pi pi-shopping-cart';

        case 'Processing' : 
            return 'pi pi-cog';  

        case 'Shipped' : 
            return 'pi pi-truck';

        case 'Delivered' : 
            return 'pi pi-check'; 

        case 'Cancelled' : 
            return 'pi pi-times'; 

        default:
            return 'pi pi-times';
      }
    }
    
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
        setSelectedActionRecord(selected_data);
      }
    
      const renderCustomTemplate = (rowData, colIndex) => {
        let id = getId(rowData);
          if (colIndex === 0) {
            if(sectionType == "customers"){
                return  <Avatar label={rowData.avatar_name} size="large" className=' tw-text-lg ' />
            }else{
                return <Image src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt={`product_img_${rowData.id}`} imageClassName=' !tw-w-9 !tw-h-9' width="250" preview />
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
        setSelectedAction(action);
        if (action === 'product_edit') {
            // Navigate to product/:id for Edit or View actions
            navigate(`/productDetails?id=${selectedActionRecord.product_id}`);
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
          setDialogVisible(true);
          // open a popup which shows the details of order like customer details, product size, color, 
        }else if(action === 'view_delivery_details'){

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

    const viewOrder = (
      <Accordion activeIndex={0}>
          <AccordionTab header="Order Information">
              <div>
                <label htmlFor="">Order No</label>
                <div> {selectedActionRecord.order_no} </div>
              </div>
              <div>
                <label htmlFor="">Order Date</label>
                <div> {selectedActionRecord.order_date} </div>
              </div>
              <div>
                <label htmlFor="">Order Status</label>
                <Tag severity={orderStatusSeverity(selectedActionRecord.Order_Status)} value={selectedActionRecord.Order_Status} icon={orderStatusIcon(selectedActionRecord.Order_Status)} rounded></Tag>
              </div>
          </AccordionTab>
          <AccordionTab header="Customer Information">
              <div>
                <label htmlFor="">Customer Name</label>
                <div>{selectedActionRecord.Customer_Name}</div>
              </div>
              <div>
                <label htmlFor="">Email</label>
                <div>{selectedActionRecord.Email}</div>
              </div>
              <div>
                <label htmlFor="">Phone</label>
                <div>{selectedActionRecord.Phone}</div>
              </div>
          </AccordionTab>
          <AccordionTab header="Shipping Information">
              <div>
                <label htmlFor="">Shipping Address</label>
                <div>{selectedActionRecord.Shipping_Address}</div>
              </div>
              <div>
                <label htmlFor="">Shipping_Method</label>
                <div>{selectedActionRecord.Shipping_Method}</div>
              </div>
              <div>
                <label htmlFor="">Estimated_Delivery_Date</label>
                <div>{selectedActionRecord.Estimated_Delivery_Date}</div>
              </div>
              <div>
                <label htmlFor="">Tracking_Number</label>
                <div>{selectedActionRecord.Tracking_Number}</div>
              </div>
          </AccordionTab>
          <AccordionTab header="Billing Information">
              <div>
                <label htmlFor="">Billing_Address</label>
                <div>{selectedActionRecord.Billing_Address}</div>
              </div>
              <div>
                <label htmlFor="">Payment_Method</label>
                <div>{selectedActionRecord.Payment_Method}</div>
              </div>
              <div>
                <label htmlFor="">Card_Value</label>
                <div>{selectedActionRecord.Card_Value}</div>
              </div>
          </AccordionTab>
          <AccordionTab header="Order Items">
              <p className="m-0">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                  quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                  Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
              </p>
          </AccordionTab>
          <AccordionTab header="Pricing Summary">
              <div>
                <label htmlFor="">Subtotal</label>
                <div>{selectedActionRecord.Subtotal}</div>
              </div>
              <div>
                <label htmlFor="">Shipping_Cost</label>
                <div>{selectedActionRecord.Shipping_Cost}</div>
              </div>
              <div>
                <label htmlFor="">Tax</label>
                <div>{selectedActionRecord.Tax}</div>
              </div>
              <div>
                <label htmlFor="">Discounts</label>
                <div>{selectedActionRecord.Discounts}</div>
              </div>
              <div>
                <label htmlFor="">Total_Amount</label>
                <div>{selectedActionRecord.Total_Amount}</div>
              </div>
          </AccordionTab>
      </Accordion>
    );

    const viewOrderDeviveryDetails = (
      <div>

      </div>
    );

    const viewProduct = (
        <div className=' tw-grid tw-gap-5'>
            <div className=' tw-grid tw-gap-3 tw-justify-center'>
                <div className=' tw-justify-self-center'>
                    <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="" className=' !tw-w-28 !tw-h-28'/>
                </div>
                <div className=' tw-text-center tw-text-2xl tw-font-bold'>{selectedActionRecord.name}</div>
                <Rating className=' tw-justify-center' value={selectedActionRecord.rating} readOnly cancel={false}></Rating>
            </div>
            <div className=' tw-flex tw-justify-between'>
                <div>{selectedActionRecord.price}</div>
                <div className='tw-w-5 tw-h-5 tw-rounded-full' style={{backgroundColor: `${selectedActionRecord.color_code}`}} />
            </div>
            <div className=' tw-flex tw-justify-between'>
                <Tag value={`${selectedActionRecord.stock == true? 'INSTOCK' : 'OUTOFSTOCK'}`} severity={getSeverity(selectedActionRecord.stock)}></Tag>
                <div>{selectedActionRecord.available_quantity}</div>
            </div>
        </div>
    );

    const dialogHeader = (
      <div className=' tw-flex tw-justify-between'>
          <div className=' tw-flex tw-gap-3 tw-items-center'>
            <i className="pi pi-tag"></i>
            <div className=' tw-text-lg'>{selectedActionRecord.category}</div>
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

      const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="Totals:" colSpan={6} className=' tw-text-right'/>
                <Column footer="$506,202" />
            </Row>
        </ColumnGroup>
    );

  return (
    <div className='data_table  tw-p-10'>
        <Toast ref={toast} />
        <ConfirmDialog />
        <Dialog header={dialogHeader} visible={dialogVisible} className={`${selectedAction == 'product_view'? 'tw-w-80' : ' tw-w-4/5'}`} onHide={() => {if (!dialogVisible) return; setDialogVisible(false); }} resizable={false} draggable={false}>
            {selectedAction == 'product_view' ? viewProduct : (selectedAction == 'view_delivery_details') ? viewOrderDeviveryDetails : viewOrder}
        </Dialog>
        <DataTable value={staticData}  selectionMode="checkbox"  selection={selectedRows}  onSelectionChange={(e) => setSelectedRows(e.value)} paginator header={header} rows={5} tableStyle={{ minWidth: '50rem', paddingInline: '40px' }} emptyMessage={`No ${sectionType} are available.`} footerColumnGroup={sectionType == 'orders' ? footerGroup : ''}>
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} body={<Skeleton shape="circle" size="4rem"/>}></Column>    
            { columns && columns.map((col,i) => {
                    if(i === 0 || i === columns?.length - 1 ){
                        return(
                            <Column key={`${sectionType}_${col.name}`} field={col.field} header={col.name}  body={(rowData) => renderCustomTemplate(rowData, i)} ></Column>
                        )
                    }else{
                        return(
                            <Column key={`${sectionType}_${col.name}`} field={col.field} header={col.name} body={staticLoading ? <Skeleton /> : ''} sortable></Column>
                        )
                    }
                    
                })
            }
        </DataTable>
    </div>
  )
}
