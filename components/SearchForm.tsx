'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { BedDoubleIcon, CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Calendar } from './ui/calendar';

export const formSchema = z.object({
  location: z.string().min(2).max(50),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  adults: z
    .string()
    .min(1, {
      message: 'Vui lòng chọn ít nhất 1 người lớn',
    })
    .max(12, { message: 'Tối đa 12 người lớn' }),
  children: z.string().min(0).max(12, {
    message: 'Tối đa 12 trẻ em',
  }),
  rooms: z.string().min(1, {
    message: 'Vui lòng chọn ít nhất 1 phòng',
  }),
});

function SearchForm() {
  const router = useRouter();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      dates: {
        from: today,
        to: tomorrow,
      },
      adults: '',
      children: '',
      rooms: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const checkin_monthday = values.dates.from.getDate().toString();
    const checkin_month = (values.dates.from.getMonth() + 1).toString();
    const checkin_year = values.dates.from.getFullYear().toString();
    const checkout_monthday = values.dates.to.getDate().toString();
    const checkout_month = (values.dates.to.getMonth() + 1).toString();
    const checkout_year = values.dates.to.getFullYear().toString();

    const checkin = `${checkin_year}-${checkin_month}-${checkin_monthday}`;
    const checkout = `${checkout_year}-${checkout_month}-${checkout_monthday}`;

    const url = new URL('https://www.booking.com/searchresults.html');
    url.searchParams.set('ss', values.location);
    url.searchParams.set('group_adults', values.adults);
    url.searchParams.set('group_children', values.children);
    url.searchParams.set('no_rooms', values.rooms);
    url.searchParams.set('checkin', checkin);
    url.searchParams.set('checkout', checkout);

    router.push(`/search?url=${url.href}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center space-x-0 space-y-4 rounded-lg lg:flex-row lg:max-w-6xl lg:mx-auto lg:space-x-2 lg:space-y-0'>
        <div className='grid w-full lg:max-w-sm items-center gap-1.5'>
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Bạn muốn đến đâu?' {...field} />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
        </div>

        <div className='grid w-full lg:max-w-sm flex-1 items-center gap-1.5'>
          <FormField
            control={form.control}
            name='dates'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id='date'
                        name='dates'
                        variant={'outline'}
                        className={cn(
                          'w-full lg:w-[300px] justify-start text-left font-normal',
                          !field.value.from && 'text-muted-foreground'
                        )}>
                        <CalendarIcon className='w-4 h-4 mr-3 opacity-50' />
                        {field.value?.from ? (
                          field.value?.to ? (
                            <>
                              {format(field.value?.from, 'LLL dd, y')} -{' '}
                              {format(field.value?.to, 'LLL dd, y')}
                            </>
                          ) : (
                            format(field.value?.from, 'LLL dd, y')
                          )
                        ) : (
                          <span>Chọn ngày của bạn</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      initialFocus
                      mode='range'
                      selected={field.value}
                      defaultMonth={field.value.from}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
        </div>

        <div className='flex items-center w-full space-x-2'>
          <div className='grid items-center flex-1'>
            <FormField
              control={form.control}
              name='adults'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormControl>
                    <Input type='number' placeholder='Người lớn' {...field} />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>

          <div className='grid items-center flex-1'>
            <FormField
              control={form.control}
              name='children'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormControl>
                    <Input type='number' placeholder='Trẻ em' {...field} />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>

          <div className='grid items-center flex-1'>
            <FormField
              control={form.control}
              name='rooms'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormControl>
                    <Input type='number' placeholder='Phòng' {...field} />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>

          <div className='mt-auto'>
            <Button type='submit' className='text-base bg-blue-500'>
              Tìm kiếm
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default SearchForm;
