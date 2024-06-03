import Image from './Image';
import Link from './Link';

const Card = ({ title, description, imgSrcs, href }) => (
  <div className="p-4 md:w-1/2 md:max-w-[544px]">
    <div className="overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        {href && (
          <Link
            href={href}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            View on Github &rarr;
          </Link>
        )}
      </div>
      {imgSrcs && imgSrcs.length > 0 && (
        <div
          className={`grid gap-2 ${imgSrcs.length === 1
              ? 'grid-cols-1'
              : imgSrcs.length === 2
                ? 'grid-cols-2'
                : 'grid-cols-2'
            }`}
        >
          {imgSrcs.map((imgSrc, index) => (
            <div key={index} className="w-full">
              {href ? (
                <Link href={href} aria-label={`Link to ${title}`}>
                  <Image
                    alt={`${title} image ${index + 1}`}
                    src={imgSrc}
                    className="h-full w-full object-cover object-center"
                    width={544}
                    height={306}
                  />
                </Link>
              ) : (
                <Image
                  alt={`${title} image ${index + 1}`}
                  src={imgSrc}
                  className="h-full w-full object-cover object-center"
                  width={544}
                  height={306}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default Card;
