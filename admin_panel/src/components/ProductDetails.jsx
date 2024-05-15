import React, {useState, useEffect} from 'react';

import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from "primereact/inputtext";
import { useForm, Controller} from "react-hook-form"
import { Editor } from 'primereact/editor';
import { Dropdown } from 'primereact/dropdown';
import { categories, subCategories } from "../../util";
import { Button } from 'primereact/button';
import { Chips } from 'primereact/chips';
import { ColorPicker } from 'primereact/colorpicker';
        

export default function ProductDetails() {

  const {register, handleSubmit, control, setValue, watch, formState: { errors }, getValues} = useForm({
    defaultValues: {
      colors: []
    }
  });
  const selectedCategory = watch('category');
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const colors = watch('colors', []); // Watch the colors array

  const stock_status_list = [
    { name: 'In Stock', code: 'I' },
    { name: 'Out of Stock', code: 'O' },
  ];

  const productSubmit = (data) => {
    console.log("data : ", data);
  }

  const addColor = () => {
    let selected_color = getValues('colorPicker');
    let colors = getValues('colors');
    let color_name = getValues("color_name");
    
    if(selected_color && color_name && colors && !colors.includes(selected_color)){
      let color = {
        name : color_name,
        color : selected_color
      }
      setValue('colors', [...colors, color]);
    }
    console.log(" color :", colors);
  }

  useEffect(() => {
    setSubCategoryOptions(subCategories[selectedCategory] || [])
  },[selectedCategory, setValue])

  const renderEditorHeader = (
      <span className="ql-formats">
          <button className="ql-bold" aria-label="Bold"></button>
          <button className="ql-italic" aria-label="Italic"></button>
          <button className="ql-underline" aria-label="Underline"></button>
      </span>
  );

  return (
    <div className='product_details  tw-p-10'>
      <div className=' tw-bg-white tw-h-full tw-border-2 border-[#E9E9EB]'>
        <div className=' tw-h-20 tw-border-2 tw-border-b-[#ECECEC] tw-grid tw-items-center tw-pl-10'>
          Add Product
        </div>
        <div className=' tw-max-h-[80%] tw-overflow-y-scroll tw-scroll-smooth'>
          <form className='tw-p-10' onSubmit={handleSubmit(productSubmit)}>
            <div className=' tw-grid grid-col' style={{gridTemplateColumns: '50% 50%'}}>
              <div className=' tw-grid tw-gap-3'>
                <div className=' tw-grid'>
                    <label htmlFor="">Title</label>
                    <input type="text" name="" id="" {...register("title")} className='tw-border-2 tw-border-[#E6E7E8] tw-rounded-lg'/>
                  </div>
                  <div className=' tw-grid'>
                    <label htmlFor="">Price</label>
                    <input type="text" name="" id="" {...register("price")} className='tw-border-2 tw-border-[#E6E7E8] tw-rounded-lg'/>
                  </div>
                  <div className=' tw-grid'>
                    <label htmlFor="">Category</label>
                    <Controller name='category' control={control} render={({field}) => (
                          <Dropdown {...field}  options={categories} optionLabel="value" placeholder="Select category" className=" tw-max-w-64 tw-border-2 tw-h-11 tw-border-[#E6E7E8] tw-rounded-lg" />
                      )} 
                    />
                  </div>
                  <div className=' tw-grid'>
                    <label htmlFor="">Sub Category</label>
                    <Controller name='sub_category' control={control} render={({field}) => (
                          <Dropdown {...field}  options={subCategoryOptions} optionLabel="value" placeholder="Select sub-category" className=" tw-max-w-64 tw-border-2 tw-h-11 tw-border-[#E6E7E8] tw-rounded-lg" />
                      )} 
                    />
                  </div>
                  
                  <div className=' tw-grid'>
                      <label htmlFor="">Stock status</label>
                      <Controller name='stock_status' control={control} render={({field}) => (
                          <Dropdown {...field}  options={stock_status_list} optionLabel="name" placeholder="Select stock status" className=" tw-max-w-64 tw-border-2 tw-h-11 tw-border-[#E6E7E8] tw-rounded-lg" />
                        )} 
                      />
                  </div>
                  <div className=' tw-grid'>
                    <label htmlFor="">Available quantity</label>
                    <input type="number" name="" id="" {...register("quantity")} className='tw-border-2 tw-border-[#E6E7E8] tw-rounded-lg'/>
                  </div>
              </div>
              <div className=' tw-grid tw-gap-3'>
                  <div className=' tw-grid'>
                      <label htmlFor="">Slug</label>
                      <input type="text" name="" id="" {...register("slug")} className='tw-border-2 tw-border-[#E6E7E8] tw-rounded-lg'/>
                  </div>
                  <div className=' tw-grid'>
                    <label htmlFor="">SKU</label>
                    <input type="text" {...register("sku")} className='tw-border-2 tw-border-[#E6E7E8] tw-rounded-lg'/>
                  </div>
                  <div className=' tw-grid'>
                    <label htmlFor="">Images</label>
                    <input type='file' name="" id="" className='tw-border-2 tw-border-[#E6E7E8] tw-rounded-lg'/>
                  </div>
                  <div className=' tw-grid'>
                    <label htmlFor="">Colors</label>
                    <Controller
                        name="colorPicker"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                          <ColorPicker
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            className={`tw-max-w-64  tw-rounded-lg`}
                          />
                        )}
                      />
                      
                  </div>
                  <div className=' tw-grid'>
                    <label htmlFor="">Color name</label>
                    <input type="text" {...register("color_name")} className='tw-border-2 tw-border-[#E6E7E8] tw-rounded-lg'/>
                  </div>
                  <button type='button' onClick={addColor}>Add Color</button>
                  <div>
                    <ul>
                      {getValues('colors').map((val, index) => (
                        <li key={`color_${val.color}`} style={{ display: 'flex', alignItems: 'center' }}>
                          <div
                            style={{
                              backgroundColor: `#${val.color}`,
                              width: '20px',
                              height: '20px',
                              marginRight: '10px',
                              border: '1px solid #000',
                            }}
                          />
                          #{val.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className=' tw-grid'>
                    <label htmlFor="">Sizes</label>
                    <Controller
                        name="sizes"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                          <Chips
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            className={`tw-max-w-64  tw-rounded-lg`}
                          />
                        )}
                      />
                  </div>
              </div> 
            </div>
            <div className=' tw-mt-10'>
              <Editor className=' tw-h-40 tw-max-w-[675px]' headerTemplate={renderEditorHeader}/>
            </div>
            <Button type='submit' label="Add Product" className=' tw-mt-20 tw-h-10  tw-w-32 shopper-bgcolor tw-text-white tw-rounded-md  tw-text-sm tw-font-medium' />
          </form>
        </div>
      </div>
    </div>
  )
}
