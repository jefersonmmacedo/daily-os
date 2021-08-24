
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import {FiSettings, FiUpload} from 'react-icons/fi'
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import avatarLogo from '../../assets/images/avatar.svg';
import firebase from '../../services/firebaseConnection';
import {toast} from 'react-toastify';
import './profile.css'

function Profile(props) {
    const {user, setUser, storageUser} = useContext(AuthContext);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null)

    function handleFile(e) {
        //console.log(e.target.files[0])

        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            } else {
                toast.error('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
                setImageAvatar(null);
                return null;
            }
        }
    }
    async function handleUpload() {
        const currentUid = user.uid;

        const uploadTask = await firebase.storage()
            .ref(`images/${currentUid}/${imageAvatar.name}`)
            .put(imageAvatar)
            .then(async () => {
                    await firebase.storage().ref(`images/${currentUid}`)
                        .child(imageAvatar.name)
                        .getDownloadURL()
                        .then( async (url) => {
                            let urlImage = url;

                            await firebase.firestore().collection('users')
                            .doc(user.uid)
                            .update({
                                avatarUrl: urlImage,
                                name: name
                            }).then(() => {
                                let data = {
                                    ...user,
                                    name: name,
                                    avatarUrl: urlImage
                                }
            
                                setUser(data);
                                storageUser(data);
                                toast.success('Avatar alterado com sucesso!')
                            }).catch(error => {
                                console.log(error);
                                toast.error('Ops. Deu algo errado. Tente novamente ou contate o desenvovedor!')
                            })
                        }).catch(error => {
                            console.log(error);
                            toast.error('Ops. Deu algo errado. Tente novamente ou contate o desenvovedor!')
                        })
            }).catch(error => {
                console.log(error);
                toast.error('Ops. Deu algo errado. Tente novamente ou contate o desenvovedor!')
            })
    }

    async function handleSave(e) {
        e.preventDefault();

        //Alterando apenas o nome
       if(imageAvatar === null && name !== '') {
            await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    name: name
                }).then(() => {
                    let data = {
                        ...user,
                        name: name
                    }

                    setUser(data);
                    storageUser(data);
                    toast.success('Nome de usuário alterado com sucesso!')

                }).catch(error => {
                    console.log(error);
                    toast.error('Ops. Deu algo errado. Tente novamente ou contate o desenvovedor!')
                })
       }
       // Adicionando imagem e nome
       else if(name !== '' && imageAvatar !== null){
           handleUpload()
       }
    }

    return (
        <div className="profile">
        <Header />
        <div className="content">
        <Title name="Configurações de Perfil">
            <FiSettings />
        </Title>
        </div>
        <div className="container">
            <form className="form-profile">
                <label className="label-avatar">
                    <span><FiUpload color="#f65" size={25} /></span>
                    <input type="file" accept="image/*" onChange={handleFile}/><br />
                    <img src={avatarUrl === null ? avatarLogo : avatarUrl} alt="Avatar" height={191} width={191}/>
                </label>

                <label>Nome</label>
                    <input type="text"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                <label>Email</label>
                    <input type="email" value={email} disabled={true}/>

                <button type="submit" onClick={handleSave}>Salvar</button>
                
            </form>
        </div>
        
        </div>
    )
}

export default Profile;