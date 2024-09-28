import { getAuthUserToken } from '@/app/actions/auth-actions';
import BackButton from '@/components/back-button';
import AuditLogDataTable from '@/components/logs/data-table';
import AuditLog from '@/interfaces/audit-log';
import { cookies } from 'next/headers';


const getData = async (): Promise<AuditLog[]> => {
  const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/ip-service/v1/ip-audit`,  {
    headers: {
      Authorization: `Bearer ${await getAuthUserToken()}`,
      'X-AT-Session': `${cookies().get('at_session')?.value}`,
    },
  })
  return await res.json()
}

const AuditLogPage = async () => {
  const data = await getData();

  return (
    <>
      <BackButton text='Back' link='/' />
      <div className="container mx-auto py-10">
        <AuditLogDataTable params={{data}}/>
      </div>
    </>
  );
};

export default AuditLogPage;
