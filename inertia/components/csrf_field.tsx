import { usePage } from '@inertiajs/react'

export default function CsrfField() {
  const { props } = usePage<{ csrfToken?: string }>()
  return <input type="hidden" name="_csrf" value={props.csrfToken ?? ''} />
}
