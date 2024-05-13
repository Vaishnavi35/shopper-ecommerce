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
          label: 'Edit',
          action: 'product_edit',
          command: (event) => handleActionClick('product_edit')
        },
        {
          label: 'Delete',
          action: 'product_delete',
          command: (event) => handleActionClick('product_delete')
        },
        {
          label: 'View',
          action: 'product_view',
          command: (event) => handleActionClick('product_view')
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
          label: 'Reply',
          action: 'reply_review',
          command: (event) => handleActionClick('reply_review')
        },
        {
          label: 'Delete',
          action: 'delete_review',
          command: (event) => handleActionClick('delete_review')
        },
        {
          label: 'View',
          action: 'view_review',
          command: (event) => handleActionClick('view_review')
        }
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
  
