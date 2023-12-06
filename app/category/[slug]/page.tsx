import MatchedCategories from '@/components/matchedCategories/MatchedCategories'
import React from 'react'

const MatchedCategriesPage = async(params:any) => {
    console.log(params,"params from MatchedCategriesPage");
    
  return (
    <div><MatchedCategories params={params}/></div>
  )
}

export default MatchedCategriesPage