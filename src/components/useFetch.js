import { useState, useEffect, useCallback } from 'react'

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true)
  const [room, setRoom] = useState([])

  const getRoom = useCallback(async () => {
    const response = await fetch(url)
    const room = await response.json()
    setRoom(room)
    setLoading(false)
  }, [url])

  useEffect(() => {
    getRoom()
  }, [url, getRoom])
  return { loading, room }
}
