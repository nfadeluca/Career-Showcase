import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle} className="transform transition duration-200 hover:scale-105 hover:text-primary-500 dark:hover:text-primary-500 active:scale-95 active:text-primary-700">
          <div className="flex items-center justify-between">
            <div className="mr-3">{/* <Logo /> */}</div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-8 text-4xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-8 leading-5 sm:space-x-10">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link, index, arr) => (
            <Link
              key={link.title}
              href={link.href}
              className={`hidden text-xl font-medium sm:block transform transition duration-200 hover:scale-105 hover:text-primary-500 dark:hover:text-primary-500 active:scale-95 active:text-primary-700 ${index === arr.length - 1 ? 'text-primary-600 animate-pulsate' : 'text-gray-900 dark:text-gray-100'
                }`}
            >
              {link.title}
            </Link>
          ))}
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
