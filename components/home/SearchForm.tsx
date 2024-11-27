"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button, DatePicker, Input, Select } from "antd";
import { useRouter } from "next/navigation";
import { EnvironmentOutlined, CloseOutlined } from "@ant-design/icons";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import dayjs from "dayjs";
import locations from "@/data/location.json";

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
    from: z.date(),
    to: z.date(),
  }),
  adults: z.number().min(1).max(12),
  children: z.number().min(0).max(12),
  rooms: z.number().min(1).max(10),
});

function SearchForm() {
  const router = useRouter();
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
        from: today,
        to: tomorrow,
      },
      adults: 2,
      children: 0,
      rooms: 1,
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
    const storedValues = localStorage.getItem("searchHotel");
    if (storedValues) {
      const parsedValues = JSON.parse(storedValues);
      form.setValue("location", parsedValues.location || "");
      form.setValue("dateRange", {
        from: new Date(parsedValues.dateRange.from),
        to: new Date(parsedValues.dateRange.to),
      });
      form.setValue("adults", parsedValues.adults || 2);
      form.setValue("children", parsedValues.children || 0);
      form.setValue("rooms", parsedValues.rooms || 1);

      setDateRange([
        dayjs(parsedValues.dateRange.from),
        dayjs(parsedValues.dateRange.to),
      ]);
    }

    const subscription = form.watch((value) => {
      localStorage.setItem("searchHotel", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);


  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);

  const handleDateChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    if (dates) {
      setDateRange(dates);
      form.setValue("dateRange", {
        from: dates[0]?.toDate() ?? today,
        to: dates[1]?.toDate() ?? tomorrow,
      });
    }
  };

  const handleSuggestionClick = (name: string) => {
    setKeyword(name);
    form.setValue("location", name);
    setSuggestions([]);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    localStorage.setItem("searchHotel", JSON.stringify(values));

    const url = new URL("https://booking.html");
    url.searchParams.set("hotel", "true");
    url.searchParams.set("location", values.location);
    url.searchParams.set("checkin", format(values.dateRange.from, "dd-MM-yyyy"));
    url.searchParams.set("checkout", format(values.dateRange.to, "dd-MM-yyyy"));
    url.searchParams.set("adults", values.adults.toString());
    url.searchParams.set("children", values.children.toString());
    url.searchParams.set("rooms", values.rooms.toString());

    router.push(`/home/search?url=${url.search}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-blue-600 p-4 rounded-lg max-w-7xl lg:mx-auto"
      >
        <div className="grid grid-cols-9 gap-2">
          <div className="col-span-8">
            <div className=" grid grid-cols-12 gap-2">
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Tìm kiếm điểm đến..."
                            {...field}
                            onChange={(e) => {
                              setKeyword(e.target.value);
                              field.onChange(e);
                            }}
                            value={keyword || field.value}
                            className="pl-10"
                          />
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <EnvironmentOutlined className="text-gray-400" />
                          </span>
                          <button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            onClick={() => {
                              setKeyword("");
                              form.setValue("location", "");
                              setSuggestions([]);
                            }}
                          >
                            <CloseOutlined />
                          </button>
                          {suggestions.length > 0 && (
                            <ul className="absolute z-10 bg-white border border-gray-300 rounded shadow-md w-full mt-1 max-h-48 overflow-y-auto">
                              {suggestions.map((suggestion) => (
                                <li
                                  key={suggestion.id}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() =>
                                    handleSuggestionClick(suggestion.name)
                                  }
                                >
                                  <div className="flex justify-between">
                                    <span>{suggestion.name}</span>
                                    <span className="text-gray-400 text-sm">
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

              <div className="col-span-3">
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

              <div className="col-span-5 grid grid-cols-3 gap-1">
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="adults"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <Select
                            className="w-full h-full"
                            value={field.value}
                            onChange={(value) => {
                              const newAdults = Number(value);
                              field.onChange(newAdults);
                            }}
                          >
                            {Array.from({ length: 13 }, (_, i) => i + 1).map((count) => (
                              <Select.Option key={count} value={count}>
                                {count} người lớn
                              </Select.Option>
                            ))}
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="children"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <Select
                            className="w-full h-full"
                            value={field.value}
                            onChange={(value) => {
                              const newChildren = Number(value);
                              field.onChange(newChildren);
                            }}
                          >
                            {Array.from({ length: 13 }, (_, i) => i).map((count) => (
                              <Select.Option key={count} value={count}>
                                {count} trẻ em
                              </Select.Option>
                            ))}
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="rooms"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <Select
                            className="w-full h-full"
                            value={field.value}
                            onChange={(value) => {
                              const newRooms = Number(value);
                              field.onChange(newRooms);
                            }}
                          >
                            {Array.from({ length: 11 }, (_, i) => i + 1).map((count) => (
                              <Select.Option key={count} value={count}>
                                {count} phòng
                              </Select.Option>
                            ))}
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 flex justify-center items-center">
            <Button type="primary" htmlType="submit" className="w-full border">
              Tìm kiếm
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default SearchForm;
