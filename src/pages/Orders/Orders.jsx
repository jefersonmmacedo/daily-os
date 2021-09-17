import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import firebase from '../../services/firebaseConnection';
import {toast} from 'react-toastify';
import {FiClipboard, FiSearch, FiEdit2} from 'react-icons/fi';
import {Link} from 'react-router-dom'
  
import './orders.css'
import { useEffect, useState } from 'react';

const orderRef = firebase.firestore().collection('orders').orderBy('date', 'asc');

function Orders(props) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadMore, setLoadMore] = useState(true);
    const [lastDoc, setLastDoc]  = useState();


    useEffect(() => {
        loadOrders()
        return () => {

        }
    }, []);


    async function loadOrders() {
        await orderRef.limit(4).get()
            .then((snapshot) => {
                let list = [];

                snapshot.forEach(order => {

                    const dateFormated = order.data().date.toDate();
                    const newDateFormated = ((dateFormated.getDate() )) + "/" + ((dateFormated.getMonth() + 1)) + "/" + dateFormated.getFullYear();
                    list.push({
                        data: newDateFormated,
                        id: order.id,
                        customer: order.data().customer,
                        subject: order.data().subject,
                        status: order.data().status
                    })
 });
                setOrders(order => [...order, ...list]);
                const lastDocs = snapshot.docs[snapshot.docs.length -1];
                setLastDoc(lastDocs)

            }).catch(error => {
                console.log(error)
                toast.error('Ops. Deu algo errado');
                setLoadMore(false);
            })

            setLoading(false)
    }

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
                        {orders.map((order) => {
                            return (
                                <tr key={order.id}>
                                <td data-label="Código">{order.id}</td>
                                <td data-label="Cliente">{order.customer}</td>
                                <td data-label="Assunto">{order.subject}</td>
                                <td data-label="Status">
                                    <span className="badge" style={{backgroundColor: '#5cb85c'}}>{order.status}</span>
                                </td>
                                <td data-label="Data">{order.data}</td>
                                <td data-label="Ações">
                                    <button className="action" style={{backgroundColor:"#004879" }}><FiSearch color='#fff' size={17}/></button>
                                    <button className="action" style={{backgroundColor:"#f6a935"}}><FiEdit2 color='#fff' size={17}/></button>
                                </td>
                            </tr>
                            )
                        })}
                       
                    </tbody>
                </table>
<br /><br />
                <button className="btn-order">Próxima ></button>
            </div>
             }

        </div>
        
        </div>
    )
}

export default Orders;