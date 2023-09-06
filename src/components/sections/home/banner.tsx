import Image from 'next/image'

export default function Banner() {
  return (
    <div className="relative w-full h-128">
      <Image
        src="/images/bowman.jpg"
        fill={true}
        alt="Banner Image"
        className="object-cover bg-gray-900"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-5xl font-bold tracking-wider">Theta Tau</h1>
        <h2 className="text-3xl font-medium tracking-widest">
          Lambda Gamma Chapter
        </h2>
      </div>
    </div>
  )
}
