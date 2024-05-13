import React from 'react';
import GeneralDataTable from '../common/GeneralDataTable';

const Orders = () => {

//   const navigate = useNavigate();
//   const {data, loading, error} = apiIntegration({ url: "http://localhost:3000/orders" });
//   const [globalFilter, setGlobalFilter] = useState('');
//   const [selectedRows, setSelectedRows] = useState([]);
//   const menuRight = useRef(null);
//   const [selectedAction, setSeletedAction] = useState('');
  
//   const handleAction = (event, product_id) => {
//     menuRight.current.toggle(event);
//     setSeletedAction(product_id);
//   }

//   const rederCustomTemplate = (rowData, colIndex) => {
//       if (colIndex === 0) {
//           return <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt={`produce_img_${rowData.name}`} className=' tw-w-9 tw-h-9'/>
//       }else{
//           return (
//               <div>
//                   <div className=' tw-cursor-pointer' aria-controls={`product_action_${rowData.product_id}`} aria-haspopup onClick={(event) => handleAction(event,rowData.product_id)}>...</div>
//                   <Menu model={items} id={`product_action_${rowData.product_id}`} popupAlignment="right" ref={menuRight} popup className=' tw-w-32'/>
//               </div>
//           )
//       }
//   }

//   const handleActionClick = (action) => {
//     if (action === 'change_status') {
//        // open a popup which allows admin to change the status of the order
//     } else if (action === 'view_details') {
//       // open a popup which shows the details of order like customer details, product size, color, 
//     }
// };

  return (
    <GeneralDataTable />
  )
}

export default Orders