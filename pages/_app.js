import '../styles/globals.css'
import Link from 'next/link'
import "./app.css"

function MyMarketPlace({Component, pageProps}){
  return (
  <div>
    <nav className='border-b p-6' style={{backgroundColor: 'black'}}>
      <div className='flex text-white'>
      {/* <span className='font-bold text-white mr-4 justify-items-start'>MyMarketPlace</span> */}
        <Link href='/'>
          <a className='mr-4 font-bold'>
            Main MarketPlace
          </a>
        </Link>
        <Link href='/mint-item'>
          <a className='mr-4'>
            Mint Token
          </a>
        </Link>
        <Link href='/'>
          <a className='mr-4'>
            My Nfts
          </a>
        </Link>
        <Link href='/dashboard'>
          <a className='mr-4'>
            Account Dashboard
          </a>
        </Link>
      </div>
    </nav>
    <Component {...pageProps}/> 
  </div>
  )
}

export default MyMarketPlace
