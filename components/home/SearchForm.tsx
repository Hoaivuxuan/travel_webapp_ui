'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format, addDays } from 'date-fns';
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
import { faCalendar, faChild, faHome, faMoon, faPerson, faSearch } from '@fortawesome/free-solid-svg-icons';

export const formSchema = z.object({
  location: z.string().min(2).max(50),
  checkInDate: z.date(),
  nights: z.number().min(1).max(30),
  checkOutDate: z.date(),
  adults: z.number().min(1).max(12),
  children: z.number().min(0).max(12),
  rooms: z.number().min(1).max(10),
});

function SearchForm() {
  const router = useRouter();
  const today = new Date();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      checkInDate: today,
      nights: 1,
      checkOutDate: addDays(today, 1),
      adults: 2,
      children: 0,
      rooms: 1,
    },
  });

  const updateCheckOutDate = (checkInDate: Date | undefined, nights: number | undefined) => {
    if (checkInDate && nights !== undefined) {
      const newCheckOutDate = addDays(checkInDate, nights);
      form.setValue('checkOutDate', newCheckOutDate);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const currentPath = window.location.pathname;

    const url = new URL('https://www.booking.com/searchresults.html');
    url.searchParams.set('ss', values.location);
    url.searchParams.set('group_adults', values.adults.toString());
    url.searchParams.set('group_children', values.children.toString());
    url.searchParams.set('no_rooms', values.rooms.toString());
    url.searchParams.set('checkin', format(values.checkInDate, 'yyyy-MM-dd'));
    url.searchParams.set('checkout', format(values.checkOutDate, 'yyyy-MM-dd'));

    if (currentPath.includes('/home')) {
      if (currentPath.includes('/search')) {
        router.push(`search?url=${url.href}`);
      } else {
        router.push(`home/search?url=${url.href}`);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-blue-600 py-4 px-6 rounded-lg max-w-7xl lg:mx-auto'>
        
        <div className='grid grid-cols-9 gap-4'>
          {/* Location Field */}
          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Bạn muốn đến đâu?' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-3'></div>

          {/* Check-in Date Field */}
          <div className='col-span-3'>
            <FormField
              control={form.control}
              name='checkInDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          id='date'
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}>
                          <FontAwesomeIcon icon={faCalendar} className='w-4 h-4 mr-2' />
                          {field.value ? format(field.value, 'LLL dd, y') : 'Chọn ngày nhận phòng'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        initialFocus
                        mode='single'
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          updateCheckOutDate(date, form.getValues('nights'));
                        }}
                        numberOfMonths={2}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>

          {/* Nights Field */}
          <div className='col-span-3'>
            <FormField
              control={form.control}
              name='nights'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormControl>
                    <select
                      {...field}
                      className='p-2 border border-gray-300 rounded w-full'
                      onChange={(e) => {
                        const newNights = Number(e.target.value);
                        field.onChange(newNights);
                        const checkInDate = form.getValues('checkInDate');
                        updateCheckOutDate(checkInDate, newNights);
                      }}
                    >
                      {/* Tạo các tùy chọn từ 1 đến 30 */}
                      {[...Array(30)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1} đêm
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Check-out Date Field */}
          <div className='col-span-3'>
            <FormField
              control={form.control}
              name='checkOutDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormControl>
                    <Input
                      type='text'
                      value={field.value ? format(field.value, 'LLL dd, y') : ''}
                      readOnly
                      onChange={() => {
                        // Bỏ qua sự kiện onChange để ngăn người dùng thay đổi giá trị
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Adults Field */}
          <div className='col-span-2'>
            <FormField
              control={form.control}
              name='adults'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormControl>
                    <select
                      {...field}
                      className='p-2 border border-gray-300 rounded w-full'
                    >
                      {[...Array(12)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1} người lớn
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Children Field */}
          <div className='col-span-2'>
            <FormField
              control={form.control}
              name='children'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormControl>
                    <select
                      {...field}
                      className='p-2 border border-gray-300 rounded w-full'
                    >
                      {[...Array(12)].map((_, index) => (
                        <option key={index} value={index}>
                          {index} trẻ em
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Rooms Field */}
          <div className='col-span-2'>
            <FormField
              control={form.control}
              name='rooms'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormControl>
                    <select
                      {...field}
                      className='p-2 border border-gray-300 rounded w-full'
                    >
                      {[...Array(12)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1} phòng
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className='col-span-3 flex justify-center'>
            <Button type='submit' className='text-base bg-yellow-400 w-full flex items-center justify-center'>
              <FontAwesomeIcon icon={faSearch} className='m-2 w-5 text-base' />
              Tìm kiếm
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default SearchForm;
