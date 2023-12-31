import { RedButton } from '../../components/RedButton/RedButton'
import './registerSuccess.css'
import { useParams } from 'react-router-dom'

export function RegisterSuccess(){

    //pega nome da fruta da URL
    const {fruit} = useParams()
    return(
        <>
            <div className='registerSuccess-container'>
                <div className='registerSuccess-header'>
                    <a href="/"><img src={require("../../assets/x.png")} alt="x"/></a>
                </div>
                <div className='registerSuccess-image'>
                    <img src={require("../../assets/registersuccess.png")} alt="sucesso"/>
                </div>
                <div className='registerSuccess-text'>
                    <p>Fruta cadastrada</p>
                    <div className='registerSuccess-subtext'>Você cadastrou a fruta {fruit} com sucesso!</div>
                </div>
                <div className='registerSuccess-button'>
                    <RedButton id="registerSucess-link" link={true} href='/'>Voltar ao início</RedButton>
                </div>
            </div>
        </>
    )
}