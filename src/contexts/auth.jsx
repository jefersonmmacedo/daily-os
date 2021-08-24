import {createContext, useEffect, useState} from 'react';
import firebase from '../services/firebaseConnection';
import {toast} from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
    function loadStorage(){
        const storageUser = localStorage.getItem("SistemaUser");

        if(storageUser) {
            setUser(JSON.parse(storageUser));
            setLoading(false);
        }
        setLoading(false);
    }

    loadStorage();
   }, [])

   //Criando cadastro de login e user no banco de dados
   async function signUp(email, password, name) {
       setLoadingAuth(true);
       await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;

            await firebase.firestore().collection('users')
                .doc(uid).set({
                    name: name,
                    avatarUrl: null
                }).then(() => {
                    let data = {
                        uid: uid,
                        name: name,
                        avatarUrl: null,
                        email: value.user.email
                    };

                    setUser(data);
                    storageUser(data);
                    setLoadingAuth(false);
                    toast.success(`Seja bem-vindo, ${data.name}`)

                }).catch( error => {
                    console.log( console.log(error));
                    setLoadingAuth(false);
                    toast.error(`Ops. Aldo deu errado. Tente novamente ou contate o desenvolvedor`);
                })
        }).catch( error => {
            console.log( console.log(error));
            toast.error(`Ops. Aldo deu errado. Tente novamente ou contate o desenvolvedor`);
        })
   }

   //Login
   async function signIn(email, password){
        setLoadingAuth(true);
       await firebase.auth().signInWithEmailAndPassword(email, password)
                .then(async (value) => {
                    let uid = value.user.uid;

                    const userProfile = await firebase.firestore().collection('users')
                            .doc(uid).get();

                    let data = {
                        uid: uid,
                        name: userProfile.data().name,
                        avatarUrl: userProfile.data().avatarUrl,
                        email: value.user.email,
                    }

                    setUser(data);
                    storageUser(data);
                    setLoadingAuth(false);
                    toast.success(`Bem-vindo de volta, ${data.name}`);

                }).catch(error => {
                    console.log(error);
                    setLoadingAuth(false);
                    toast.error(`Ops. Aldo deu errado. Tente novamente ou contate o desenvolvedor`);
                })
   }

   //Salvando no localStorage
   function storageUser(data) {
       localStorage.setItem("SistemaUser", JSON.stringify(data));
   }

   //logout
   async function signOut(){
       await firebase.auth().signOut();
       localStorage.removeItem("SistemaUser");
       setUser(null)
   }

    return (
        <AuthContext.Provider
        value={{
            signed: !!user,
            user,
            loading,
            signUp,
            signOut,
            signIn,
            loadingAuth,
            setUser,
            storageUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;