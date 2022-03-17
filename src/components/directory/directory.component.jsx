import React from 'react'

import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss'

const Directory = ({categories}) => {

        return ( 
            <div className='directory-menu'>
                {
                    categories.map(categories => (
                        <MenuItem key={categories.id} 
                                  title={categories.title} 
                                  imageUrl={categories.imageUrl} 
                                  size={categories.size} /> ))
                }
            </div>
        );
};

export default Directory;