import BackButton from '@/components/back-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAuthUserToken } from '@/app/actions/auth-actions';
import { cookies } from 'next/headers';
import IpAddress from '@/interfaces/ip-address';


const getData = async (id: string): Promise<IpAddress> => {
  const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/ip-service/v1/ip/${id}`,  {
    headers: {
      Authorization: `Bearer ${await getAuthUserToken()}`,
      'X-AT-Session': `${cookies().get('at_session')?.value}`,
    },
  })
  return await res.json()
}

type IpAddressViewPageProps = {
  params: {
    id: string
  }
}

const IpAddressViewPage = async ({params}: IpAddressViewPageProps) => {
  const data: IpAddress = await getData(params.id);

  return (
    <>
      <BackButton text='Back' link='/' />
      <div className="container mx-auto py-5">
        <Card className="w-full md:w-2/3 mx-auto">
          <CardHeader>
            <CardTitle>IP Address Detail</CardTitle>
            <CardDescription>ID: {params.id}</CardDescription>
          </CardHeader>
          <CardContent>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200 mx-auto">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      IP
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.ip}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Label
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.label}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Comment
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.comment}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Created By
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.user_id}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Created At
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.created_at} 
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Updated At
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.updated_at} 
                    </dd>
                </div>
            </dl>
        </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default IpAddressViewPage;
