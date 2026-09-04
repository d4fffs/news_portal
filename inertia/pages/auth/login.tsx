import { Form, Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import CsrfField from '~/components/csrf_field'

export default function Login() {
  const { flash } = usePage()

  return (
    <div className="form-container">
      <Link route="home" className="article-back-link">
        ← Kembali
      </Link>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div
          style={{
            width: 64,
            height: 64,
            background: 'linear-gradient(135deg, var(--brand), var(--brand-dark))',
            borderRadius: 16,
            display: 'inline-grid',
            placeItems: 'center',
            color: 'white',
            fontSize: 28,
            fontWeight: 900,
            marginBottom: 16,
            boxShadow: '0 8px 24px rgba(220, 38, 38, 0.3)',
          }}
        >
          🔐
        </div>
        <h1>Selamat Datang Kembali</h1>
      </div>

      <Form route="session.store">
        {({ errors }) => (
          <>
            <CsrfField />
            <div>
              <label htmlFor="email">📧 Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="username"
                placeholder="nama@email.com"
                data-invalid={errors.email ? 'true' : undefined}
              />
              {errors.email && <small>{errors.email}</small>}
            </div>

            <div>
              <label htmlFor="password">🔒 Password</label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                placeholder="Masukkan password"
              />
              {errors.password && <small>{errors.password}</small>}
            </div>

            <div style={{ marginTop: 8 }}>
              <button
                type="submit"
                className="button"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Masuk
              </button>
            </div>
          </>
        )}
      </Form>

      {flash.error && (
        <div className="form-error" role="alert">
          {flash.error}
        </div>
      )}

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--muted)' }}>
        Belum punya akun?{' '}
        <Link route="new_account.create" style={{ color: 'var(--brand)', fontWeight: 600 }}>
          Daftar
        </Link>
      </p>
    </div>
  )
}
