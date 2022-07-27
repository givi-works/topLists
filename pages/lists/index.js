import { useRouter } from "next/router";
import { useState } from "react";
import ItemCard from "../../components/ItemCard";
import Layout from "../../components/Layout";

export default function ListsPage({data}) {
    const firstPage = data.slice(0,5)
    const [listItems, setListItems] = useState(firstPage)
    const router = useRouter()
    const handleLoadMore = () => { 
        const newLength = listItems.length + 5
        const loaded = data.slice(0,newLength)
        setListItems(loaded)
    }
    return (
        <Layout> 
            <div className="max-w-xl border-2 border-emerald-300 rounded-md m-auto px-6 py-4 shadow-cyan-500/50 shadow-md"> 
            {
                listItems.map(list => { 
                    return(
                        <div key={list._id} onClick={() => router.push(`/lists/${list.slug}`)} className='cursor-pointer'>
                            <ItemCard data={list} />
                        </div>
                    )
                })
            }
            <button onClick={() => handleLoadMore()} className='border-2 px-2 py-1'>Load more</button>
            </div>
        </Layout>
    )
}

export async function getStaticProps(){ 
    const res = await fetch("http://localhost:3000/api/lists")
    const data = await res.json()
    return{
        props: {data}
    }
}