import './editFruit.css'
import { RedButton } from '../../components/RedButton/RedButton'
import { Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'



export function EditFruit(){

    const [redirect, setRedirect] = useState(false) //usado para redirecionar
    const {idFruit} = useParams()   //usado para pegar dados de URL
    const Initialdata = JSON.parse(localStorage.getItem(idFruit)) //pega dados de parâmetro
    
    //define gerência de estados de variáveis iniciais
    const [initialName, setInitialName] = useState(Initialdata.name) 
    const [initialPrice, setInitialPrice] = useState(Initialdata.price)
    const [initialQuantity, setInitialQuantity] = useState(Initialdata.quantity)

    const handleChangeName = event =>{
        setInitialName(event.target.value)
    }
    const handleChangePrice = event =>{
        setInitialPrice(event.target.value)
    }
    const handleChangeQuantity = event =>{
        setInitialQuantity(event.target.value)
    }
    
    //atualiza dados no localStorage
    const saveOnLocalStorage = (e) =>{
        e.preventDefault()
    
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        var dataToSave = {
            "name": data.name,
            "price": data.price,
            "quantity": data.quantity
        }
        localStorage.setItem(idFruit,JSON.stringify(dataToSave))
        setRedirect(true)
    }

    return(
        <>
            <div className='EditFruit-header'>
                <div className='EditFruit-headerText'>Editar Fruta</div>
                <div className='EditFruit-headerX'><a href='/'><img src={require("../../assets/x.png")} alt="x"/></a></div>
            </div>
            <div className='EditFruit-form'>
                <form onSubmit={saveOnLocalStorage}>
                    <div className='EditFruit-inputName'>
                        <div className='EditFruit-inputNameImage'>
                            <img src={require("../../assets/name.png")} alt="x"/>
                        </div>
                        <input pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]+" value={initialName} onChange={handleChangeName} maxLength="26" required name = "name" placeholder='Nome da fruta'></input><br/>
                    </div>
                    <div className='EditFruit-inputPrice'>
                        <div className='EditFruit-inputPriceImage'>
                            <img src={require("../../assets/price.png")} alt="x"/>
                        </div>
                        <input pattern="[0-9]+(,[0-9]+)?" value={initialPrice} onChange={handleChangePrice} required name = "price" placeholder='Preço do Kilo'></input><br/>
                    </div>
                    <div className='EditFruit-inputQuantity'>
                        <div className='EditFruit-inputQuantityImage'>
                            <img src={require("../../assets/quantity.png")} alt="x"/>
                        </div>
                        <input pattern="[0-9]+" value={initialQuantity} onChange={handleChangeQuantity} required name = "quantity" placeholder='Quantidade no estoque'></input><br/>
                    </div>
                    <RedButton type="submit">Atualizar Fruta</RedButton>
                </form>
            </div>
            { redirect === true ? <Navigate to = {`/`}/> : ""}
    
        </>
    )
}