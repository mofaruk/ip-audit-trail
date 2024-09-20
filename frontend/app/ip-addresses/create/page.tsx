import IpForm from '@/components/ip-addresses/ip-form';


const IpAddressEditPage = () => {
  const updateParams = {
    id: null,
    formType: 'create',
  };
  return (
    <IpForm params={updateParams}/>
  );
};

export default IpAddressEditPage;
