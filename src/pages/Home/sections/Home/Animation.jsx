import React from 'react'
import AnimatedSVG from '../../components/AnimatedSVG'
import JoinUsBanner from '../../components/JoinUsBanner'
import MobileAnimation from '../../components/MobileAnimation'
import TabletAnimation from '../../components/TabletAnimation'

const Animation = () => {
  return (
    <div className=' relative flex flex-col '>
        <AnimatedSVG />
        <MobileAnimation />
        <TabletAnimation />
        {/* <JoinUsBanner /> */}
    </div>
  )
}

export default Animation

