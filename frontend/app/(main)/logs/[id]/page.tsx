import BackButton from '@/components/back-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AuditLog from '@/interfaces/audit-log';
import { getAuthUserToken } from '@/app/actions/auth-actions';
import { cookies } from 'next/headers';


const getData = async (id: string): Promise<AuditLog> => {
  const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/ip-service/v1/ip-audit/${id}`,  {
    headers: {
      Authorization: `Bearer ${await getAuthUserToken()}`,
      'X-AT-Session': `${cookies().get('at_session')?.value}`,
    },
  })
  return await res.json()
}

type AuditLogPageProps = {
  params: {
    id: string
  }
}

const AuditLogPage = async ({params}: AuditLogPageProps) => {
  const data: AuditLog = await getData(params.id);

  return (
    <>
      <BackButton text='Back' link='/' />
      <div className="container mx-auto py-5">
        <Card className="w-full md:w-2/3 mx-auto">
          <CardHeader>
            <CardTitle>Change Detail</CardTitle>
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
                      Modified By
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.modified_by}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Event
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.event}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Session ID
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.session_id}
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
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Changes
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <pre>
                        {JSON.stringify(data.changes, null, '\t')}
                      </pre>
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

export default AuditLogPage;
