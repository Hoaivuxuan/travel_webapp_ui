"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { AutoComplete, Button, DatePicker, Input } from "antd";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from 'react-icons/ai';
import { IoLocationOutline } from "react-icons/io5";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { CityService } from "@/services/CommonService";
import dayjs from "dayjs";

export const formSchema = z.object({
  location: z
    .string()
    .min(1, "Vui lòng nhập điểm đến để bắt đầu tìm kiếm!")
    .max(50),
  dateRange: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
});

function ActivitiesSearchForm() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [listCity, setListCity] = useState<any[]>([]);
  const [listActivity, setListActivity] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const normalizeString = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      dateRange: {
        startDate: today,
        endDate: tomorrow,
      },
    },
  });

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const data = (await CityService.getAll()).data;
        setListCity(data.response || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchCity();
  }, []);

  useEffect(() => {
    if (Array.isArray(listCity) && keyword) {
      const normalizedKeyword = normalizeString(keyword);
      const filtered = listActivity.filter((loc: any) => {
        const normalizedLocationName = normalizeString(loc.name);
        return normalizedLocationName.includes(normalizedKeyword);
      });
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [keyword, listActivity, listCity]);

  useEffect(() => {
    const storedValues = localStorage.getItem("searchActivities");
    if (storedValues) {
      const parsedValues = JSON.parse(storedValues);
      form.setValue("location", parsedValues.location || "");
      form.setValue("dateRange", {
        startDate: new Date(parsedValues.dateRange.startDate),
        endDate: new Date(parsedValues.dateRange.endDate),
      });
      setDateRange([
        dayjs(parsedValues.dateRange.startDate),
        dayjs(parsedValues.dateRange.endDate),
      ]);
    }

    const subscription = form.watch((value) => {
      localStorage.setItem("searchActivities", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);


  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);

  const handleDateChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    if (dates) {
      setDateRange(dates);
      form.setValue("dateRange", {
        startDate: dates[0]?.toDate() ?? today,
        endDate: dates[1]?.toDate() ?? tomorrow,
      });
    }
  };

  const handleLocationSearch = (keyword: string, setSuggestions: any) => {
    if (!keyword) {
      setSuggestions([]);
      return;
    }
    if (Array.isArray(listActivity)) {
      const filteredSuggestions = listActivity.filter((location) =>
        location.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      console.error("listActivity is not an array");
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    localStorage.setItem("searchActivities", JSON.stringify(values));

    const query = new URLSearchParams({
      location: values.location,
      start: format(values.dateRange.startDate, "dd-MM-yyyy"),
      end: format(values.dateRange.endDate, "dd-MM-yyyy"),
    });

    router.push(`/activities/search?url=3&${query.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-[#472f91] border border-white p-4 rounded-lg max-w-7xl lg:mx-auto"
      >
        <div className="grid grid-cols-9 gap-2">
          <div className="col-span-8">
            <div className=" grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <AutoComplete
                            options={suggestions.map((suggestion: any) => ({
                              value: suggestion.name,
                              label: (
                                <div className="flex justify-between">
                                  <span className="text-sm">{suggestion.name}</span>
                                  <span className="bg-green-200 text-green-600 rounded-lg px-2 py-1 text-xs">
                                    {suggestion.type}
                                  </span>
                                </div>
                              ),
                            }))}
                            onSearch={(value) => {
                              setKeyword(value);
                              handleLocationSearch(value, setSuggestions);
                              field.onChange(value);
                            }}
                            onSelect={(value) => {
                              setKeyword(value);
                              field.onChange(value);
                            }}
                            value={keyword || field.value}
                            className="w-full"
                          >
                            <Input
                              placeholder="Tìm kiếm điểm đến..."
                              value={keyword || field.value}
                              onChange={(e) => {
                                setKeyword(e.target.value);
                                field.onChange(e);
                              }}
                              className="pl-10"
                            />
                          </AutoComplete>
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <IoLocationOutline className="text-gray-400" />
                          </span>
                          {keyword && (
                            <AiOutlineClose
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                              onClick={() => {
                                setKeyword("");
                                form.setValue("location", "");
                                setSuggestions([]);
                              }}
                            />
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="dateRange"
                  render={({ field }) => (
                    <FormField
                      control={form.control}
                      name="dateRange"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormControl>
                            <DatePicker.RangePicker
                              value={dateRange}
                              onChange={handleDateChange}
                              disabledDate={(current) => current && current < dayjs().startOf("day")}
                              format="DD/MM/YYYY"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="col-span-1 flex justify-center items-center">
            <Button type="primary" htmlType="submit" className="w-full bg-yellow-400 text-[#472f91]">
              Tìm kiếm
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default ActivitiesSearchForm;
