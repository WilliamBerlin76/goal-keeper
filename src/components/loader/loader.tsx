import React, { useEffect, useState } from 'react';

const Loader: React.FC = () => {
    const [loading, setLoading] = useState<string>('Loading');
    const [loadCount, setLoadCount] = useState<number>(0);
    const [ascend, setAscend] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            if(loadCount < 5 && ascend === true){
                setLoadCount(loadCount + 1);
                setLoading('=' + loading + '=');
            } else if (loadCount < 5) {
                setLoadCount(loadCount + 1);
                setLoading(loading.substr(1, loading.length - 2));
            } else {
                setLoadCount(0);
                setAscend(!ascend);
            }
        }, 250);
    });

    return(
        <p>{loading}</p>
    )
};

export default Loader