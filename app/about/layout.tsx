import { ReactNode } from 'react'

const Metadata = {
  title: 'About - BNS Pharma',
  description: 'About BNS Pharma',
}

const layout = ({children}: {children: ReactNode}) => {
  return (
    <>
      {children}
    </>
  )
}

export default layout