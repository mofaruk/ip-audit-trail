import { fetchIpAddress } from '@/app/actions/ip-address-actions';
import IpForm from '@/components/ip-addresses/ip-form';

interface IpAddressEditPageProps {
  params: {
    id: string;
  };
}

const IpAddressEditPage = async ({ params }: IpAddressEditPageProps) => {

  const data = await fetchIpAddress(params.id)

  const updateParams = {
    id: params.id,
    formType: 'edit',
    data: data
  };
  return (
    <IpForm params={updateParams}/>
  );
};

export default IpAddressEditPage;
