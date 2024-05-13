export const dataTableDetails = {
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
          action: 'change_status',
          command: (event) => handleActionClick('change_status')
        },
        {
          label: 'View Details',
          action: 'view_details',
          command: (event) => handleActionClick('view_details')
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
      ]
    }
  };
  