import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import {FiClipboard, FiSearch, FiEdit2} from 'react-icons/fi';
import {Link} from 'react-router-dom'
  
import './orders.css'
import { useState } from 'react';

function Orders(props) {
    const [orders, setOrders] = useState(['1'])
    return (
        <div className="orders">
        <Header />
        <div className="content">
        <Title name="Ordens de Serviço">
            <FiClipboard />
        </Title>
        </div>
        <div className="container">
                {orders.length === 0 ?
            <div className="order-itens">
            <h3>Nenhuma Ordem de Serviço cadastrada</h3>
            <Link to="/neworder">+ Cadastrar nova ordem de Serviço +</Link>
            </div>
            :
            <div className="order-itens">
                  <Link to="/neworder">+ Cadastrar nova ordem de Serviço +</Link>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Assunto</th>
                            <th scope="col">Status</th>
                            <th scope="col">Data</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Código">ANYFhKFFdLMJnMGt2H147JCX5lS2</td>
                            <td data-label="Cliente">Coding.It Tecnologias</td>
                            <td data-label="Assunto">Suporte</td>
                            <td data-label="Status">
                                <span className="badge" style={{backgroundColor: '#5cb85c'}}>Em Andamento</span>
                            </td>
                            <td data-label="Data">12/12/2021</td>
                            <td data-label="Ações">
                                <button className="action" style={{backgroundColor:"#004879" }}><FiSearch color='#fff' size={17}/></button>
                                <button className="action" style={{backgroundColor:"#f6a935"}}><FiEdit2 color='#fff' size={17}/></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
             }

        </div>
        
        </div>
    )
}

export default Orders;