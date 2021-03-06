import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import {FiUserPlus} from 'react-icons/fi'
import { useContext, useEffect, useState } from 'react';
import firebase from '../../services/firebaseConnection';
import {toast} from 'react-toastify';
import './newOrder.css'
import { AuthContext } from '../../contexts/auth';

function NewOrder(props) {
    const [customers, setCustomers] = useState([]);
    const [load, setLoad] = useState(true);
    const [idCustomer, SetIdCustomer] = useState(0);
    const [subject, setSubject] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [description, setDescription] = useState('');

    const {user} = useContext(AuthContext);


    //Buscando todos os clientes ( Importante!!)
    useEffect(() => {
        async function loadCustomers() {
            await firebase.firestore().collection('customers')
            .get()
              .then((snapshot) => {
                let data = [];

                snapshot.forEach((doc) => {
                    data.push({
                        id: doc.id,
                        fantasyName: doc.data().fantasyName
                    })
                })

                if(data.length === 0 ) {
                    console.log('Nenhuma empresa cadastrada');
                    setLoad(false);
                    setCustomers([{id:'1', fantasyName: 'Nenhum cliente encontrado'}]);
                    return
                } else {
                    setCustomers(data);
                    setLoad(false);
                    console.log(data)
                }
            }).catch(error => {
                console.log(error)
                toast.error('Ops. Deu algo errado');
                setLoad(false);
                setCustomers([{id:'1', fantasyName: 'Nenhum cliente encontrado'}])
            })
        }

        loadCustomers()
    }, [])


    async function handleAddOrder(e) {
        e.preventDefault()
        
       if(description !== '') {
        await firebase.firestore().collection('orders')
        .add({
            date: new Date(),
            customer: customers[idCustomer].fantasyName,
            customerId: customers[idCustomer].id,
            subject:subject,
            status:status,
            description:description,
            userId: user.uid,
            userName: user.name       
        }).then(() => {
            SetIdCustomer(0);
            setDescription('');


            toast.success('Ordem deServi??o cadastrada com sucesso!')
        }).catch(error => {
            console.log(error)
            toast.error('Ops. Deu algo errado')
        })
        
       } else {
        toast.error('Preencha todos os campos corretamente')
       }
    }

    function handleChangeSelect(e) {
        setSubject(e.target.value);
        console.log(e.target.value)
    }

    function handleChangeRadio(e) {
        setStatus(e.target.value);
        console.log(e.target.value)
    }

    function handleChangeCustomers(e) {
        SetIdCustomer(e.target.value)
        console.log(e.target.value)
        SetIdCustomer(e.target.value)
    }


    return (
        <div className="customers">
        <Header />
        <div className="content">
        <Title name="Nova Ordem de Servi??o">
            <FiUserPlus />
        </Title>
        </div>
        <div className="container">
        <form className="form" onSubmit={handleAddOrder}>
                        <h3>Adicione a nova ordem de servi??o:</h3>
                        <div>
                            <div>
                            <label>Cliente: </label>
                            {load ? (
                                <input type="text"disabled={true}  value={"Carregando clientes..."}/>
                            )
                            :
                           <select value={idCustomer} onChange={handleChangeCustomers}>
                               {customers.map((customer, customerIndex) => {
                                 return(
                                    <option key={customer.id} value={customerIndex}>{customer.fantasyName}</option>
                                 )
                               })}
                           </select>
                        }

                            </div>
                            <div>
                            <label>Assunto: </label>
                            <select value={subject} onChange={handleChangeSelect}>
                               <option value="Suporte">Suporte</option>
                               <option value="Visita T??cnica">Visita T??cnica</option>
                               <option value="Financeiro">Financeiro</option>
                               <option value="Comercial">Comercial</option>
                           </select>
                            </div>
                            <label>Status: </label>
                            <div className="form-radio">

                            <span>Aberto:</span>
                            <input type="radio" name="radio" value="Aberto"
                            checked={status === 'Aberto'} onChange={handleChangeRadio}  />

                            <span>Andamento:</span>
                            <input type="radio" name="radio" value="Andamento"
                            checked={status === 'Andamento'} onChange={handleChangeRadio}/>

                            <span>Conclu??do:</span>
                            <input type="radio" name="radio" value="Conclu??do"
                            checked={status === 'Conclu??do'} onChange={handleChangeRadio}/>

                            <span>Fechado:</span>
                            <input type="radio" name="radio" value="Fechado"
                            checked={status === 'Fechado'} onChange={handleChangeRadio}/>
                            
                            </div>
                            <div>
                            <label>Descri????o: </label>
                           <textarea name="description" id="description" cols="30" rows="10" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>
         
                        
                       

                        <button type="submit" >Adicionar Ordem de Servi??o</button>
                    </form>
            
        </div>
        
        </div>
    )
}

export default NewOrder;