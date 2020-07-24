import React, { useEffect, useState } from 'react';

const Loader: React.FC = () => {
    
    const [loadState, setLoadState] = useState<any>({
                                                        loading: 'Loading',
                                                        count: 0,
                                                        ascend: true
                                                    });

    useEffect(() => {
        
        setTimeout(() => {
            if(loadState.count < 5 && loadState.ascend === true){
                let newLoad = '=' + loadState.loading + '=';
                setLoadState({
                    ...loadState,
                    count: loadState.count + 1,
                    loading: newLoad
                });
            } else if (loadState.count < 5) {
                let newLoad = loadState.loading.substr(1, loadState.loading.length - 2);
                setLoadState({
                    ...loadState,
                    count: loadState.count + 1,
                    loading: newLoad
                });
            } else {
                setLoadState({
                    ...loadState,
                    count: 0,
                    ascend: !loadState.ascend
                });
            }
        }, 100);
    }, [loadState]);

    
    return(
        <p>{loadState.loading}</p>
    )
};

export default Loader;