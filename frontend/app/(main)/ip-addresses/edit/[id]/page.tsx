import IpForm from '@/components/ip-addresses/ip-form';

interface IpAddressEditPageProps {
  params: {
    id: string;
  };
}

const IpAddressEditPage = ({ params }: IpAddressEditPageProps) => {
  const updateParams = {
    id: params.id,
    formType: 'edit',
  };
  return (
    <IpForm params={updateParams}/>
  );
};

export default IpAddressEditPage;
