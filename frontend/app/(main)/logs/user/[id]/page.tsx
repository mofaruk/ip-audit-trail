import { getAuthUserToken } from '@/app/actions/auth-actions';
import BackButton from '@/components/back-button';
import AuditLogDataTable from '@/components/logs/data-table';
import AuditLog from '@/interfaces/audit-log';
import IpAddress from '@/interfaces/ip-address';
import { cookies } from 'next/headers';


const getData = async (userId: number): Promise<AuditLog[]> => {
  const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/ip-service/v1/ip-audit/user/${userId}`,  {
    headers: {
      Authorization: `Bearer ${await getAuthUserToken()}`,
      'X-AT-Session': `${cookies().get('at_session')?.value}`,
    },
  })
  return await res.json()
}

type AuditLogByUserPageProps = {
    params: {
        id: number
    }
}

const AuditLogByUserPage = async ({params}: AuditLogByUserPageProps) => {
  const data = await getData(params.id);

  return (
    <>
      <BackButton text='Back' link='/logs' />
      <div className="container mx-auto py-10">
        <AuditLogDataTable params={{data}}/>
      </div>
    </>
  );
};

export default AuditLogByUserPage;
