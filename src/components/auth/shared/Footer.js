import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className={`${styles.footer}`}>
        <div className='container'>
          <div className='d-flex justify-content-between align-items-center' style={{height: '76px'}}>
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block" style={{fontSize: '13.2px', color: '#9C9FA6 !important'}}>Copyright © 2023 <Link to={'https://github.com'} style={{color: '#1bcfb4', textDecoration: 'none'}} target="_blank">Final Project</Link>. All rights reserved.</span>
          <span className="text-center text-sm-left d-block d-sm-inline-block" style={{fontSize: '13.2px', color: '#343a40'}}>Develop by <Link to={'https://github.com'} style={{color: '#1bcfb4', textDecoration: 'none'}} target="_blank">Bagas</Link> & <Link to={'https://github.com'} style={{color: '#1bcfb4', textDecoration: 'none'}} target="_blank">Arsya</Link></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer