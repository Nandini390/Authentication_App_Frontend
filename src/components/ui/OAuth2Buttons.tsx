import React from 'react'
import { Button } from './button'
import { NavLink } from 'react-router'

function OAuth2Buttons() {
  return (
    <NavLink to={`${import.meta.env.VITE_BASE_URL || 'http://localhost:8080'}/oauth2/authorization/google`} className={'block'}>
     <Button type="button" variant="outline" className="w-full cursor-pointer flex items-center gap-3 h-11 text-sm">
              Continue with Google
            </Button>
    </NavLink>
  )
}

export default OAuth2Buttons
