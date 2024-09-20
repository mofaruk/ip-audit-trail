import IpTable from '@/components/ip-addresses/ip-table';
import BackButton from '@/components/back-button';
import IpPagination from '@/components/ip-addresses/ip-pagination';

const IpAddresses = () => {
  return (
    <>
      <BackButton text='Back' link='/' />
      <IpTable
        title='IP Addresses'
        limit={10}
      />
      <IpPagination />
    </>
  );
};

export default IpAddresses;
