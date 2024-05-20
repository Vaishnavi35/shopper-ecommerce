import React, {useState, useEffect, useRef} from 'react';

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
import { Tag } from 'primereact/tag';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { FileUpload } from 'primereact/fileupload';
import { IoCloseOutline } from "react-icons/io5";
import { ImImages } from "react-icons/im";
import { DataView } from 'primereact/dataview';
import { InputNumber } from 'primereact/inputnumber';
import { Carousel } from 'primereact/carousel';

export default function ProductDetails() {

  const {register, handleSubmit, control, setValue, watch, formState: { errors }, getValues} = useForm({
    defaultValues: {
      colors: []
    }
  });
  const stepperRef = useRef(null);
  const fileUploadRef = useRef(null);
  const selectedCategory = watch('category');
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const colors = watch('colors', []); // Watch the colors array
  const [uploadedImage, setUploadedImage] = useState(null);
  const [products, setProducts] = useState([]);
  const stock_status_list = [
    { name: 'In Stock', code: 'I' },
    { name: 'Out of Stock', code: 'O' },
  ];

  const productSubmit = (data) => {
    console.log("data : ", data);
    setProducts([...products, data]);
    const files = fileUploadRef.current.getFiles(); // Retrieve selected files
      console.log(files);
  }

  const addColor = () => {
    let colorExist = false;
    let selected_color = getValues('colorPicker');
    let colors = getValues('colors');
    let color_name = getValues("color_name");
    colorExist = colors && colors.some((color) => color.color === selected_color);
    if(selected_color && color_name && !colorExist){
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

  const itemTemplate = (file, props) => {
    return (
      <div className="p-d-flex p-ai-center p-jc-between" style={{ width: '100%' }}>
        <img alt={file.name} role="presentation" src={file.objectURL} style={{ width: '100px' }} />
        <Button icon="pi pi-times" className="p-button-danger" onClick={() => props.onRemove(file, props)} />
      </div>
    );
  };


  const onUpload = (event) => {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const onRemove = () => {
    setUploadedImage(null);
    if (fileUploadRef.current) {
      fileUploadRef.current.clear();
    }
  };

  const handleClick = () => {
    console.log("fileUploadRef : ",fileUploadRef);
    if (fileUploadRef.current) {
      fileUploadRef.current.click()();
    }
  };

  const onTemplateRemove = ( callback) => {
    callback();
  };

  const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
  const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

  

  const imageList = (file, props) => {
    return (
            <div className=" tw-bg-[#ECECEC] tw-rounded-md tw-relative ">
                <img alt={file.name} role="presentation" src={file.objectURL} />
                <div className=' tw-absolute -tw-top-2 -tw-right-2 tw-bg-[#ECECEC] tw-rounded-full tw-w-6 tw-h-6 tw-text-center'>
                  <Button type="button" icon="pi pi-times" className=" grey_color tw-bg-transparent p-button-rounded p-button-danger ml-auto tw-w-4 tw-h-4 tw-border-0" onClick={() => onTemplateRemove(props.onRemove)} />
                </div>
            </div>
    );
};

const emptyTemplate = () => {
  return (
      <div className="tw-flex tw-items-center tw-gap-x-2">
          <i className="pi pi-image mt-3 tw-rounded-full tw-text-xl " style={{ backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
          <span style={{ color: 'var(--text-color-secondary)' }} className="my-5">
              Drag and Drop Image Here
          </span>
      </div>
  );
};

  const getSeverity = (product) => {
    switch (product.stock_status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
  };

  const productImageTemplate = (image) => {
    return(
      <div>
          <img src={image.objectURL} alt={`product_image_${image.name}`} />
      </div>
    )
  }

  const listProducts = (items) => {
      if (!items || items.length === 0) return null;

      let list = items.map((product, index) => {
          return listProductsUI(product, index);
      });

      return <div className="grid grid-nogutter">{list}</div>;
  };

  const listProductsUI = (product, index) => {
      return (
        <div className=' tw-flex' key={`product_${product.title}_${index}`}>
            <Carousel value={product.image} numVisible={3} numScroll={3} itemTemplate={productImageTemplate} />
            <div>
              Quantity : {product.quantity}<br />
              Size : {product?.sizes?.map((v,i) => {
                return(
                  <>
                    <span key={`product_size_${v}`}>{v}</span>
                  </>
                )
              })}
            </div>
            <div>
                  {
                    product?.colors?.map((val, index) => {
                      return(
                        <>
                          <div key={`product_color_list_${val}`} className=' tw-w-5 tw-h-5 tw-mr-3 tw-rounded-full'
                              style={{
                                backgroundColor: `#${val.color}`,
                              }}
                            />
                            #{val.name}
                        </>
                      )
                    })
                  }
                  <div>${product.price}</div>
            </div>
        </div>
      );
  }

  return (
    <div className='product_details  tw-p-10'>
      <div className=' tw-bg-white tw-h-full tw-border-2 border-[#E9E9EB] tw-rounded-md'>
        <div className=' tw-h-20 tw-border-2 tw-border-b-[#ECECEC] tw-grid tw-items-center tw-pl-10'>
          Add Product
        </div>
        <div className=' tw-max-h-[80%] tw-overflow-y-auto tw-scroll-smooth tw-flex tw-justify-center'>
          <form className='tw-p-10 tw-w-1/2' onSubmit={handleSubmit(productSubmit)}>
              <Stepper ref={stepperRef} linear = "true">
                    <StepperPanel>
                      <div className=' tw-grid tw-gap-4'>
                          <div className=' tw-grid'>
                            <label htmlFor="">Title</label>
                            <input type="text" name="" id="" {...register("title")} className='tw-border-2 tw-border-[#E6E7E8] tw-rounded-lg'/>
                          </div>
                          <div className=' tw-grid'>
                            <label htmlFor="">Category</label>
                            <Controller name='category' control={control} render={({field}) => (
                                  <Dropdown {...field}  options={categories} optionLabel="value" placeholder="Select category" className="  tw-border-2 tw-h-11 tw-border-[#E6E7E8] tw-rounded-lg" />
                              )} 
                            />
                          </div>
                          <div className=' tw-grid'>
                            <label htmlFor="">Sub Category</label>
                            <Controller name='sub_category' control={control} render={({field}) => (
                                  <Dropdown {...field}  options={subCategoryOptions} optionLabel="value" placeholder="Select sub-category" className="  tw-border-2 tw-h-11 tw-border-[#E6E7E8] tw-rounded-lg" />
                              )} 
                            />
                          </div>
                          <div className=' tw-grid'>
                              <label htmlFor="">Stock status</label>
                              <Controller name='stock_status' control={control} render={({field}) => (
                                  <Dropdown {...field}  options={stock_status_list} optionLabel="name" placeholder="Select stock status" className="  tw-border-2 tw-h-11 tw-border-[#E6E7E8] tw-rounded-lg" />
                                )} 
                              />
                          </div>
                          <div className=' tw-grid'>
                            <label htmlFor="">SKU</label>
                            <input type="text" {...register("sku")} className='tw-border-2 tw-border-[#E6E7E8] tw-rounded-lg'/>
                          </div>
                          <div className=''>
                          <label htmlFor="">Description</label>
                            <Editor className=' tw-h-40 tw-max-w-[675px]' headerTemplate={renderEditorHeader}/>
                          </div>
                          <Button type='button' label="Next" className=' tw-mt-20 tw-h-10  tw-w-32' onClick={() => stepperRef.current.nextCallback()}/>

                          {/* <Button type='button' label="Next" className=' tw-mt-20 tw-h-10  tw-w-32 shopper-bgcolor tw-text-white tw-rounded-md  tw-text-sm tw-font-medium' onClick={() => stepperRef.current.nextCallback()}/> */}
                        </div>
                    </StepperPanel>
                    <StepperPanel>
                      <div  className=' tw-grid tw-gap-4'>
                        <div className=' tw-grid'>
                          <label htmlFor="">Images</label>
                          <Controller name='image[]' control={control} defaultValue={[]} render={({field}) => (
                            <FileUpload ref={fileUploadRef} name={field.name} multiple  url="/api/upload" accept="image/*" maxFileSize={1000000} itemTemplate={imageList} emptyTemplate={emptyTemplate} chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} onSelect={(e) => field.onChange(e.files)}
                            onRemove={(e) => {
                              const updatedFiles = field.value.filter(file => !e.files.includes(file));
                              field.onChange(updatedFiles);
                            }}
                            onClear={() => field.onChange([])}/>
                          )} />
                        </div>
                        <div className=' tw-grid'>
                            <label htmlFor="">Colors</label>
                            <Controller
                                name="colorPicker"
                                control={control}
                                defaultValue={"ff0000"}
                                render={({ field }) => (
                                  <ColorPicker
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.value)}
                                    className={`  tw-rounded-lg`}
                                  />
                                )}
                              />
                        </div>
                        <div className=' tw-grid'>
                            <label htmlFor="">Color name</label>
                            <input type="text" {...register("color_name")} className='tw-border-2 tw-border-[#E6E7E8] tw-rounded-lg'/>
                        </div>
                        <Button type='button' label="Add Color" onClick={addColor} className='tw-h-10  tw-w-32 shopper-bgcolor tw-text-white tw-rounded-md  tw-text-sm tw-font-medium' />
                        {colors.length > 0 && <div>
                            <ul className=' tw-grid tw-gap-2'>
                                {getValues('colors').map((val, index) => (
                                    <li key={`color_${val.color}`} style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className=' tw-w-5 tw-h-5 tw-mr-3 tw-rounded-full'
                                          style={{
                                            backgroundColor: `#${val.color}`,
                                          }}
                                        />
                                        #{val.name}
                                    </li>
                                ))}
                            </ul>
                        </div>}
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
                                    className={`  tw-rounded-lg`}
                                  />
                                )}
                              />
                        </div>
                        <div className=' tw-grid'>
                          <label htmlFor="">Price</label>
                          <Controller control={control} name='price' defaultValue={0.00} render={({field}) => (
                              <InputNumber value={field.value} onValueChange={(e) => field.onChange(e.value)} mode="currency" currency="USD" locale="en-US" />
                          )}/>
                        </div>
                        <div className=' tw-grid'>
                          <label htmlFor="">Quantity</label>
                          <Controller control={control} name='quantity' defaultValue={0.00} render={({field}) => (
                              <InputNumber value={field.value} onValueChange={(e) => field.onChange(e.value)} />
                          )}/>
                        </div>
                        <div className=' tw-flex tw-justify-between'>
                            <Button type='button' label="Back" className=' tw-mt-20 tw-h-10  tw-w-32 shopper-bgcolor tw-text-white tw-rounded-md  tw-text-sm tw-font-medium' onClick={() => stepperRef.current.prevCallback()}/>
                            <Button type='submit' label="Add Product" className=' tw-mt-20 tw-h-10  tw-w-32 shopper-bgcolor tw-text-white tw-rounded-md  tw-text-sm tw-font-medium' />
                        </div>
                      </div>
                    </StepperPanel>
              </Stepper>
          </form>
          { products && 
              <div className=' w-full '>
                <DataView value={products} listTemplate={listProducts} />
              </div>
          }
        </div>
      </div>
    </div>
  )
}
