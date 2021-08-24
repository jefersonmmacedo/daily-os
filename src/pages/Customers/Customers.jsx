import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import {FiUsers} from 'react-icons/fi'
import {Link} from 'react-router-dom'
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
            <div className="customer-itens">
        <Link to="/newcustomers">Novo CLiente</Link>
            </div>
        </div>
        
        </div>
    )
}

export default Customers;