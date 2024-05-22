import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../utils/API/API'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/loading'
import './style.css'

const MainPage = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [characters, setCharacters] = useState([])
    const navigate = useNavigate()

  const getCharacters = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get('api/v2/Characters')
      setCharacters(response.data)
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
      await getCharacters()
    })()
  }, [])

  return (
    <div>
       {isLoading ?
        <Loading />
        :
        <div className='character-list-wrap'>
          <div className='List'>Character List</div>
          <div className='details'>Id<p>Name</p><p>Image</p> </div>
          
          {characters.map((item,idx) => {
            return (
              <div
              key={idx}
              className='character-list'
              onClick={() => navigate(`/${item.id}`)}
              >
                <div>
                {item.id}
                </div>
                <div>
                {item.fullName}
                </div>
                <div className='photo'>
                <img src={item.imageUrl} alt="" />
                </div>
              </div>
            )
          })}
        </div>
      } 
    </div>
  )
}

export default MainPage