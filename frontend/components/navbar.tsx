import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/images/logo.png';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from './logout-button';


const Navbar = () => {
  return (
    <nav className='bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between sticky top-0 z-50'>
      <Link href='/'>
        <Image src={logo} alt='Logo' width={40} />
      </Link>

      <div className='flex items-center'>
        <DropdownMenu>
          <DropdownMenuTrigger className='focus:outline-none'>
            <Avatar>
              <AvatarImage src='https://github.com/mofaruk.png' alt='@mofaruk' />
              <AvatarFallback className='text-black'>MO</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href='/profile'>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogoutButton/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;