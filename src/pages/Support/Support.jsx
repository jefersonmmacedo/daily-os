import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import {FiHeadphones} from 'react-icons/fi'
 
import './support.css'

function Support(props) {
    return (
        <div className="support">
        <Header />
        <div className="content">
        <Title name="Suporte">
            <FiHeadphones />
        </Title>
        </div>
        <div className="container">
            teste
        </div>
        
        </div>
    )
}

export default Support;