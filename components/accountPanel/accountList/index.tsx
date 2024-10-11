'use client'
import { useCallback, useEffect, useRef } from 'react'
import { MemorizedAccountItem } from '../accountItem'
import styles from './index.module.scss'
import { useAppSelector } from '@/redux'
import { useAppDispatch } from '@/redux'
import { removeAccount } from '@/redux/features/userList'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { SelectedAccountContext } from '@/lib/context'
import defaultAvatar from '@/public/defaultAvatar.png'

/**
 *
 * @param props
 * @param props.redirect 表示未存在已验证用户时，重定向至 login 时携带的需要重定向的链接
 * @returns
 */
const AccountList = () => {
  const { selected, setSelected } = useContext(SelectedAccountContext)
  const scrollRef = useRef<HTMLDivElement>(null)
  const localUserList = useAppSelector((state) => state.localUserList)
  const dispatch = useAppDispatch()

  const scroll = useCallback((index: number) => {
    scrollRef.current!.scroll({ top: index * 80, behavior: 'smooth' })
  }, [])

  return (
    <>
      <div className={styles.accountList}>
        <div className={styles.scroll} ref={scrollRef}>
          <div className={styles.topWhite} />
          {localUserList.map((value, index) => {
            return (
              <MemorizedAccountItem
                index={index}
                selected={index === selected}
                key={`${value.email}_${value.nickName}`}
                nickName={`${value.nickName}`}
                mail={`${value.email}`}
                avator={`${value.avator || defaultAvatar.src}`}
                onFocus={() => {
                  setSelected(index)
                  scroll(index)
                }}
                onClose={() => {
                  dispatch(removeAccount(index))
                }}
              />
            )
          })}
          <div className={styles.bottomWhite} />
        </div>
      </div>
    </>
  )
}

export { AccountList }
