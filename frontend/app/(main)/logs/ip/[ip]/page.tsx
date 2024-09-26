import { getAuthUserToken } from '@/app/actions/auth-actions';
import BackButton from '@/components/back-button';
import AuditLogDataTable from '@/components/logs/data-table';
import AuditLog from '@/interfaces/audit-log';


const getData = async (ip: string): Promise<AuditLog[]> => {
  const replacedIp = ip.replaceAll('.', '_')
  const res = await fetch(`${process.env.AUTH_MICROSERVICE_URL}/api/ip-service/v1/ip-audit/ip/${replacedIp}`,  {
    headers: {
      Authorization: `Bearer ${await getAuthUserToken()}`,
    },
  })
  return await res.json()
}

type AuditLogByIpPageProps = {
    params: {
        ip: string
    }
}

const AuditLogByIpPage = async ({params}: AuditLogByIpPageProps) => {
  const data = await getData(params.ip);

  return (
    <>
      <BackButton text='Back' link='/' />
      <div className="container mx-auto py-10">
        <AuditLogDataTable params={{data}}/>
      </div>
    </>
  );
};

export default AuditLogByIpPage;
