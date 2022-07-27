import { getSession, useSession } from "next-auth/react"
import Layout from "../../components/Layout"

export default function ProfilePage() {
  const { data: session } = useSession()
  return (
      <Layout> 
        <div className='max-w-lg border-2 border-emerald-300 rounded-md m-auto px-6 py-4 shadow-cyan-500/50 shadow-md flex flex-col items-center'> 
          <span>My email address is</span>
          <span>{session.user.email}</span>
        </div>
      </Layout>
    )
  }
  
export async function getServerSideProps(context){ 
  const session = await getSession(context)
  if(!session){ 
    return {
      redirect: {
        permanent: false,
        destination: "/account/login",
      },
      props:{},
    };
  }
  return{ props: { session } }
}