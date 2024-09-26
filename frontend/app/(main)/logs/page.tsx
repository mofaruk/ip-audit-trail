import { getAuthUserToken } from '@/app/actions/auth-actions';
import BackButton from '@/components/back-button';
import AuditLogDataTable from '@/components/logs/data-table';
import AuditLog from '@/interfaces/audit-log';


const getData = async (): Promise<AuditLog[]> => {
  const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/ip-service/v1/ip-audit`,  {
    headers: {
      Authorization: `Bearer ${await getAuthUserToken()}`,
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
