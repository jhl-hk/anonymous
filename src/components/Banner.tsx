import {XMarkIcon} from '@heroicons/react/20/solid'

export default function Banner() {
  return (
    <>
      {/*
        Make sure you add some bottom padding to pages that include a sticky banner like this to prevent
        your content from being obscured when the user scrolls to the bottom of the page.
      */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:px-6 sm:pb-5 lg:px-8">
        <div
          className="pointer-events-auto flex items-center justify-between gap-x-6 bg-gray-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
          <p className="text-sm/6 text-white">
            <a href="#">
              <strong className="font-semibold">JHL-HK</strong>
              <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
                <circle r={1} cx={1} cy={1}/>
              </svg>
              <span>Still Developing.</span>
            </a>
          </p>
          <button type="button" className="-m-3 flex-none p-3 focus-visible:outline-offset-[-4px]">
            <span className="sr-only">Dismiss</span>
            <XMarkIcon aria-hidden="true" className="size-5 text-white"/>
          </button>
        </div>
      </div>
    </>
  )
}
