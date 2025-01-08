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
import { ToastContainer } from "react-toastify";
import { CityService } from "@/services/CommonService";
import "react-toastify/dist/ReactToastify.css";
import Notification from "@/components/Notification";
import dayjs from "dayjs";

export const formSchema = z.object({
  location: z.object({
    name: z.string().min(1, "Vui lòng nhập điểm đến để bắt đầu tìm kiếm!").max(50),
    id: z.number().optional(),
  }),
  dateRange: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
});

function TourSearchForm() {
  const router = useRouter();
  const { notifyWarning } = Notification();
  const [keyword, setKeyword] = useState("");
  const [listCity, setListCity] = useState<any[]>([]);
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
      location: {
        name: "",
        id: undefined,
      },
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
      const filtered = listCity.filter((loc: any) => {
        const normalizedLocationName = normalizeString(loc.name);
        return normalizedLocationName.includes(normalizedKeyword);
      });
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [keyword, listCity]);

  useEffect(() => {
    const storedValues = localStorage.getItem("searchVehicle");
    if (storedValues) {
      const parsedValues = JSON.parse(storedValues);
      form.setValue("location", parsedValues.location || { name: "", id: undefined });
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
      localStorage.setItem("searchVehicle", JSON.stringify(value));
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
    if (Array.isArray(listCity)) {
      const filteredSuggestions = listCity.filter((location) =>
        location.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      console.error("listCity is not an array");
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    localStorage.setItem("searchActivities", JSON.stringify(values));
    const query = new URLSearchParams({
      location: values.location.name,
      city: values.location.id?.toString() || "",
      startDate: format(values.dateRange.startDate, "dd-MM-yyyy"),
      endDate: format(values.dateRange.endDate, "dd-MM-yyyy"),
    });
  
    router.push(`/activities/search?url=3&${query.toString()}`);
  };

  const onError = (errors: any) => {
    Object.values(errors).forEach((error: any) => {
      if (error && error.message) notifyWarning(error.message);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="bg-[#472f91] border border-white p-4 rounded-lg max-w-7xl lg:mx-auto"
      >
        <div className="grid grid-cols-9 gap-2">
          <div className="col-span-8">
            <div className=" grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <AutoComplete
                            options={suggestions.slice(0,5).map((suggestion: any) => ({
                              value: suggestion.name,
                              label: (
                                <div className="flex justify-between">
                                  <span className="text-sm">{suggestion.name}</span>
                                  <span className="bg-green-200 text-green-600 rounded-lg px-2 py-1 text-xs">
                                    {suggestion.type}
                                  </span>
                                </div>
                              ),
                              id: suggestion.id,
                            }))}
                            onSearch={(value) => {
                              setKeyword(value);
                              handleLocationSearch(value, setSuggestions);
                              field.onChange({ name: value, id: undefined });
                            }}
                            onSelect={(value, option: any) => {
                              const selectedSuggestion = suggestions.find((s) => s.name === value);
                              if (selectedSuggestion) {
                                form.setValue("location", {
                                  name: selectedSuggestion.name,
                                  id: selectedSuggestion.id,
                                });
                                setKeyword(selectedSuggestion.name);
                              }
                            }}
                            value={keyword || field.value?.name || ""}
                            className="w-full"
                          >
                            <Input
                              placeholder="Tìm kiếm điểm đến..."
                              value={keyword || field.value?.name || ""}
                              onChange={(e) => {
                                setKeyword(e.target.value);
                                field.onChange({ name: e.target.value, id: undefined });
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
                                form.setValue("location", { name: "", id: undefined });
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
                  render={({field}) => (
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
      <ToastContainer />
    </Form>
  );
}

export default TourSearchForm;
