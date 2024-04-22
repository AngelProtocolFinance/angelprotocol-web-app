import React, { createContext, useState } from 'react'

export const PageContext = createContext(null)

const PageState = (props) => {
  const [page, setPage] = useState("blog")
  const changePage = (page) => {
    setPage(page)
  }

  return (
    <PageContext.Provider value={{page, changePage}}>
      {props.children}
    </PageContext.Provider>
  )
}

export default PageState