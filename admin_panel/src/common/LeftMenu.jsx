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
      <div className='h-full text-black w-64 py-5  text-center shadow-md sidebar fixed left-0 z-10 bg-white'>
        <div className='px-5'>
          shopper
        </div>
        <ol className='flex flex-col gap-y-5 justify-center my-12 px-5'>
          {
            left_menu_list.map((v,i) => {
              return( 
                <li key={`left_menu_${v.name}`} className='flex gap-x-3 h-10 w-full grey_color items-center px-6 rounded-md' onClick={() => leftMenuFn(v.name)}>
                  <img src={v.image} alt={`left_menu_image_${v.name}`}/>
                  {v.name}
                </li>
              )
            })
          }
        </ol>
        <div className='border-[#E9E9EB] border'></div>
        <div className='px-5'>
          <li className='flex gap-x-3 h-10 w-full grey_color items-center px-6 rounded-md mt-12' onClick={() => leftMenuFn("Extras")}>
            <img src={Add} alt="extra_add_icon"/>
            Extras
          </li>
        </div>
        
      </div>
      <nav className='flex justify-between px-10 fixed top-0 left-64 h-[72px] items-center shadow-md z-10 bg-white'>
        <div className='flex gap-x-1'>
          <span className='grey_color'>Admin</span> 
          <img src={Right} alt="Right" />
          {leftMenu}
        </div>
        <img src={Logout} alt="Logout" className='cursor-pointer'/>
      </nav>
    </div>
  )
}
