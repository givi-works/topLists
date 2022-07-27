import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'

export default function Header() {
    const { data: session } = useSession()
    
    return (
        <header className="flex justify-between bg-teal-800 text-white md:py-3 md:px-2 items-center shadow-lg shadow-gray-300 text-lg md:mb-6 mb-3">
            <Link href='/'>Site Title</Link>
            <nav> 
                <ul className="flex flex-col md:flex-row">
                    <Link href='/lists'>
                                <li className="md:px-2 cursor-pointer">Lists</li>    
                    </Link> 
                    {session && (
                        <>
                            <Link href='/account/profile'>
                                <li className="md:px-2 cursor-pointer">Profile</li>    
                            </Link> 
                            
                                <li onClick={() => signOut()} className="md:px-2 cursor-pointer flex items-center"><FaSignOutAlt />LogOut</li>    
                            
                        </>
                    )}
                    {!session && (
                        <>
                            <Link href='/account/login'>
                                <li className="md:px-2 cursor-pointer flex items-center"><FaSignInAlt />Login</li>    
                            </Link>   
                            <Link href='/account/register'>
                                <li className="md:px-2 cursor-pointer">Register</li>    
                            </Link>   
                        </>
                    )}
                    
                </ul> 
            </nav>
        </header>
    )
}