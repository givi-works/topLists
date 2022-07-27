import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function FullItemCard( {data, handleVote} ) {
    const { data: session } = useSession()
    const [ like, setLike ] = useState("Like")
    const [likeOrLikes, setLikeOrLikes] = useState("Likes")
    const [ buttonStyle, setButtonStyle ] = useState("border-2 bg-emerald-500 text-white px-2 py-1 rounded border-none")
    let email;
    if(session){ 
        email = session.user.email
    } else { 
        email = null;
    }
    useEffect(() => {
        const checker = data.voted.some(e => e.email == email )
        if(data.votes < 2){ 
            setLikeOrLikes("Like")
        }
        if(checker){
            setLike("Liked")
            setButtonStyle("border-2 bg-orange-600 text-white px-2 py-1 rounded border-none")
        }
    }, [])

    return (
        <div className="border-2 border-emerald-300 my-3 rounded px-2 py-2 flex items-center justify-between">
            <Image src={data.image} width={50} height={50} />
            <div className="ml-3">
                {data.name}
            </div>
            <div> 
                <span className="mr-2">{data.votes} {likeOrLikes}</span> 
                <button 
                    className={buttonStyle}
                    onClick={() => {
                        session ? handleVote(data.name) : toast.error("Please login to vote");
                        if(session){
                            setLike("Liked");
                            setButtonStyle("border-2 bg-orange-600 text-white px-2 py-1 rounded border-none")
                        }
                    }}
                    >{like}</button> 
            </div>
        </div>
  )
}
