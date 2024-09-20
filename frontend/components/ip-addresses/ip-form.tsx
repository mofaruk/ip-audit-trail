'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import BackButton from '@/components/back-button';
import IpAddress from '@/interfaces/ip-address';
import { ipFormSchema } from '@/schemas/ip-form-schema';
import { useState, useEffect } from 'react';


type IpFormData = z.infer<typeof ipFormSchema>

interface IpFormProps {
  params: {
    id: string | null;
    formType: string;
  };
}

const IpForm = ({ params }: IpFormProps) => {
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<IpFormData | null>(null);

  // Fetch user data (mock example)
  useEffect(() => {
    async function fetchIpAddress() {
      // Simulate fetching data from an API
      const data = await fetch('https://mocki.io/v1/30118c02-2fde-4723-93a2-66b84ac162a1').then((res) => res.json());
      setInitialValues(data);
      setLoading(false);
    }

    if (params.formType == 'edit') {
      fetchIpAddress();
    }
  }, []);

  const form = useForm<IpFormData>({
    resolver: zodResolver(ipFormSchema),
    defaultValues: {
      ip: '',
      label: '',
      comment: '',
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);  // Set form values when data is loaded
    }
  }, [initialValues, form.reset]);

  const { toast } = useToast();
  const onSubmit = (data: IpFormData) => {
    console.log('Form submitted with data:', data);
    const title = params.formType == 'edit'
      ? 'IP Address has been updated successfully'
      : 'IP Address has been created successfully'

    toast({
      title: title,
      description: `Updated by --- `,
    });
  };


  return (
    <>
      <BackButton text='Back' link='/ip-addresses' />
      <h3 className='text-2xl mb-4'>{params.formType == 'edit' ? 'Edit' : 'Create'} IP Address</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='ip'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  IP
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='IP'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='label'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Label
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Label'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='comment'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Comment
                </FormLabel>
                <FormControl>
                  <Textarea
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Comment'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-full dark:bg-slate-800 dark:text-white'>
            {params.formType == 'edit' ? 'Update' : 'Create'}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default IpForm;
