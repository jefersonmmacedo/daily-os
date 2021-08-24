import { useState,useContext } from 'react';
import {Link} from 'react-router-dom'
import logoImg from '../../assets/images/daily-os-2.svg';
import {AuthContext} from '../../contexts/auth';
import {toast} from 'react-toastify';
import './signin.css'

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signIn, loadingAuth} = useContext(AuthContext)

    function handleSubmit(e) {
        e.preventDefault();

        if(email !== '' && password !== '') {
            signIn(email, password)
        } else {
            toast.error(`Preencha todos os campos corretamente`);
        }
    }


    return (
        <div className="container-center">
            <div className="login">
                <div className="logo-login">
                    <img src={logoImg} alt="Logo" />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="text" placeholder="seuemail@email.com"
                        value={email}
                            onChange={(e) => setEmail(e.target.value)}/>

                    <input type="password" placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>

                    <button type="submit">{loadingAuth ? "Carregando..." : "Entrar"}</button>
                </form>

                <Link to="/register">Criar nova conta</Link>
            </div>

        </div>
    )
} 

export default SignIn;