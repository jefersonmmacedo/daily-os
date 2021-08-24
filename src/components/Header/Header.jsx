
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import avatarImg from '../../assets/images/avatar.svg';
import {FiClipboard, FiUser,FiUsers, FiSettings, FiPackage, FiShoppingBag, FiHeadphones, FiActivity} from 'react-icons/fi'
import {Link} from 'react-router-dom'
import './header.css'

function Header(props) {
    const {signOut, user} = useContext(AuthContext)
    return (
        <div className="sidebar">            
           <div className="img">
            <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="Foto usuário" />
           </div>
           <div className="bar-left">
               <h3>Seja bem-vindo: <br /> {user.name}</h3>
           <div className="links">
           <Link to="/dashboard"> <FiActivity color="#fff" size={24}/> Dashboard</Link>
           <Link to="/orders"> <FiClipboard color="#fff" size={24}/> Chamados</Link>
            <Link to="/customers"> <FiUsers color="#fff" size={24}/> Clientes</Link>
            <Link to="/users"> <FiUser color="#fff" size={24}/> Usuários</Link>
            <Link to="/distributors"><FiShoppingBag color="#fff" size={24}/> Fornecedores</Link>
            <Link to="/products"><FiPackage color="#fff" size={24}/> Produtos</Link>
            <Link to="/profile"><FiSettings color="#fff" size={24}/> Configurações</Link>
            <Link to="/support"><FiHeadphones color="#fff" size={24}/> Suporte</Link>
           </div>
           

           <button type="button" onClick={signOut}>Sair</button>

           </div>
          
        </div>
    )
}

export default Header