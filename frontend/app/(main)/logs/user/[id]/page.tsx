import BackButton from '@/components/back-button';
import AuditLogDataTable from '@/components/logs/data-table';
import AuditLog from '@/interfaces/audit-log';
import IpAddress from '@/interfaces/ip-address';


const getData = async (): Promise<AuditLog[]> => {
  let res = await fetch('https://mocki.io/v1/3a4edc42-a94d-411a-8b3f-d173ac353152')
  return await res.json()
}

type AuditLogByUserPageProps = {
    params: {
        id: string
    }
}

const AuditLogByUserPage = async ({params}: AuditLogByUserPageProps) => {
  const data = await getData();

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
