import React from 'react';

import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form"
import { Editor } from 'primereact/editor';
import { Dropdown } from 'primereact/dropdown';
        

export default function ProductDetails() {

const {register, handleSubmit} = useForm();

const productSubmit = (data) => {
  console.log("data : ", data);
}

const stock_status = [
  { name: 'In Stock', code: 'I' },
  { name: 'Out of Stock', code: 'O' },
];

  return (
    <div className='product_details  tw-p-10'>
      <div className=' tw-bg-white tw-h-full tw-border-2 border-[#E9E9EB]'>
        <div className=' tw-h-20 tw-border-2 tw-border-b-[#ECECEC] tw-grid tw-items-center tw-pl-10'>
          Add Product
        </div>
        <div>
          <form className='tw-p-10' onSubmit={handleSubmit(productSubmit)}>
            <div className=' tw-grid grid-col' style={{gridTemplateColumns: '50% 50%'}}>
              <div>
                <div className=' tw-grid'>
                    <label htmlFor="">Title</label>
                    <input type="text" name="" id="" {...register("title")} />
                  </div>
                  <div>
                    <label htmlFor="">Price</label>
                    <input type="text" name="" id="" {...register("price")}/></div>
                  <div>
                    <label htmlFor="">Category</label>
                    <input type="text" name="" id="" /></div>
                  <div>
                    <label htmlFor="">Slug</label>
                    <input type="text" name="" id="" {...register("slug")}/>
                    </div>
                  <div>
                    <label htmlFor="">Stock status</label>
                    <Dropdown {...register("stock_status")} options={stock_status} optionLabel="name" 
                placeholder="Select stock status" className="w-full md:w-14rem" />
                    </div>
                  <div>
                    <label htmlFor="">Available quantity</label>
                    <input type="number" name="" id="" {...register("quantity")}/>
                    </div>
              </div>
              <div>
                  <div className=' tw-grid'>
                    <label htmlFor="">SKU</label>
                    <input type="text" name="" id="" />
                  </div>
                  <div className=' tw-grid'>
                    <label htmlFor="">Images</label>
                    <input type="text" name="" id="" />
                  </div>
                  <div className=' tw-grid'>
                    <label htmlFor="">Colors</label>
                    <input type="text" name="" id="" />
                  </div>
                  <div className=' tw-grid'>
                    <label htmlFor="">Sizes</label>
                    <input type="text" name="" id="" />
                  </div>
              </div> 
            </div>
            <div>
              <Editor />
            </div>
            <button type='submit'>Save Product</button>
          </form>
        </div>
      </div>
    </div>
  )
}
