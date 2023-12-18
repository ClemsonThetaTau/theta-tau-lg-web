import Image from 'next/image'

const Banner = () => {
  return (
    <div className="relative w-full h-96">
      <Image
        src="/images/banners/formal-group-photo.jpg"
        fill={true}
        alt="Banner Image"
        className="object-cover bg-gray-900"
      />
    </div>
  )
}

export default Banner
