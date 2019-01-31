import React from 'react'
import {de} from 'date-fns/locale'
import {LogoProps} from '@wepublish/ui'
import {rgba} from 'csx'

export function BrandLogo(props: LogoProps) {
  return (
    <svg className={props.className} viewBox="0 0 164 45">
      <path d="M12.051 7.185V17.52h1.26c1.64 0 2.71-1.134 2.71-2.773v-4.79c0-1.639-1.07-2.773-2.71-2.773h-1.26zm0 17.143v13.109h1.134c1.765 0 2.837-.882 2.837-2.836v-7.437c0-1.954-1.072-2.836-2.837-2.836h-1.134zM.833 45V0h16.386c6.114 0 9.643 1.89 9.643 8.32v4.978c0 5.168-2.836 6.555-7.563 6.744l-.126.126c5.105.19 8.445 3.214 8.445 8.635v6.302c0 7.185-3.781 9.895-11.092 9.895H.833zm33.682 0V0h12.794c7.437 0 13.172.441 13.172 9.139v4.033c0 4.916-1.89 7.626-6.806 7.941v.126c5.168.316 7.248 2.963 7.248 8.005V45h-10.84V27.92c0-2.143-.631-3.907-3.026-3.907a4.19 4.19 0 0 0-1.324.189V45H34.515zM45.733 7.185v10.02h.883c1.575 0 3.466-.566 3.466-3.15v-3.719c0-2.584-1.89-3.151-3.466-3.151h-.883zM79.29 29.118h4.034L81.307 7.94h-.126L79.29 29.118zM67.126 45l5.672-45H89.5l6.176 45H84.08l-.567-7.941H79.29L78.723 45H67.126zm34.754 0V0h9.832l6.618 22.374h.126V0h9.832v45h-9.832L111.9 19.853h-.19V45h-9.831zm33.682 0V0h14.622c7.878 0 12.983 1.45 12.983 11.534v24.832c0 6.743-5.168 8.634-10.273 8.634h-17.332zM147.16 7.563v29.874h1.702c1.701 0 2.773-1.576 2.71-3.719V11.282c.063-2.143-1.009-3.719-2.71-3.719h-1.702z" />
    </svg>
  )
}

export const brandTheme = {
  logoComponent: BrandLogo,
  colors: {
    color1: '#FFFFFF',
    color2: '#F9F9F9',
    color3: '#CCCCCC',
    color4: '#ECECEC',
    color5: '#979797',
    color6: '#454545',
    color7: '#000000',
    primaryTextColor: '#222222',
    shadowColor: rgba(170, 170, 170, 0.3).toString()
  }
}

export const configuration = {
  siteName: 'we.publish example',
  talkURL: process.env.TALK_URL!,
  locale: 'de',
  dateLocale: de,
  theme: brandTheme,
  hostname: process.env.HOSTNAME!
}
