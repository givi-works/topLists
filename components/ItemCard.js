import Image from "next/image"

export default function ItemCard( {data} ) {
  return (
    <div className="border-2 border-emerald-300 my-3 rounded px-2 py-2 flex items-center ">
        <Image src={data.poster} width={50} height={50} />
        <div className="ml-3">
            {data.title}
        </div> 
    </div>
  )
}
