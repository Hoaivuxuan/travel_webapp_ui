'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { BedDoubleIcon, CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
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
import { Calendar } from '../ui/calendar';

export const formSchema = z.object({
  locationPickup: z.string().min(2).max(50),
  locationDropoff: z.string().min(2).max(50),
  dates: z.object({
    pickup: z.date(),
    dropoff: z.date(),
  }),
  adults: z
    .string()
    .min(1, {
      message: 'Vui lòng chọn ít nhất 1 người lớn',
    })
    .max(12, { message: 'Tối đa 12 người lớn' }),
});

function RentalSearchForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locationPickup: '',
      locationDropoff: '',
      dates: {
        pickup: undefined,
        dropoff: undefined,
      },
      adults: '0',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const checkin_day = values.dates.pickup.getDate().toString();
    const checkin_month = (values.dates.pickup.getMonth() + 1).toString();
    const checkin_year = values.dates.pickup.getFullYear().toString();
    const checkout_day = values.dates.dropoff.getDate().toString();
    const checkout_month = (values.dates.dropoff.getMonth() + 1).toString();
    const checkout_year = values.dates.dropoff.getFullYear().toString();

    const checkin = `${checkin_year}-${checkin_month}-${checkin_day}`;
    const checkout = `${checkout_year}-${checkout_month}-${checkout_day}`;

    const url = new URL('https://www.booking.com/searchresults.html');
    url.searchParams.set('location_pickup', values.locationPickup);
    url.searchParams.set('location_return', values.locationDropoff);
    url.searchParams.set('group_adults', values.adults);
    url.searchParams.set('checkin', checkin);
    url.searchParams.set('checkout', checkout);

    router.push(`rental/search?url=${url.href}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center space-x-0 space-y-4 rounded-lg lg:flex-row lg:max-w-6xl lg:mx-auto lg:space-x-2 lg:space-y-0'>     
        <div className='grid w-full lg:max-w-sm items-center gap-1.5'>
          <FormField
            control={form.control}
            name='locationPickup'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder='Địa điểm nhận xe'
                      {...field}
                      className='pl-10'
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <BedDoubleIcon className='w-4 h-4 text-gray-500' />
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className='grid w-full lg:max-w-sm items-center gap-1.5'>
          <FormField
            control={form.control}
            name='locationDropoff'
            render={({ field }) => (
              <FormItem>
                {/* <FormMessage /> */}
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder='Địa điểm trả xe'
                      {...field}
                      className='pl-10'
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <BedDoubleIcon className='w-4 h-4 text-gray-500' />
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className='grid w-full flex-1 lg:max-w-sm items-center gap-1.5'>
          <FormField
            control={form.control}
            name='dates'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <div className='flex space-x-2'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          id='pickup-date'
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value.pickup && 'text-muted-foreground'
                          )}>
                          <CalendarIcon className='w-4 h-4 mr-3 opacity-50' />
                          {field.value?.pickup ? (
                            format(field.value?.pickup, 'LLL dd, y')
                          ) : (
                            <span>Ngày nhận xe</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        initialFocus
                        mode='single'
                        selected={field.value.pickup}
                        defaultMonth={field.value.pickup}
                        onSelect={(date) => {
                          field.onChange({ ...field.value, pickup: date });
                        }}
                        numberOfMonths={1}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          id='dropoff-date'
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value.dropoff && 'text-muted-foreground'
                          )}>
                          <CalendarIcon className='w-4 h-4 mr-3 opacity-50' />
                          {field.value?.dropoff ? (
                            format(field.value?.dropoff, 'LLL dd, y')
                          ) : (
                            <span>Ngày trả xe</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        initialFocus
                        mode='single'
                        selected={field.value.dropoff}
                        defaultMonth={field.value.dropoff}
                        onSelect={(date) => {
                          field.onChange({ ...field.value, dropoff: date });
                        }}
                        numberOfMonths={1}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
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
                    <Input type='number' placeholder='Thời gian' {...field} />
                  </FormControl>
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

export default RentalSearchForm;
