import { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import logoImg from '../../assets/images/daily-os-2.svg';
import {AuthContext} from '../../contexts/auth';
import {toast} from 'react-toastify';


 
function SignUp() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext)


    function handleSubmit(e) {
        e.preventDefault();
        
        if(name !== '' && email !== '' && password !== '') {
            signUp(email, password, name)
        }else {
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
                <h1>Cadastro</h1>

                <input type="Text" placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>

                <input type="text" placeholder="seuemail@email.com"
                    value={email}
                        onChange={(e) => setEmail(e.target.value)}/>

                <input type="password" placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>


                <button type="submit">{loadingAuth ? "Carregando..." : "Criar conta"}</button>
            </form>

            <Link to="/">Fazer login</Link>
        </div>

    </div>
    )
} 

export default SignUp;