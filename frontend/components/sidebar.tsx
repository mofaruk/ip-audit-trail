import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  LayoutDashboard,
  EthernetPort,
  FileClock,
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
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
            <Link href='/ip'>IP</Link>
          </CommandItem>
          <CommandItem>
            <FileClock className='mr-2 h-4 w-4' />
            <Link href='/logs'>Audit Log</Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;