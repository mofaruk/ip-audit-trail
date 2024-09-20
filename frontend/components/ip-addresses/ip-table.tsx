'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import Link from 'next/link';
import IpAddress from '@/interfaces/ip-address';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Edit, Eye, PlusCircle, Trash } from 'lucide-react';

interface IpTableProps {
  limit?: number;
  title?: string;
}

const IpTable = ({ limit, title }: IpTableProps) => {
  const [ipAddresses, setIpAddresses] = useState(null)

  useEffect(() => {
    async function fetchIpAddresses() {
      let res = await fetch('https://mocki.io/v1/7527db3f-831a-4f94-8b3c-dc9da016df29')
      let data = await res.json()
      setIpAddresses(data)
      console.log(data)
    }
    fetchIpAddresses()
  }, [])

  if (!ipAddresses) {
    return <div>Loading...</div>
  }

  return (
    <div className='mt-10'>
      <div className="flex justify-between">
        <h3 className='text-2xl mb-4 font-semibold'>{title ? title : 'Resource'}</h3>
        <Button asChild>
          <Link href={`/ip-addresses/create`}>
            <PlusCircle size={16} /> Add New
          </Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>IP</TableHead>
            <TableHead className='hidden md:table-cell'>Label</TableHead>
            <TableHead className='hidden md:table-cell'>Comment</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ipAddresses.map((ip) => (
            <TableRow key={ip.id}>
              <TableCell>{ip.ip}</TableCell>
              <TableCell className='hidden md:table-cell'>
                {ip.label}
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                {ip.comment}
              </TableCell>
              <TableCell className='flex flex-row gap-1'>
                <Button asChild variant='outline'>
                  <Link href={`/ip-addresses/view/${ip.id}`}>
                    <Eye size={16} /> View
                  </Link>
                </Button>

                <Button asChild variant='outline'>
                  <Link href={`/ip-addresses/edit/${ip.id}`}>
                    <Edit size={16} /> Edit
                  </Link>
                </Button>

                <Button variant='destructive'>
                  <Trash size={16} /> Delete
                </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IpTable;