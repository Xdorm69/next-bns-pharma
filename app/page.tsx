import { AboutSection } from '@/components/Pages/AboutSection'
import { BlogPreview } from '@/components/Pages/BlogSection'
import { ContactForm } from '@/components/Pages/ContactForm'
import { CTABanner } from '@/components/Pages/CTABanner'
import Hero from '@/components/Pages/Hero'
import { ProcessSection } from '@/components/Pages/ProcessSection'
import ProductsPage from '@/components/Pages/Products'
import { QualitiesSection } from '@/components/Pages/QualitiesSection'
import React from 'react'

const page = () => {
  return (
    <>
      <Hero/>
      <AboutSection/> 
      <QualitiesSection/>
      <ProductsPage/>
      <ProcessSection />
      <CTABanner/>
      <BlogPreview/>
      <ContactForm/>
    </>
  )
}

export default page