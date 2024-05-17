import React from 'react';
import { Button } from 'primereact/button';

function ErrorFallback({error, resetErrorBoundary}) {

    return(
        <div className=' tw-grid tw-place-items-center tw-w-full tw-h-full'>
            <dotlottie-player src="https://lottie.host/0d37224c-82e7-4484-b826-33defae8f622/3MC0iW81Bc.json" background="transparent" speed="1" style={{width: "300px", height: "300px"}} loop autoplay></dotlottie-player>

            <p className='error-msg'>
                Something went wrong. Try clicking the refresh page button to reload the
                application.{' '}
            </p>
            <Button label='Refresh page' className='tw-w-64 tw-h-10 shopper-bgcolor' onClick={resetErrorBoundary}/>
        </div>
    )
    
    
}

export default ErrorFallback;