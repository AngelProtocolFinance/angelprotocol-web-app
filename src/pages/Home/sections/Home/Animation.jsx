import React from 'react'
import AnimatedSVG from '../../../../components/landing/AnimatedSVG'
import MobileAnimation from '../../../../components/landing/MobileAnimation'
import TabletAnimation from '../../../../components/landing/TabletAnimation'

const Animation = () => {
  return (
    <div className=' relative flex flex-col '>
        <AnimatedSVG />
        <MobileAnimation />
        <TabletAnimation />
    </div>
  )
}

export default Animation

