import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import {FiUser} from 'react-icons/fi'
 
import './users.css'

function Users(props) {
    return (
        <div className="users">
            <Header />
                <div className="content">
                    <Title name="Usuários">
                        <FiUser />
                    </Title>
                </div>
                <div className="container">
                    Teste
                </div>
        
        </div>
    )
}

export default Users;