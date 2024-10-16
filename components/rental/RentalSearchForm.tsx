'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export const formSchema = z.object({
  type: z.string(),
  location: z.string().min(2).max(50),
  dates: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }).refine(data => data.startDate < data.endDate, {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
  }),
  startTime: z.string(),
  endTime: z.string(),
});

function RentalSearchForm() {
  const router = useRouter();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [selectedType, setSelectedType] = useState('cars');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'cars',
      location: '',
      dates: {
        startDate: today,
        endDate: tomorrow,
      },
      startTime: '09:00',
      endTime: '09:00',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const checkin = format(values.dates.startDate, 'dd-MM-yyyy');
    const checkout = format(values.dates.endDate, 'dd-MM-yyyy');
    const currentPath = window.location.pathname;

    const url = new URL('https://www.booking.com/searchresults.html');
    url.searchParams.set('ss', 'false');
    url.searchParams.set('type', selectedType);
    url.searchParams.set('location', values.location);
    url.searchParams.set('checkin', checkin);
    url.searchParams.set('checkout', checkout);
    url.searchParams.set('start_time', values.startTime);
    url.searchParams.set('end_time', values.endTime); 

    console.log(url.href);

    if (currentPath.includes('/search')) {
      router.push(`search?url=${url.href}`);
    } else {
      router.push(`rental/search?url=${url.href}`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-blue-600 flex flex-col p-4 items-center justify-center space-y-4 rounded-lg max-w-7xl lg:mx-auto'>

        <div>
          <div className='grid items-center w-full gap-1.5'>
            <div className='flex space-x-4 text-white'>
              <span>
                <strong>Chọn loại phương tiện: </strong>
              </span>
              <label className='flex items-center space-x-2'>
                <input
                  type='radio'
                  name='type'
                  value='cars'
                  checked={selectedType === 'cars'}
                  onChange={() => setSelectedType('cars')}
                  className='form-radio text-blue-600'
                />
                <span>Ô TÔ</span>
              </label>

              <label className='flex items-center space-x-2'>
                <input
                  type='radio'
                  name='type'
                  value='motors'
                  checked={selectedType === 'motors'}
                  onChange={() => setSelectedType('motors')}
                  className='form-radio text-blue-600'
                />
                <span>XE MÁY</span>
              </label>
            </div>
          </div>
        </div>

        <div className='flex space-x-4'>
          <div className='grid items-center w-[450px] gap-1.5'>
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder='Điền địa điểm nhận xe'
                        {...field}
                        className='pl-10'
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <FontAwesomeIcon icon={faMapLocation} className='mr-2 w-4 text-gray-400' />
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className='grid items-center gap-1.5'>
            <FormField
              control={form.control}
              name='dates.startDate'
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}>
                          <FontAwesomeIcon icon={faCalendar} className='mr-2 w-4 text-gray-400' />
                          {field.value ? format(field.value, 'LLL dd, y') : 'Ngày bắt đầu'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        initialFocus
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={1}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>

          <div className='grid items-center gap-1.5'>
            <FormField
              control={form.control}
              name='startTime'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type='time'
                        placeholder='Giờ bắt đầu'
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className='grid items-center gap-1.5'>
            <FormField
              control={form.control}
              name='dates.endDate'
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}>
                          <FontAwesomeIcon icon={faCalendar} className='mr-2 w-4 text-gray-400' />
                          {field.value ? format(field.value, 'LLL dd, y') : 'Ngày kết thúc'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        initialFocus
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={1}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>

          <div className='grid tems-center gap-1.5'>
            <FormField
              control={form.control}
              name='endTime'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type='time'
                        placeholder='Giờ kết thúc'
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <div className='flex items-center space-x-2'>
            <div className='mt-auto'>
              <Button type='submit' className='text-base bg-yellow-400'>
                Tìm kiếm
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default RentalSearchForm;
