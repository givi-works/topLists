import axios from 'axios'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'



export default function RegisterPage() {
  const email = useRef()
  const password = useRef()
  const passwordConfirm = useRef()
  const username = useRef()
  const router = useRouter()
  const handleSubmit = async (e) => { 
    e.preventDefault()
    if (password.value !== passwordConfirm.value){ 
      toast.error("Passwords do not match")
      return
    }
    try {
      await axios.post("http://localhost:3000/api/auth/signup", {
        email: email.current.value,
        username: username.current.value, 
        password: password.current.value
      })
      toast.success("Registration Completed. Please Log in.")
      router.replace('/account/login')
    } catch (error) {
      toast.error("Please check details")
    }
  }

  return (
    <Layout> 
      <div className='max-w-lg border-2 border-emerald-300 rounded-md m-auto px-6 py-4 shadow-cyan-500/50 shadow-md'> 
        <span className='flex items-center mb-3'> 
          <FaUser />
          <h3 className='ml-3 text-2xl'>Register new account</h3>
        </span>
        <form onSubmit={handleSubmit} className='flex flex-col mb-2'> 
        <div className='mb-4'> 
            <label htmlFor='username'>Username</label>
            <input 
              type='text'
              id='username'
              ref={username}
              className='border-4 w-full'
            /> 
          </div>
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
          <div className='mb-4'> 
            <label htmlFor='passwordConfirm'>Confirm password</label>
            <input 
              type='password'
              id='passwordConfirm'
              ref={passwordConfirm}
              className='border-4 w-full'
            /> 
          </div>
          <div>
            <input 
                type='submit'
                value='Register'
                className='w-full bg-teal-800 text-white rounded py-1 cursor-pointer'
            />  
          </div> 
        </form>
        <span>
          Already have an account? <Link href='/account/login'>Login</Link>
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