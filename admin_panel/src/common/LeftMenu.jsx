import React, { useState, useRef } from 'react';
import {left_menu_list, extras_menus} from '../../util';
import Add from '../../assets/Add.png';
import Right from '../../assets/Chevron Right.png';
import Logout from '../../assets/Logout.png';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectLeftMenu } from '../slices/leftMenuSlice';
import { Menu } from 'primereact/menu'; 

export const LeftMenu = () => {
  // const [leftMenu, setLeftMenu] = useState("Dashboard");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const leftMenu = useSelector((state) => state.leftMenu.leftMenu);
  const extrasMenuRef = useRef(null);
  const [showExtrasMenus, setShowExtrasMenus] = useState(false);

  const leftMenuFn = (param,event = '') =>  {
    // setLeftMenu(param);
    let path = param.toLowerCase();
    dispatch(selectLeftMenu(path));
    if(path != 'extras'){
      if(path == "dashboard"){
        path = `/`;
      }else if (path == "settings") {
        path = "/settings";
      }else{
        path = `/dataTable/${path}`;
      }
      navigate(path);
    }else{
      setShowExtrasMenus(true);
      extrasMenuRef.current.toggle(event)
    }
  }

  const extrasMenuClicked = (action) => {
    console.log("action : ",action);
  }

  return (
    <div>
      <div className='tw-h-full  tw-w-64 tw-py-5  tw-text-center tw-shadow-md sidebar tw-fixed tw-left-0 tw-z-10 tw-bg-white tw-top-0'>
        <div className='tw-px-5'>
          <div className="tw-font-bold tw-text-[34px] tw-leading-5">SH<span className="shopper-color tw-text-[50px] tw-leading-5">o</span>PPER</div>
          <div className="tw-text-center tw-font-semibold tw-text-xs tw-mt-2">Smart Marketplace</div>
        </div>
        <ol className='tw-flex tw-flex-col tw-gap-y-5 tw-justify-center tw-my-12 tw-px-5'>
          {
            left_menu_list.map((v,i) => {
              return( 
                <li key={`left_menu_${v.name}`}  className={` ${leftMenu === v.name? 'shopper-color' : ''} tw-flex tw-gap-x-3 tw-h-10 tw-w-full grey_color tw-items-center tw-px-6 tw-rounded-md tw-capitalize`} onClick={() => leftMenuFn(v.name)}>
                  <img src={v.image} alt={`left_menu_image_${v.name}`}/>
                  {v.name}
                </li>
              )
            })
          }
        </ol>
        <div className='tw-border-[#E9E9EB] tw-border'></div>
        <div className='tw-px-5'>
          <li className='tw-flex tw-gap-x-3 tw-h-10 tw-w-full grey_color tw-items-center tw-px-6 tw-rounded-md tw-mt-12' aria-controls="extras_menu" aria-haspopup onClick={() => leftMenuFn("Extras",event)}>
            <img src={Add} alt="extra_add_icon"/>
            Extras
          </li>
        </div>
      </div>
      <nav className='tw-flex tw-justify-between tw-px-10 tw-fixed tw-top-0 tw-left-64 tw-h-[72px] tw-items-center tw-shadow-md tw-z-10 tw-bg-white'>
        <div className='tw-flex tw-gap-x-1 tw-text-black tw-capitalize'>
          <span className='grey_color'>Admin</span> 
          <img src={Right} alt="Right" />
          {leftMenu}
        </div>
        <img src={Logout} alt="Logout" className='tw-cursor-pointer'/>
      </nav>
      {/* <Menu model={extras_menus} id="extras_menu" popupAlignment="right" ref={extrasMenuRef} popup className=' tw-w-32' /> */}
    </div>
  )
}
