import { type Data } from '@generated/data'
import { toast, Toaster } from 'sonner'
import { usePage } from '@inertiajs/react'
import { type ReactElement, useEffect } from 'react'
import Navbar from '~/components/navbar'
import Footer from '~/components/footer'
import AdminSidebar from '~/components/admin_sidebar'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const { url, flash, props } = usePage()
  const pageProps = props as Data.SharedProps & { categories?: { name: string; slug: string }[] }
  useEffect(() => {
    toast.dismiss()
  }, [url])

  useEffect(() => {
    if (flash.error) {
      toast.error(flash.error)
    }
    if (flash.success) {
      toast.success(flash.success)
    }
  })

  const isAdmin = url.startsWith('/admin')
  const currentSlug = url.match(/\/categories\/([^/]+)/)?.[1]
  return (
    <>
      {isAdmin ? (
        <AdminSidebar />
      ) : (
        <Navbar user={pageProps.user} categories={pageProps.categories} currentSlug={currentSlug} />
      )}
      <main>{children}</main>
      {!isAdmin && <Footer categories={pageProps.categories} />}
      <Toaster position="top-center" richColors />
    </>
  )
}
