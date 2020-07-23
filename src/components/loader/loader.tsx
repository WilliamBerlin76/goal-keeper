import React, { useEffect, useState } from 'react';

const Loader: React.FC = () => {
    const [loading, setLoading] = useState<string>('Loading');
    const [loadCount, setLoadCount] = useState<number>(0);
    const [ascend, setAscend] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            if(loadCount < 5 && ascend === true){
                setLoadCount(loadCount + 1);
                let newLoad = '=' + loading + '=';
                setLoading(newLoad);
            } else if (loadCount < 5) {
                setLoadCount(loadCount + 1);
                let newLoad = loading.substr(1, loading.length - 2);
                setLoading(newLoad);
            } else {
                setLoadCount(0);
                setAscend(!ascend);
            }
        }, 100);
    });

    return(
        <p>{loading}</p>
    )
};

export default Loader