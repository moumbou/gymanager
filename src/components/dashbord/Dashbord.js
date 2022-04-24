import React from 'react'
import SearchDashboard from './SearchDashboard'
import styles from '../../style/modules/dashboard.module.css'
import TableDashboard from './TableDashboard'
import { Pages } from '../../shared/Constants'
import { useSelector } from 'react-redux'
import { selectPage } from '../../features/sideBar/buttonsSlice'

function Dashbord() {

    const currentPage = useSelector(selectPage)

  return (
    <div className={`${styles.container} ${currentPage !== Pages.DASHBOARD ? 'hide' : ''}`}>
        <SearchDashboard />
        <TableDashboard />
    </div>
  )
}

export default Dashbord