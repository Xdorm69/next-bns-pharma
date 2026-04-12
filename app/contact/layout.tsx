import { ReactNode } from 'react'

const Metadata = {
  title: 'Contact - BNS Pharma',
  description: 'Contact BNS Pharma',
}

const layout = ({children}: {children: ReactNode}) => {
  return (
    <>
      {children}
    </>
  )
}

export default layout