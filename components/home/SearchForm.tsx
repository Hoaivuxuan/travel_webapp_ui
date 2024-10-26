"use client";

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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapLocation, faSearch } from '@fortawesome/free-solid-svg-icons';
import "./index.css";
import { useEffect } from 'react';

export const formSchema = z.object({
  location: z.string().min(1, "Vui lòng chọn địa điểm thuê xe của bạn!").max(50),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
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
      dateRange: { from: today, to: new Date(today.getTime() + 24 * 60 * 60 * 1000) }, // Mặc định ngày trả phòng là 1 ngày sau
      adults: 2,
      children: 0,
      rooms: 1,
    },
  });

  useEffect(() => {
    const storedValues = localStorage.getItem('searchFormValues');
    if (storedValues) {
      const parsedValues = JSON.parse(storedValues);
      form.setValue('location', parsedValues.location || '');
      form.setValue('dateRange', {
        from: new Date(parsedValues.dateRange.from),
        to: new Date(parsedValues.dateRange.to),
      });
      form.setValue('adults', parsedValues.adults || 2);
      form.setValue('children', parsedValues.children || 0);
      form.setValue('rooms', parsedValues.rooms || 1);
    }

    const subscription = form.watch((value) => {
      localStorage.setItem('searchFormValues', JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const currentPath = window.location.pathname;
    localStorage.setItem('defaultValues', JSON.stringify(values));

    const url = new URL('https://searchresults.html');
    url.searchParams.set('ss', 'true');
    url.searchParams.set('location', values.location);
    url.searchParams.set('checkin', format(values.dateRange.from, 'yyyy-MM-dd'));
    url.searchParams.set('checkout', format(values.dateRange.to, 'yyyy-MM-dd'));
    url.searchParams.set('adults', values.adults.toString());
    url.searchParams.set('children', values.children.toString());
    url.searchParams.set('rooms', values.rooms.toString());

    if (currentPath.includes('/search')) {
      router.push(`search?url=${url.href}`);
    } else {
      router.push(`home/search?url=${url.href}`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-blue-600 p-4 rounded-lg max-w-7xl lg:mx-auto'>
        
        <div className='grid grid-cols-9 gap-2'>
          <div className='col-span-8'>
            <div className=' grid grid-cols-12 gap-2'>
              {/* Location Field */}
              <div className='col-span-4'>
                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder='Bạn đang ở đâu?'
                            {...field}
                            className='pl-10'
                          />
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <FontAwesomeIcon icon={faMapLocation} className='mr-2 w-4 text-gray-400' />
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage className='px-2 text-white text-sm italic'/>
                    </FormItem>
                  )}
                />
              </div>

              {/* Date Range Field */}
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="dateRange"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 mr-2 text-gray-400" />
                              {field.value?.from && field.value?.to
                                ? `${format(field.value.from, "dd/MM/yyyy")} - ${format(field.value.to, "dd/MM/yyyy")}`
                                : "Chọn khoảng thời gian lưu trú"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            selected={field.value}
                            onSelect={(range) => {
                              field.onChange(range);
                            }}
                            numberOfMonths={2}
                            disabled={(date) => date < new Date(today.setHours(0, 0, 0, 0))}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-5 grid grid-cols-3 gap-1'>
                {/* Adults Field */}
                <div className='col-span-1'>
                  <FormField
                    control={form.control}
                    name='adults'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormControl>
                          <select
                            {...field}
                            className='p-2 border border-gray-300 rounded w-full'
                            onChange={(e) => {
                              const newAdults = Number(e.target.value);
                              field.onChange(newAdults);
                            }}
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
                <div className='col-span-1'>
                  <FormField
                    control={form.control}
                    name='children'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormControl>
                          <select
                            {...field}
                            className='p-2 border border-gray-300 rounded w-full'
                            onChange={(e) => {
                              const newChildren = Number(e.target.value);
                              field.onChange(newChildren);
                            }}
                          >
                            {[...Array(12)].map((_, index) => (
                              <option key={index} value={index}>
                                {index + 0} trẻ em
                              </option>
                            ))}
                          </select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Rooms Field */}
                <div className='col-span-1'>
                  <FormField
                    control={form.control}
                    name='rooms'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormControl>
                          <select
                            {...field}
                            className='p-2 border border-gray-300 rounded w-full'
                            onChange={(e) => {
                              const newRooms = Number(e.target.value);
                              field.onChange(newRooms);
                            }}
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
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='col-span-1 flex items-end justify-center'>
            <Button type='submit' className='bg-[#013B94] text-base font-bold w-full'>
              Tìm kiếm
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default SearchForm;
