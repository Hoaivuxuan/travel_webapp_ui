"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faMapLocation,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { useEffect, useState } from "react";
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

  const handleSuggestionClick = (name: string) => {
    setKeyword(name);
    form.setValue("location", name);
    setSuggestions([]);
  };

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
    }

    const subscription = form.watch((value) => {
      localStorage.setItem("searchHotel", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("searchHotel", JSON.stringify(values));

    const url = new URL("https://searchresults.html");
    url.searchParams.set("ss", "true");
    url.searchParams.set("location", values.location);
    url.searchParams.set(
      "checkin",
      format(values.dateRange.from, "yyyy-MM-dd"),
    );
    url.searchParams.set("checkout", format(values.dateRange.to, "yyyy-MM-dd"));
    url.searchParams.set("adults", values.adults.toString());
    url.searchParams.set("children", values.children.toString());
    url.searchParams.set("rooms", values.rooms.toString());

    router.push(`/home/search?url=${url.href}`);
  }

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
                            <FontAwesomeIcon
                              icon={faMapLocation}
                              className="mr-2 w-4 text-gray-400"
                            />
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
                            <FontAwesomeIcon icon={faTimes} className="w-4" />
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
                      {form.formState.errors.location && (
                        <div className="form-error !-mt-3">
                          {form.formState.errors.location.message}
                        </div>
                      )}
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
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <FontAwesomeIcon
                                icon={faCalendar}
                                className="w-4 h-4 mr-2 text-gray-400"
                              />
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
                            disabled={(date) =>
                              date < new Date(today.setHours(0, 0, 0, 0))
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-5 grid grid-cols-3 gap-1">
                {/* Adults Field */}
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="adults"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <select
                            {...field}
                            className="p-2 border border-gray-300 rounded w-full"
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
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="children"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <select
                            {...field}
                            className="p-2 border border-gray-300 rounded w-full"
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
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="rooms"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <select
                            {...field}
                            className="p-2 border border-gray-300 rounded w-full"
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
          <div className="col-span-1 flex items-start justify-center">
            <Button
              type="submit"
              className="bg-[#013B94] text-base font-bold w-full"
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default SearchForm;
