import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import {FiUsers} from 'react-icons/fi'
 
import './clients.css'

function Clients(props) {
    return (
        <div className="clients">
        <Header />
        <div className="content">
        <Title name="Clientes">
            <FiUsers />
        </Title>
        </div>
        <div className="container">
            teste
        </div>
        
        </div>
    )
}

export default Clients;