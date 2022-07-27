import Link from 'next/link'
import { useRef } from 'react'
import { FaUser } from 'react-icons/fa'
import { getSession, signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const email = useRef()
  const password = useRef()
  const router = useRouter()
  async function handleSubmit(e){ 
    e.preventDefault()
    try {
      await signIn('credentials', {
        redirect: false, 
        email: email.current.value,
        password: password.current.value,
      })
      toast.success("Welcome!!")
      router.replace('/account/profile')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className='max-w-lg border-2 border-emerald-300 rounded-md m-auto px-6 py-4 shadow-cyan-500/50 shadow-md'> 
        <span className='flex items-center mb-3'> 
          <FaUser />
          <h3 className='ml-3 text-2xl'>Log In</h3>
        </span>
        <form onSubmit={handleSubmit} className='flex flex-col mb-2'> 
          <div className='mb-4'> 
            <label htmlFor='email'>Email Address</label>
            <input 
              type='email'
              id='email'
              ref={email}
              className='border-4 w-full'
            /> 
          </div>
          <div className='mb-4'> 
            <label htmlFor='password'>Password</label>
            <input 
              type='password'
              id='password'
              ref={password}
              className='border-4 w-full'
            /> 
          </div>
          <div>
            <input 
                type='submit'
                value='Login'
                className='w-full bg-teal-800 text-white rounded py-1 cursor-pointer'
            />  
          </div> 
        </form>
        <span>
          Don't have an account? <Link href='/account/register'>Register</Link>
        </span>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context){ 
  const session = await getSession(context)
  if(session){ 
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props:{},
    };
  }
  return {
    props: { 
      session
    }
  }
}