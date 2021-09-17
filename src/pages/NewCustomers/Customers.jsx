import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import {FiUsers} from 'react-icons/fi'
 
import './customers.css'

function Customers(props) {
    return (
        <div className="customers">
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

export default Customers;