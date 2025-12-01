'use client'

import React from 'react'
import Names from './names'
import { useState } from 'react';
import Scene from './mouse-image/Scene';

export default function Name() {

  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className=' relative'>
      <Names setActiveMenu={setActiveMenu} />
      <Scene activeMenu={activeMenu} />
    </div>
    
  )
}
