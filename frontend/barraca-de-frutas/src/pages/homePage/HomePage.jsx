import './homePage.css'
import { RedButton } from '../../components/RedButton/RedButton'
import { Navigate } from 'react-router-dom'
import { ModalOptions } from '../../components/ModalOptions/ModalOptions'
import { useState } from 'react'

export function HomePage(){

    //coleta as chaves que estão postas no localStorage
    var keys = Object.keys(localStorage)
    //retira o valor usado para guardar último índice
    keys.splice(keys.indexOf("lastIndex"),1)

    

    var empty
    if(keys.length === 0){
        empty = true
    }else{
        empty = false
        //define os itens a serem mostrados na tela     
    }

    const [openModal, setOpenModal] = useState(false)
    const [idFruit, setIdFruit] = useState("")
    var   [listFruits, setListFruits] = useState(
        keys.map((i)=>
            <li key={localStorage.getItem(i)}>
                <div className='homePage-item'>
                    <div className='homePage-itens'>
                    <div className='homePage-itemName'> {JSON.parse(localStorage.getItem(i)).name} </div>
                            <div className='homePage-itemPrice'>
                                    <img src={require('../../assets/money.png')} alt="option"/>
                                    R$ {JSON.parse(localStorage.getItem(i)).price} 
                                </div>
                            <div className='homePage-itemQuantity'>{JSON.parse(localStorage.getItem(i)).quantity} em estoque</div>
                    </div>
                    <button className="homePage-options" onClick={()=> modal(i)}>
                        <img src={require('../../assets/options.png')} alt="option"/>
                    </button>
                </div>
            </li>
        )
    )

    const modal = (id) =>{
        setIdFruit(id)
        setOpenModal(!openModal)
    }

    const search = (e) =>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        console.log("alo " + data.searchData)
        if(data.searchData === ''){
            setListFruits(
                keys.map((i)=>
                    <li key={localStorage.getItem(i)}>
                        <div className='homePage-item'>
                            <div className='homePage-itens'>
                            <div className='homePage-itemName'> {JSON.parse(localStorage.getItem(i)).name} </div>
                                    <div className='homePage-itemPrice'>
                                            <img src={require('../../assets/money.png')} alt="option"/>
                                            R$ {JSON.parse(localStorage.getItem(i)).price} 
                                        </div>
                                    <div className='homePage-itemQuantity'>{JSON.parse(localStorage.getItem(i)).quantity} em estoque</div>
                            </div>
                            <button className="homePage-options" onClick={()=> modal(i)}>
                                <img src={require('../../assets/options.png')} alt="option"/>
                            </button>
                        </div>
                    </li>
                )
            )
        }else{
            var newKeys = []
            keys.forEach((i)=>{
                if(JSON.parse(localStorage.getItem(i)).name === data.searchData){
                    newKeys.push(i)
                }
            })
            setListFruits(
                newKeys.map((i)=>
                    <li key={localStorage.getItem(i)}>
                        <div className='homePage-item'>
                            <div className='homePage-itens'>
                            <div className='homePage-itemName'> {JSON.parse(localStorage.getItem(i)).name} </div>
                                    <div className='homePage-itemPrice'>
                                            <img src={require('../../assets/money.png')} alt="option"/>
                                            R$ {JSON.parse(localStorage.getItem(i)).price} 
                                        </div>
                                    <div className='homePage-itemQuantity'>{JSON.parse(localStorage.getItem(i)).quantity} em estoque</div>
                            </div>
                            <button className="homePage-options" onClick={()=> modal(i)}>
                                <img src={require('../../assets/options.png')} alt="option"/>
                            </button>
                        </div>
                    </li>
                )
            )
        }
        
    }

    return(
        <>  
            {empty ? (
                <div>
                    <div>Cadastre sua primeira fruta</div>
                    <RedButton href="/cadastrar-fruta">+ Cadastrar Fruta</RedButton>
                </div>
            ): (
                <div>
                    <div className="homePage-search">
                        <form onSubmit={search}>
                            <button type='submit' className="homePage-buttonSearch"><img src={require('../../assets/search.png')} alt="search"/></button>
                            <input name = "searchData" placeholder='Pesquisar Fruta'></input>
                        </form>
                    </div>
         
                    {listFruits}
                    <a id="homePage-registerPlus" href="/cadastrar-fruta">
                        <img src={require('../../assets/plus.png')} alt="option"/>
                    </a>
                    <ModalOptions isOpen={openModal} setOpen={setOpenModal} idFruit={idFruit}/>
                </div>
            )}
        </>
    )
}