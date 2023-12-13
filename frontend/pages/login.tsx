import { useRouter } from 'next/router';
import styles from './styles.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {useState} from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const notify = () => toast("Email ou Senha invalidos !")

    const router = useRouter();

    const handleSenhaChange = (event:any) => {
        setSenha(event.target.value);
    };

    const handleEmailChange = (event:any) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        
        const data = {
            email: email,
            senha: senha
        };

        try {
            const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
            });

        if (response.ok) {
            console.log(response)
            const { token } = await response.json();
            localStorage.setItem('@token', token);
            router.push('/home');
        }
        else {
            console.log(response)
            notify();
        }
        } catch (error) {
            
            console.log(error);
        }
    };

    return (
        <div className={styles.loginScreen}>
            
            <div className={styles.screenSty}></div>
            <div className={styles.personalBox}>
                <ToastContainer />
                <h3>Bem vindo de volta!</h3>
                <h4>
                    Informe seus dados para logar na melhor plataforma de livros do Brasil!
                </h4>

                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Email</label>
                        <input
                            id='email'
                            className={styles.formInput}
                            name='email'
                            type='email'
                            placeholder='email@email.com'
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Senha</label>
                        <input
                            id='senha'
                            className={styles.formInput}
                            type='password'
                            name='senha'
                            placeholder='********'
                            onChange={handleSenhaChange}
                        />
                    </div>
                    <div className={styles.btnLogin}>
                        <button type="submit" className={styles.btnPrimary} >
                            Continuar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
