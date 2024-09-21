import BackButton from '@/components/back-button';
import IpDataTable from '@/components/ip-addresses/data-table';
import IpAddress from '@/interfaces/ip-address';


const getData = async (): Promise<IpAddress[]> => {
  let res = await fetch('https://mocki.io/v1/7527db3f-831a-4f94-8b3c-dc9da016df29')
  return await res.json()
}

const IpAddresses = async () => {
  const data = await getData();

  return (
    <>
      <BackButton text='Back' link='/' />
      <div className="container mx-auto py-10">
        <IpDataTable params={{data}}/>
      </div>
    </>
  );
};

export default IpAddresses;
