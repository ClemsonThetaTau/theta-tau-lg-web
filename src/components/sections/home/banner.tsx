import Image from 'next/image'

export default function Banner() {
  return (
    <div className="relative w-full h-128">
      <Image
        src="/images/banners/home-page.jpg"
        fill={true}
        alt="Banner Image"
        className="object-cover bg-gray-900"
      />
      <div className="absolute font-hiatus font-bold inset-0 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-8xl drop-shadow-2xl-dark tracking-wider">THETA TAU</h1>
        <h2 className="text-6xl drop-shadow-2xl-dark tracking-widest">
          LAMBDA GAMMA CHAPTER
        </h2>
        <h3 className="text-4xl italic drop-shadow-2xl-dark tracking-widest">
          CLEMSON, SC
        </h3>
      </div>
    </div>
  )
}
