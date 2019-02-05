import React from 'react'

export interface IconProps {
  className?: string
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={props.className}>
      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
    </svg>
  )
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={props.className}>
      <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-3.594-1.555c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 0 1 1.671 3.149a4.93 4.93 0 0 0 1.523 6.574 4.903 4.903 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084 4.928 4.928 0 0 0 4.6 3.419A9.9 9.9 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0 0 24 4.557z" />
    </svg>
  )
}

export function EmailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={props.className}>
      <path d="M0 3v18h24V3H0zm6.623 7.929L2 16.641V7.183l4.623 3.746zM2.482 5h19.035L12 12.713 2.482 5zm5.694 7.188L12 15.287l3.83-3.104L21.442 19H2.663l5.513-6.812zm9.208-1.264L22 7.183v9.348l-4.616-5.607z" />
    </svg>
  )
}
