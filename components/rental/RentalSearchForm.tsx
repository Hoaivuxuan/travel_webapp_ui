"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Button, DatePicker, Input } from "antd";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from 'react-icons/ai';
import { GiPositionMarker } from "react-icons/gi";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "@/components/Notification";
import locations from "@/data/SelectCity.json";
import dayjs from "dayjs";

interface Location {
  id: number;
  name: string;
  type: string;
  parent_id: number | null;
}

export const formSchema = z.object({
  location: z
    .string()
    .min(1, "Vui lòng nhập điểm đến để bắt đầu tìm kiếm!")
    .max(50),
  dateRange: z.object({
    pickupDate: z.date(),
    returnDate: z.date(),
  }),
});

function RentalSearchForm() {
  const router = useRouter();
  const { notifyWarning } = Notification();
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
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
        pickupDate: today,
        returnDate: tomorrow,
      },
    },
  });

  useEffect(() => {
    if (keyword.trim()) {
      const normalizedKeyword = normalizeString(keyword);
      const filtered = locations.filter((loc) => {
        const normalizedLocationName = normalizeString(loc.name);
        return normalizedLocationName.includes(normalizedKeyword);
      });
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [keyword]);

  useEffect(() => {
    const storedValues = localStorage.getItem("searchVehicle");
    if (storedValues) {
      const parsedValues = JSON.parse(storedValues);
      form.setValue("location", parsedValues.location || "");
      form.setValue("dateRange", {
        pickupDate: new Date(parsedValues.dateRange.pickupDate),
        returnDate: new Date(parsedValues.dateRange.returnDate),
      });

      setDateRange([
        dayjs(parsedValues.dateRange.pickupDate),
        dayjs(parsedValues.dateRange.returnDate),
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
        pickupDate: dates[0]?.toDate() ?? today,
        returnDate: dates[1]?.toDate() ?? tomorrow,
      });
    }
  };

  const handleSuggestionClick = (name: string) => {
    setKeyword(name);
    form.setValue("location", name);
    setSuggestions([]);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    localStorage.setItem("searchVehicle", JSON.stringify(values));
    const query = new URLSearchParams({
      location: values.location,
      pickup: format(values.dateRange.pickupDate, "dd-MM-yyyy"),
      return: format(values.dateRange.returnDate, "dd-MM-yyyy"),
    });

    router.push(`/rental/search?url=2&${query.toString()}`);
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
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Bạn đang ở đâu..."
                            {...field}
                            onChange={(e) => {
                              setKeyword(e.target.value);
                              field.onChange(e);
                            }}
                            value={keyword || field.value}
                            className="pl-10"
                          />
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <GiPositionMarker className="text-gray-400" />
                          </span>
                          <AiOutlineClose
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            onClick={() => {
                              setKeyword("");
                              form.setValue("location", "");
                              setSuggestions([]);
                            }}
                          />
                          {suggestions.length > 0 && (
                            <ul className="absolute z-10 bg-white border border-gray-300 rounded shadow-md w-full mt-1 max-h-48 overflow-y-auto">
                              {suggestions.slice(0,5).map((suggestion) => (
                                <li
                                  key={suggestion.id}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() =>
                                    handleSuggestionClick(suggestion.name)
                                  }
                                >
                                  <div className="flex justify-between">
                                    <span className="text-sm">{suggestion.name}</span>
                                    <span className="bg-green-200 text-green-600 rounded-lg px-2 py-1 text-xs">
                                      {suggestion.type}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
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

export default RentalSearchForm;
