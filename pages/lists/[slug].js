import axios from "axios"
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { toast } from "react-toastify"
import FullItemCard from "../../components/FullItemCard"
import Layout from "../../components/Layout"


export default function SingleListPage({data}) {
  const { data: session } = useSession()
  const [items, setItems] = useState(data.items)
  const router = useRouter()
  let email;
  if(session){ 
    email = session.user.email
  } else { 
    email = null;
  }

  const handleVote = async (name) => { 
    try {
      await axios.put(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/lists/${router.query.slug}`, { name, email })
      console.log("done")
      const newData = await axios.get(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/lists/${router.query.slug}`)
      setItems(newData.data.items)
    } catch (error) {
      toast.error("You have already liked this one")
    }
  }
  return (
    <Layout> 
            <div className="max-w-xl border-2 border-emerald-300 rounded-md m-auto px-6 py-4 shadow-cyan-500/50 shadow-md">
            <h1 className="text-3xl">{data.title}</h1> 
            {
                items.map(single => { 
                    return(
                        <div key={single._id}>
                          <FullItemCard data={single} handleVote={handleVote} />
                        </div>
                    )
                })
            }
            </div>
        </Layout>
  )
}

export async function getServerSideProps(context){ 
  const session = await getSession(context)
  const res = await fetch(`http://localhost:3000/api/lists/${context.query.slug}`)
  const data = await res.json()
  return{
    props: {
      data,
      session
    }
  }
}
