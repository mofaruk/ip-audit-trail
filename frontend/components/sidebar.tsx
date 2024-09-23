import { getAuthUser } from '@/app/actions/auth-actions';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  LayoutDashboard,
  EthernetPort,
  FileClock,
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = async () => {

  const user = await getAuthUser();

  return (
    <Command className='bg-secondary rounded-none'>
      <CommandList>
        <CommandGroup>
          <CommandItem>
            <LayoutDashboard className='mr-2 h-4 w-4' />
            <Link href='/'>Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <EthernetPort className='mr-2 h-4 w-4' />
            <Link href='/ip-addresses'>IP Addresses</Link>
          </CommandItem>
          {user?.role == 'admin' && 
          <CommandItem>
            <FileClock className='mr-2 h-4 w-4' />
            <Link href='/logs'>Audit Log</Link>
          </CommandItem>
          }
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;