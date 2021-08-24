import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import {FiShoppingBag} from 'react-icons/fi'
 
import './distributors.css'

function Distributors(props) {
    return (
        <div className="distributors">
        <Header />
        <div className="content">
        <Title name="Fornecedores">
            <FiShoppingBag />
        </Title>
        </div>
        <div className="container">
            teste
            <button type="submit" >Cadastrar Cliente</button>
        </div>
        
        </div>
    )
}

export default Distributors;