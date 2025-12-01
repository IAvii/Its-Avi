'use client'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Model from './Model'

export default function Scene({activeMenu}) {
  return (
    <div className='absolute top-1/2 -translate-y-1/2 h-80 w-full'>
        <Canvas>
            <Model activeMenu={activeMenu}/>
        </Canvas>
    </div>
  )
}
