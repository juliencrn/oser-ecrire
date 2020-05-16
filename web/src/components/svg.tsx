import React, { CSSProperties } from 'react'

export function FooterWave({ color }: { color?: CSSProperties['color'] }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 42 1440 220">
      <path
        fill={color || '#0097a7'}
        fillOpacity="1"
        d="M0,160L40,165.3C80,171,160,181,240,192C320,203,400,213,480,208C560,203,640,181,720,154.7C800,128,880,96,960,74.7C1040,53,1120,43,1200,42.7C1280,43,1360,53,1400,58.7L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
      ></path>
    </svg>
  )
}

// export function LightSectionTopWave({
//   color,
// }: {
//   color?: CSSProperties['color']
// }) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
//       <path
//         fill={color || 'rgba(0, 184, 212, 0.3)'}
//         fillOpacity="1"
//         d="M0,32L80,42.7C160,53,320,75,480,101.3C640,128,800,160,960,154.7C1120,149,1280,107,1360,85.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
//       ></path>
//     </svg>
//   )
// }

export function LightSectionTopWave({
  color,
}: {
  color?: CSSProperties['color']
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
      <path
        fill={color || 'rgba(0, 184, 212, 0.3)'}
        fillOpacity="1"
        d="M0,32L80,48C160,64,320,96,480,112C640,128,800,128,960,122.7C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
    </svg>
  )
}
