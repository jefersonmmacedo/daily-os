import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import {FiPackage} from 'react-icons/fi'
 
import './products.css'

function Products(props) {
    return (
        <div className="products">
        <Header />
        <div className="content">
        <Title name="Produtos">
            <FiPackage />
        </Title>
        </div>
        <div className="container">
            teste 2
        </div>
        
        </div>
    )
}

export default Products;