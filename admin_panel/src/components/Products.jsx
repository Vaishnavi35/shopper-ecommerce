import React, { useState, useEffect, useRef } from 'react';
import { apiIntegration } from "../customHook/apiIntegration";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { BsSearch } from "react-icons/bs";
import { Menu } from 'primereact/menu'; 
import { useNavigate, Link } from "react-router-dom";

const Products = () => {

const navigate = useNavigate();
const {data, loading, error} = apiIntegration({ url: "http://localhost:3000/products" });
const [globalFilter, setGlobalFilter] = useState('');
const [selectedRows, setSelectedRows] = useState([]);
const menuRight = useRef(null);
const [selectedAction, setSeletedAction] = useState('');
const items = [
            {
                label: 'Edit',
                action: 'Edit',
                command: (event) => handleActionClick('Edit')
            },
            {
                label: 'Delete',
                action: 'Delete',
                command: (event) => handleActionClick('Delete')
            },
            {
                label: 'View',
                action: 'View',
                command: (event) => handleActionClick('View')
            }
];
const products_column = [
    // 'Image','Name', 'SKU', 'Price', 'Stock', 'Categories', 'Action'
    {
        field: "image",
        name : "Image"
    },
    {
        field: "name",
        name : "Name"
    },
    {
        field: "SKU",
        name : "SKU"
    },
    {
        field: "price",
        name : "Price"
    }, {
        field: "category",
        name : "Categories"
    },
    {
        field: "",
        name : "Action"
    },
];

const handleActionClick = (action) => {
    if (action === 'Edit' || action === 'View') {
        // Navigate to product/:id for Edit or View actions
        navigate(`/productDetails/${selectedAction}`);
    } else if (action === 'Delete') {
        // Trigger API call for Delete action
        // You can add your API call here
        // For example:
        // fetch(`/api/products/${rowData.product_id}`, {
        //     method: 'DELETE'
        // }).then(response => {
        //     // Handle response
        // });
    }
};

    const handleAction = (event, product_id) => {
        menuRight.current.toggle(event);
        setSeletedAction(product_id);
    }

// useEffect(() => {
//     // You can add any side effects related to data, loading, or error here
//     // For example, you might want to perform certain actions when data is updated
//     // or when loading status changes.
//     console.log("Data:", data);
//     console.log("Loading:", loading);
//     console.log("Error:", error);
// }, [data, loading, error]);

    const rederCustomTemplate = (rowData, colIndex) => {
        if (colIndex === 0) {
            return <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt={`produce_img_${rowData.name}`} className=' tw-w-9 tw-h-9'/>
        }else{
            return (
                <div>
                    <div className=' tw-cursor-pointer' aria-controls={`product_action_${rowData.product_id}`} aria-haspopup onClick={(event) => handleAction(event,rowData.product_id)}>...</div>
                    <Menu model={items} id={`product_action_${rowData.product_id}`} popupAlignment="right" ref={menuRight} popup className=' tw-w-32'/>
                </div>
            )
        }
    }

    const header = (
        <div className=' tw-flex tw-justify-between tw-px-10 tw-py-5 tw-items-center'>
            <div className=' tw-text-lg tw-text-[#0E1422] tw-font-medium'>
                Products
            </div>
            <div className="tw-flex tw-gap-5">
                <button className=' tw-h-10  tw-w-32 shopper-bgcolor tw-text-white tw-rounded-md  tw-text-sm tw-font-medium'> 
                    <Link to="/productDetails">Add product </Link>
                </button>
                <div className=' tw-relative tw-w-64 tw-h-10'>
                    <BsSearch className=' tw-absolute tw-top-3 tw-w-5 tw-h-5 tw-left-3'/>
                    <input type='text' className=' tw-h-10  tw-w-64 tw-border-2 tw-border-[#E6E7E8] tw-pl-10  tw-rounded-lg' value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search products" />
                </div>
            </div>
        </div>
        
      );

  return (
    <div className='products tw-p-10'>
        <DataTable value={data} dataKey='product_id' selectionMode="checkbox"  selection={selectedRows}  onSelectionChange={(e) => setSelectedRows(e.value)} paginator header={header} rows={5} tableStyle={{ minWidth: '50rem', paddingInline: '40px' }} emptyMessage="No products are available.">
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} ></Column>    
        {products_column.map((col,i) => {
                if(i === 0 || i === products_column?.length - 1 ){
                    return(
                        <Column key={`product_col_${col.name}`} field={col.field} header={col.name} body={(rowData) => rederCustomTemplate(rowData, i)}></Column>
                    )
                }else{
                    return(
                        <Column key={`product_col_${col.name}`} field={col.field} header={col.name}></Column>
                    )
                }
                
            })

            }
        </DataTable>
    </div>
  )
}

export default Products;