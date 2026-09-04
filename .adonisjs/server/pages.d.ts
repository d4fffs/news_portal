import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'admin/articles/form': ExtractProps<(typeof import('../../inertia/pages/admin/articles/form.tsx'))['default']>
    'admin/articles/index': ExtractProps<(typeof import('../../inertia/pages/admin/articles/index.tsx'))['default']>
    'admin/categories/form': ExtractProps<(typeof import('../../inertia/pages/admin/categories/form.tsx'))['default']>
    'admin/categories/index': ExtractProps<(typeof import('../../inertia/pages/admin/categories/index.tsx'))['default']>
    'admin/index': ExtractProps<(typeof import('../../inertia/pages/admin/index.tsx'))['default']>
    'articles/show': ExtractProps<(typeof import('../../inertia/pages/articles/show.tsx'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
    'categories/show': ExtractProps<(typeof import('../../inertia/pages/categories/show.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
  }
}
