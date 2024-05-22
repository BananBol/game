import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { axiosInstance } from '../../utils/API/API'
import Loading from '../../components/loading/loading'
import './style.css'

const DetailPage = () => {

  const {id} = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [character, setCharacter] = useState({})

  const getCharacter = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(`api/v2/Characters/${id}`)
      setCharacter(response.data)
    } catch (e) {
      if (e.response.status === 400) {
        alert('В запросе есть синтаксическая ошибка.Код ошибки 400')
      } else if (e.response.status === 401) {
        alert('Доступ запрещен или требуется авторизация.Код ошибки 401')
      } else if (e.response.status === 402) {
        alert('нестандартная ошибка клиента, зарезервированная для использования в будущем.Код ошибки 402')
      } else if (e.response.status === 403) {
        alert('доступ к запрашиваемой странице запрещен или у пользователя нет прав на просмотр контента.Код ошибки 403')
      } else if (e.response.status === 404) {
        alert('связь с сервером установлена, но данных по заданному запросу на сервере нет.Код ошибки 404')
      }
    } finally {
      setIsLoading(false)
    }
    
  }
  useEffect(() => {
    (async () => {
      await getCharacter()
    })()
  }, [])
  
  return (
    <div className='container'>
      { isLoading ?
        <Loading/>
        :
        <div className='cont'>
          <div className='Det'>Character Detail</div>
          
          <h2>{character.fullName}</h2>
          <div className='big-photo'>
            <img src={character.imageUrl} alt="" />
          </div>
          <div className='detail'>
          <div className='fam'>
            <p>Id:</p> 
            {character.id}
            </div>

          <div className='fam'>
            <p>FirstName:</p> 
            {character.firstName}
            </div>

            <div className='fam'>
            <p>LastName:</p> 
            {character.lastName}
            </div>

            <div className='fam'>
            <p>FullName:</p>
            {character.fullName}
            </div>

            <div className='fam'>
            <p>Title:</p> 
            {character.title}
            </div>

            <div className='fam'>
            <p>Family:</p> 
            {character.family}
            </div>
         
            <div className='fam'>
            <p>Image:</p> 
            {character.image}
            </div>
           
          </div>
        </div>
      }
    </div>
  )
}

export default DetailPage