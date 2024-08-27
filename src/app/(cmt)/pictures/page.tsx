import dynamic from 'next/dynamic'

const ProfilePictureClient = dynamic(() => import('./profile-picture-client'), { ssr: false });

export default function Page() {
  return <ProfilePictureClient />;
}
