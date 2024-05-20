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

export default function GeneralDataTable() {

    const sectionType = useSelector((state) => state.leftMenu.leftMenu);
    console.log("sectionType : ",sectionType);
    
    const navigate = useNavigate();
    const {data, loading, error} = apiIntegration({ url: "http://localhost:3000/orders" });
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const menuRight = useRef(null);
    const [selectedAction, setSeletedAction] = useState('');

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
       

    const handleAction = (event, selected_id) => {
        menuRight.current.toggle(event);
        setSeletedAction(selected_id);
      }
    
      const rederCustomTemplate = (rowData, colIndex) => {
        let id = getId(rowData);
          if (colIndex === 0) {
              return <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt={`product_img_${rowData.id}`} className=' tw-w-9 tw-h-9'/>
          }else{
            let actions = getActions();
              return (
                  <div>
                      <div className=' tw-cursor-pointer' aria-controls={`product_action_${id}`} aria-haspopup onClick={(event) => handleAction(event,id)}>...</div>
                      <Menu model={actions} id={`product_action_${id}`} popupAlignment="right" ref={menuRight} popup className=' tw-w-32'/>
                  </div>
              )
          }
      }
    
      const handleActionClick = (action) => {
        if (action === 'product_edit' || action === 'product_view') {
            // Navigate to product/:id for Edit or View actions
            navigate(`/productDetails/${selectedAction}`);
        } else if (action === 'product_delete') {
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
        <DataTable value={data} dataKey={getDataTableDataKeyId} selectionMode="checkbox"  selection={selectedRows}  onSelectionChange={(e) => setSelectedRows(e.value)} paginator header={header} rows={5} tableStyle={{ minWidth: '50rem', paddingInline: '40px' }} emptyMessage={`No ${sectionType} are available.`}>
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} ></Column>    
            { columns && columns.map((col,i) => {
                    if(i === 0 || i === columns?.length - 1 ){
                        return(
                            <Column key={`${sectionType}_${col.name}`} field={col.field} header={col.name} body={(rowData) => rederCustomTemplate(rowData, i)}></Column>
                        )
                    }else{
                        return(
                            <Column key={`${sectionType}_${col.name}`} field={col.field} header={col.name}></Column>
                        )
                    }
                    
                })
            }
        </DataTable>
    </div>
  )
}
