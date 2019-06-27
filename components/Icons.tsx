import { CSSProperties } from 'react'

interface IconProps {
  style?: CSSProperties
  onClick?: (e: any) => void
}

export const HamburgerMenu = (props: IconProps) => (
  <svg version="1.1" viewBox="0 0 224 224" width="16px" height="16px" onClick={props.onClick}>
    <g
      fill="none"
      fillRule="nonzero"
      stroke="none"
      strokeWidth="1"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
      strokeDasharray=""
      strokeDashoffset="0"
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
      style={{ ...(props.style || {}), mixBlendMode: 'normal' }}
    >
      <path d="M0,224v-224h224v224z" fill="none" />
      <g fill="#ffffff">
        <g id="surface1">
          <path d="M0,33.6v22.4h224v-22.4zM0,100.8v22.4h224v-22.4zM0,168v22.4h224v-22.4z" />
        </g>
      </g>
    </g>
  </svg>
)

export const RightChevron = ({ color, width, height }: { color?: string; width?: number; height?: number }) => (
  <svg
    // style={{ paddingLeft: '6px', paddingRight: '6px', position: 'relative', top: '2px', boxSizing: 'content-box' }}
    version="1.1"
    id="Layer_1"
    x="0px"
    y="0px"
    width={width || 11}
    height={height || 18}
    viewBox="0 0 18 30"
    enableBackground="new 0 0 18 30"
    xmlSpace="preserve"
  >
    <g>
      <path fill={color || '#FFFFFF'} d="M0,0h9.333L18,15.001L9.333,30H0l8.667-14.999L0,0z" />
    </g>
  </svg>
)

export const RightArrow = ({ color, width, height }: { color?: string; width?: number; height?: number }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <path fill={color || '#000000'} d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
)

export const LeftArrow = ({ color, width, height }: { color?: string; width?: number; height?: number }) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <path fill={color || '#000000'} d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
)

export const DropdownArrow = ({ width, height }: { width: number; height: number }) => (
  <svg version="1.1" viewBox="0 0 255 255" width={width} height={height}>
    <polygon fill="#000000" points="0,63.75 127.5,191.25 255,63.75 		" />
  </svg>
)

export const PlusWhite = ({ style }: { style?: CSSProperties }) => (
  <svg version="1.1" viewBox="0 0 491.86 491.86" width="32px" height="32px" style={style || {}}>
    <path
      fill="#FFFFFF"
      d="M465.167,211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316,18.267-34.316,26.69v184.924H26.69
			C18.267,211.614,0,223.053,0,245.929s18.267,34.316,26.69,34.316h184.924v184.924c0,8.422,11.438,26.69,34.316,26.69
			s34.316-18.268,34.316-26.69V280.245H465.17c8.422,0,26.69-11.438,26.69-34.316S473.59,211.614,465.167,211.614z"
    />
  </svg>
)
