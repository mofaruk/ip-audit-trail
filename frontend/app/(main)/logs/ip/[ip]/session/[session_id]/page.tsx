import BackButton from '@/components/back-button';
import AuditLogDataTable from '@/components/logs/data-table';
import IpAddress from '@/interfaces/ip-address';


const getData = async (): Promise<IpAddress[]> => {
  let res = await fetch('https://mocki.io/v1/3a4edc42-a94d-411a-8b3f-d173ac353152')
  return await res.json()
}

const AuditLogPage = async () => {
  const data = await getData();

  return (
    <>
      <BackButton text='Back' link='/' />
      <div className="container mx-auto py-10">
        log of a ip in a session
      </div>
    </>
  );
};

export default AuditLogPage;
