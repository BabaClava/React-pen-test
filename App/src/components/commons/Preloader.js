import React from 'react';
import loader from '../../assets/img/loader.svg'

const Preloader = () => {
    return ( 
        <div>
            <img src={loader} alt='preloader' />
        </div>
     );
}
 
export default Preloader;