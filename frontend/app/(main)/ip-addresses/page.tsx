import { getAuthUserToken } from '@/app/actions/auth-actions';
import BackButton from '@/components/back-button';
import IpDataTable from '@/components/ip-addresses/data-table';
import { Button } from '@/components/ui/button';
import IpAddress from '@/interfaces/ip-address';
import { cookies } from 'next/headers';
import Link from 'next/link';


const getData = async (): Promise<IpAddress[]> => {
  let res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/ip-service/v1/ip`,  {
    headers: {
      Authorization: `Bearer ${await getAuthUserToken()}`,
      'X-AT-Session': `${cookies().get('at_session')?.value}`,
    },
  })

  if (!res.ok)
    return []
  return await res.json()
}

const IpAddresses = async () => {
  const data = await getData();

  return (
    <>
      <BackButton text='Back' link='/' />
      <div className="flex justify-between">
        <h3 className='text-2xl mb-4'> IP Address</h3>
        <Button>
          <Link href='/ip-addresses/create'>Add new</Link>
        </Button>
      </div>
      <div className="container mx-auto py-10">
        <IpDataTable params={{data}}/>
      </div>
    </>
  );
};

export default IpAddresses;
