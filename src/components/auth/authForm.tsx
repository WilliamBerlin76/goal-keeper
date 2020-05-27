import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from "react-router-dom";

import { authenticate } from '../../actions/index';


const mapState = (state: { user: any; }) => {
    return{
        user: state.user
    };
};

const mapDispatch = {
    authenticate
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
    type: string,
};

const AuthForm: React.FC<Props> = ({authenticate, type}) => {
    const [user, setUser] = useState<object>({});
    const [remember, setRemember] = useState<boolean>(false)
    const history = useHistory();

    const handleChange = (e: { target: { name: any; value: string; }; }) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        await authenticate(user, type, remember);
        history.push('/dashboard')
    };

    return (
        <>
            <h2>{type}</h2>
            <form>
                <input
                    placeholder='Username'
                    type='text'
                    name='username'
                    onChange={handleChange}
                />
                {type === 'register' &&
                    <input
                        placeholder='Email'
                        type='text'
                        name='email'
                        onChange={handleChange}
                    />
                }
                <input
                    placeholder="Password"
                    type='password'
                    name='password'
                    onChange={handleChange}
                />
                Remember me?
                <input 
                    type="checkbox"
                    onChange={() => setRemember(!remember)}
                />
            </form>
            <button onClick={handleSubmit}>{type}</button>
        </>
    );
};


export default connector(AuthForm)