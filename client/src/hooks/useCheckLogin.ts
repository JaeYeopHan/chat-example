import { useEffect } from 'react'
import { redirect } from '@/utils/history'

export function useCheckLogin(userId: string) {
  useEffect(() => {
    if (userId === '') {
      alert('로그인이 필요합니다.')
      redirect('/')
    }
  })
}
