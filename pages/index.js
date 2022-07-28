import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import ItemCard from "../components/ItemCard"
import Layout from '../components/Layout'


export default function Home( { items } ) {
  const [searchData, setSearchData] = useState([])
  const searchLiveValue = useRef()
  const router = useRouter()
  const handleInputChange = () => {
    const val = searchLiveValue.current.value
    if(val.length > 2){
      const filteredData = items.filter((item) => item.title.toLowerCase().includes(val.toLowerCase()))
      setSearchData(filteredData)
    } else{ 
      setSearchData([])
    }
  }
  return (
    <Layout>
      <div className='max-w-lg border-2 border-emerald-300 rounded-md m-auto px-6 py-4 shadow-cyan-500/50 shadow-md'> 
        <div className="flex flex-col items-center">
        <input 
          onChange={() => handleInputChange()} 
          className='px-2 py-3 border-2 '
          ref={searchLiveValue} 
          type='text' 
          placeholder="Seach anything you want..."
        />
          <div className=""> 
            {searchData && searchData.map(item => {
              return(
                <div key={item._id} onClick={() => router.push(`/lists/${item.slug}`)} className='cursor-pointer'>
                  <ItemCard data={item} />
                </div>
              )
            })}
          </div>
        </div> 
      </div> 
    </Layout>
  )
}

export async function getServerSideProps(context){ 
  const session = await getSession(context)
  const res = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/lists`)
  const items = await res.json()
  return{
    props: { 
      session,
      items,
    }
  }
}
