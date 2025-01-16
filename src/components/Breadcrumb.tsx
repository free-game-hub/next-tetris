import { Link } from '@/i18n/routing'
import { HouseIcon } from 'lucide-react'

type BreadcrumbItem = {
  label: string
  href?: string
}
const maxLabelLength = 16

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            <HouseIcon className='w-4 h-4'/>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="text-muted-foreground/50">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition-colors">
                {item.label.length > maxLabelLength ? item.label.slice(0, maxLabelLength) + '...' : item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label.length > maxLabelLength ? item.label.slice(0, maxLabelLength) + '...' : item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
} 