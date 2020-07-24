import React, { useEffect, useState } from 'react';

type LoadTypes = {
    loading: string;
    count: number;
    ascend: boolean
}

const Loader: React.FC = () => {
    
    const [loadState, setLoadState] = useState<LoadTypes>({
                                                        loading: 'Loading',
                                                        count: 0,
                                                        ascend: true
                                                    });

    useEffect(() => {
        let mounted = true;
        setTimeout(() => {
            if(loadState.count < 5 && loadState.ascend === true){
                let newLoad = '=' + loadState.loading + '=';
                if(mounted === true){
                    setLoadState({
                        ...loadState,
                        count: loadState.count + 1,
                        loading: newLoad
                    });
                }
            } else if (loadState.count < 5) {
                let newLoad = loadState.loading.substr(1, loadState.loading.length - 2);
                if(mounted === true){
                    setLoadState({
                        ...loadState,
                        count: loadState.count + 1,
                        loading: newLoad
                    });
                }
            } else {
                if(mounted === true){
                    setLoadState({
                        ...loadState,
                        count: 0,
                        ascend: !loadState.ascend
                    });
                }
            }
        }, 100);
        return function(){mounted = false};
    }, [loadState]);

    
    return(
        <p>{loadState.loading}</p>
    )
};

export default Loader;