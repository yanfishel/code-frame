import { useCallback, useRef, useState } from 'react';


export function useSafeAsync<T extends any[]>(fn:(signal:AbortSignal, ...args:T) => Promise<any>, timeout = 10000) {
  
  const running = useRef(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [success, setSuccess] = useState(false)
  
  const execute = useCallback(async (...args:T) => {
    if(running.current) {
      return
    }
    running.current = true
    setLoading(true)
    setError(null)
    setSuccess(false)
    
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeout)
    
    try {
      const res = await fn(controller.signal, ...args)
      setSuccess(true)
      return res
    } catch (err:any) {
      if(err.name === 'AbortError') {
        setError(new Error('Request timed out'))
      } else {
        setError(err);
      }
      throw err
    } finally {
      clearTimeout(timer)
      running.current = false
      setLoading(false)
    }
  }, [fn, timeout])
  
  return { loading, error, success, execute }
  
}