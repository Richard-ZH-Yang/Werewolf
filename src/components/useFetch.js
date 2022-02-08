import { useState, useEffect, useCallback } from 'react'

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true)
  const [players, setPlayers] = useState([])

  const getPlayers = useCallback(async () => {
    const response = await fetch(url)
    const players = await response.json()
    setPlayers(players)
    setLoading(false)
  }, [url])

  useEffect(() => {
    getPlayers()
  }, [url, getPlayers])
  return { loading, players }
}
