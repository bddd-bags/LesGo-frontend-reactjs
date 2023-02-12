import React from 'react'
import Index from '../../../../components/auth/shared/Index'
import {SiReactivex} from 'react-icons/si'
import IndexUser from './Index'

const Activity = () => {

  const element = () => {
    return (
      <>
        <IndexUser active={'active'} />
        HAI
      </>
    )
  }
  return (
    <>
      <Index element={element()} name={'Courses Active'} icon={<SiReactivex color={'white'} />} />
    </>
  )
}

export default Activity