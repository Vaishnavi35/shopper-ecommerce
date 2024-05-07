import React from 'react';
import {left_menu_list} from '../../util';

export const LeftMenu = () => {
  return (
    <nav className='h-full text-black w-64'>
      <ol className=' flex flex-col gap-y-5'>
        {
          left_menu_list.map((v,i) => {
            return(
              <li key={`left_menu_${v.name}`} className='flex gap-x-3'>
                <img src={v.image} alt={`left_menu_image_${v.name}`} />
                {v.name}
              </li>
            )
          })
        }
      </ol>
    </nav>
  )
}
