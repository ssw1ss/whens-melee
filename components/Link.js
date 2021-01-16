import { useRouter } from 'next/router'
import Link from 'next/link'

const ActiveLink = ({ children, className = "", activeClassName = "active", ...props }) => {
  const { asPath } = useRouter()

  const computedClassName =
    asPath === props.href || asPath === props.as
      ? `${className} ${activeClassName}`.trim()
      : className

  return (
    <Link {...props}>
      <a className={computedClassName}>{children}</a>
    </Link>
  )
}

export default ActiveLink