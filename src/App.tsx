import { useState } from 'react'
import clsx from 'clsx'
import HocPhanDoan from './modules/HocPhanDoan/HocPhanDoan';
import OnTungCau from './modules/OnTungCau/OnTungCau';
import DienKhuyet from './modules/DienKhuyet/DienKhuyet';

function App() {
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <div className='position-absolute inset-0 bg-white dark:bg-slate-700'>
        <div id="kn-main-nav" className='shadow sticky'>
          <div className='px-6 py-2 h-16 flex items-center justify-between dark:border-b container mx-auto'>
            <div className='flex items-center justify-between space-x-2'>

            </div>
            <div className='hidden lg:flex items-center justify-between space-x-2'>
              <div>
                <button type='button' onClick={() => setPage(1)} className={clsx('capitalize inline-flex justify-center items-center rounded-lg text-sm font-semibold py-3 px-4 text-slate-900 dark:text-white ring-1 ring-slate-900/10 hover:bg-gray-300 hover:ring-slate-900/15 hover:text-slate-900', {
                  "bg-sky-600 text-white": page === 1
                })}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-stack"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /><path d="M5 21h14" /><path d="M5 18h14" /><path d="M5 15h14" /></svg>
                  <span className='ms-2'>Ôn từng câu</span>
                </button>
              </div>
              <div>
                <button type='button' onClick={() => setPage(2)} className={clsx('capitalize inline-flex justify-center items-center rounded-lg text-sm font-semibold py-3 px-4 text-slate-900 dark:text-white ring-1 ring-slate-900/10 hover:bg-gray-300 hover:ring-slate-900/15', {
                  "bg-sky-600 text-white": page === 2
                })}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brackets-contain"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 4h-4v16h4" /><path d="M17 4h4v16h-4" /><path d="M8 16h.01" /><path d="M12 16h.01" /><path d="M16 16h.01" /></svg>
                  <span className='ms-2'>Điền khuyết</span>
                </button>
              </div>
              <div>
                <button type='button' onClick={() => setPage(3)} className={clsx('capitalize inline-flex justify-center items-center rounded-lg text-sm font-semibold py-3 px-4 text-slate-900 dark:text-white ring-1 ring-slate-900/10 hover:bg-gray-300 hover:ring-slate-900/15', {
                  "bg-sky-600 text-white": page === 3
                })}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-wallpaper"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-12" /><path d="M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M8 18v-12a2 2 0 1 0 -4 0v12" /></svg>
                  <span className='ms-2'>Thi thiên 107:1-43</span>
                </button>
              </div>
            </div>
            <button className={clsx('justify-center items-center rounded-lg text-sm font-semibold py-3 px-4 text-white ring-1 ring-slate-900/10 bg-sky-600 hover:bg-sky-800 hover:ring-slate-900/15 inline-flex lg:hidden')} onClick={() => setOpenMenu(!openMenu)}>
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 8l16 0" />
                <path d="M4 16l16 0" />
              </svg>
            </button>
          </div>

          {
            openMenu ?
              (
                <div className='flex flex-col dark:divide-y border-b'>
                  <div>
                    <button type='button' onClick={() => setPage(1)} className={clsx('w-full capitalize inline-flex justify-center items-center text-sm font-semibold py-3 px-4 text-slate-900 dark:text-white ring-1 ring-slate-900/10 hover:ring-slate-900/15', {
                      "bg-sky-600 text-white": page === 1
                    })}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-stack"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /><path d="M5 21h14" /><path d="M5 18h14" /><path d="M5 15h14" /></svg>
                      <span className='ms-2'>Ôn từng câu</span>
                    </button>
                  </div>
                  <div>
                    <button type='button' onClick={() => setPage(2)} className={clsx('w-full capitalize inline-flex justify-center items-center text-sm font-semibold py-3 px-4 text-slate-900 dark:text-white ring-1 ring-slate-900/10 hover:ring-slate-900/15', {
                      "bg-sky-600 text-white": page === 2
                    })}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brackets-contain"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 4h-4v16h4" /><path d="M17 4h4v16h-4" /><path d="M8 16h.01" /><path d="M12 16h.01" /><path d="M16 16h.01" /></svg>
                      <span className='ms-2'>Điền khuyết</span>
                    </button>
                  </div>
                  <div>
                    <button type='button' onClick={() => setPage(3)} className={clsx('w-full capitalize inline-flex justify-center items-center text-sm font-semibold py-3 px-4 text-slate-900 dark:text-white ring-1 ring-slate-900/10 hover:ring-slate-900/15', {
                      "bg-sky-600 text-white": page === 3
                    })}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-wallpaper"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-12" /><path d="M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M8 18v-12a2 2 0 1 0 -4 0v12" /></svg>
                      <span className='ms-2'>Thi thiên 107:1-43</span>
                    </button>
                  </div>
                </div>
              )
              : null
          }

        </div>
        <div id='kn-main-body'>
          {page === 1 ? (
            <OnTungCau />
          ) : page === 2 ? (
            <DienKhuyet />
          ) :
            page === 3 ? (
              <HocPhanDoan />
            ) : null
          }
        </div>

        <footer className='p-6 container mx-auto'>
          Copyright &copy; {new Date().getFullYear()} Kỳ Nguyễn.
        </footer>
      </div >
    </>
  )
}

export default App
