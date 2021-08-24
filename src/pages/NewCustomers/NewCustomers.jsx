import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import {FiUserPlus} from 'react-icons/fi'
import { useState } from 'react';
import firebase from '../../services/firebaseConnection';
import {toast} from 'react-toastify';
import './newCustomers.css'

function NewCustomers(props) {
    const [cnpj, setCpnj] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [fantasyName, setFantasyName] = useState('');
    const [road, setRoad] = useState('');
    const [number, setNumber] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [smartphone, setSmartphone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    async function handleAddClient(e) {
        e.preventDefault()
        
       if(cnpj !== '' &&
        companyName !== '' &&
        fantasyName !== '' &&
        road !== '' &&
        number !== '' &&
        district !== '' &&
        city !== '' &&
        uf !== '' &&
        code !== '' &&
        email !== '' &&
        phone !== '' &&
        smartphone !== '' &&
        whatsapp !== '') {
        await firebase.firestore().collection('customers')
        .add({
            cnpj:cnpj,
        companyName:companyName,
        fantasyName:fantasyName,
        road: road,
        number:number,
        district:district,
        city:city,
        uf:uf,
        code:code,
        email:email,
        phone:phone,
        smartphone:smartphone,
        whatsapp:whatsapp
        }).then(() => {
            setCpnj('');
            setCompanyName('');
            setFantasyName('');
            setRoad('');
            setNumber('');
            setDistrict('');
            setCity('');
            setUf('');
            setCode('');
            setEmail('');
            setPhone('');
            setSmartphone('');
            setWhatsapp('');

            toast.success('Novo CLiente cadastrado com sucesso!')
        }).catch(error => {
            console.log(error)
            toast.error('Ops. Deu algo errado')
        })
        
       } else {
        toast.error('Preencha todos os campos corretamente')
       }
    }

    
    return (
        <div className="customers">
        <Header />
        <div className="content">
        <Title name="Novo Cliente">
            <FiUserPlus />
        </Title>
        </div>
        <div className="container">
        <form className="form" onSubmit={handleAddClient}>
                        <span>Dados Empresa</span>
                        <div>
                            <label>CNPJ: </label>
                            <input type="text" value={cnpj} onChange={(e) => setCpnj(e.target.value)} />
                            <label>Razão Social: </label>
                            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                            <label>Nome Fantasia: </label>
                            <input type="text" value={fantasyName}  onChange={(e) => setFantasyName(e.target.value)}/>
                        </div>
                        <span>Dados Endereço</span>
                        <div>
                            <label>Rua: </label>
                            <input type="text" value={road} onChange={(e) => setRoad(e.target.value)} />
                            <label>Nº: </label>
                            <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
                            <label>Bairro: </label>
                            <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} />
                            </div>
                            <div className="intern">                       
                            <label>Cidade: </label>
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                            <label>Estado: </label>
                            <input type="text" value={uf} onChange={(e) => setUf(e.target.value)} />
                            <label>CEP: </label>
                            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                        </div>
                        <span>Dados Contato</span>
                        <div>
                            <label>Email: </label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label>Telefone: </label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="intern">
                            <label>Celular: </label> 
                            <input type="text" value={smartphone} onChange={(e) => setSmartphone(e.target.value)} />
                            <label>Whatsapp: </label>
                            <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                        </div>

                        <button type="submit" >Cadastrar Cliente</button>
                    </form>
            
        </div>
        
        </div>
    )
}

export default NewCustomers;