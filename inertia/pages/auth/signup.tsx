import { Form, Link } from '@adonisjs/inertia/react'
import CsrfField from '~/components/csrf_field'

export default function Signup() {
  return (
    <div className="form-container">
      <button
        type="button"
        className="article-back-link"
        onClick={() => {
          if (window.history.length > 1) {
            window.history.back()
          } else {
            window.location.href = '/'
          }
        }}
      >
        ← Kembali
      </button>
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
            marginBottom: 16,
            boxShadow: '0 8px 24px rgba(220, 38, 38, 0.3)',
          }}
        >
          ✍️
        </div>
        <h1>Bergabung Bersama Kami</h1>
      </div>

      <Form route="new_account.store">
        {({ errors }) => (
          <>
            <CsrfField />
            <div>
              <label htmlFor="fullName">👤 Nama Lengkap</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Masukkan nama lengkap"
                data-invalid={errors.fullName ? 'true' : undefined}
              />
              {errors.fullName && <small>{errors.fullName}</small>}
            </div>

            <div>
              <label htmlFor="email">📧 Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
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
                autoComplete="new-password"
                placeholder="Minimal 8 karakter"
                data-invalid={errors.password ? 'true' : undefined}
              />
              {errors.password && <small>{errors.password}</small>}
            </div>

            <div>
              <label htmlFor="passwordConfirmation">🔐 Konfirmasi Password</label>
              <input
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                autoComplete="new-password"
                placeholder="Ulangi password"
                data-invalid={errors.passwordConfirmation ? 'true' : undefined}
              />
              {errors.passwordConfirmation && <small>{errors.passwordConfirmation}</small>}
            </div>

            <div style={{ marginTop: 8 }}>
              <button
                type="submit"
                className="button"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Buat Akun Sekarang →
              </button>
            </div>
          </>
        )}
      </Form>

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--muted)' }}>
        Sudah punya akun?{' '}
        <Link route="session.create" style={{ color: 'var(--brand)', fontWeight: 600 }}>
          Masuk
        </Link>
      </p>
    </div>
  )
}
