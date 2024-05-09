import React, { useState } from 'react';
import {left_menu_list} from '../../util';
import Add from '../../assets/Add.png';
import Right from '../../assets/Chevron Right.png';
import Logout from '../../assets/Logout.png';

export const LeftMenu = () => {
  const [leftMenu, setLeftMenu] = useState("Dashboard");

  function leftMenuFn(param) {
    setLeftMenu(param);
  }

  return (
    <div>
      <div className='tw-h-full  tw-w-64 tw-py-5  tw-text-center tw-shadow-md sidebar tw-fixed tw-left-0 tw-z-10 tw-bg-white'>
        <div className='tw-px-5'>
          shopper
        </div>
        <ol className='tw-flex tw-flex-col tw-gap-y-5 tw-justify-center tw-my-12 tw-px-5'>
          {
            left_menu_list.map((v,i) => {
              return( 
                <li key={`left_menu_${v.name}`} className='tw-flex tw-gap-x-3 tw-h-10 tw-w-full grey_color tw-items-center tw-px-6 tw-rounded-md' onClick={() => leftMenuFn(v.name)}>
                  <img src={v.image} alt={`left_menu_image_${v.name}`}/>
                  {v.name}
                </li>
              )
            })
          }
        </ol>
        <div className='tw-border-[#E9E9EB] tw-border'></div>
        <div className='tw-px-5'>
          <li className='tw-flex tw-gap-x-3 tw-h-10 tw-w-full grey_color tw-items-center tw-px-6 tw-rounded-md tw-mt-12' onClick={() => leftMenuFn("Extras")}>
            <img src={Add} alt="extra_add_icon"/>
            Extras
          </li>
        </div>
      </div>
      <nav className='tw-flex tw-justify-between tw-px-10 tw-fixed tw-top-0 tw-left-64 tw-h-[72px] tw-items-center tw-shadow-md tw-z-10 tw-bg-white'>
        <div className='tw-flex tw-gap-x-1 tw-text-black'>
          <span className='grey_color'>Admin</span> 
          <img src={Right} alt="Right" />
          {leftMenu}
        </div>
        <img src={Logout} alt="Logout" className='tw-cursor-pointer'/>
      </nav>
    </div>
  )
}
