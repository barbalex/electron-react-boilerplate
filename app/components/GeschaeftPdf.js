import React from 'react'
import moment from 'moment'
import Geschaeft from '../containers/geschaeft/Geschaeft.js'
import styles from './geschaeftPdf.css'
// import logoImg from 'file!../etc/logo.png'


const GeschaeftPdf = () =>
  <div className={[styles.body, 'geschaeftPdf'].join(' ')}>
    <div className={styles.pageContainer}>
      {/*
        <img
        src={logoImg}
        height="40"
        style={{
          marginBottom: 2
        }}
      />
      */}
      <Geschaeft />
      <div className={styles.footer}>
        <p>
          {moment().format('DD.MM.YYYY')}
        </p>
      </div>
    </div>
  </div>

GeschaeftPdf.displayName = 'GeschaeftPdf'

export default GeschaeftPdf
