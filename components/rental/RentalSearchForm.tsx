"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import "./index.css";
import locations from "@/data/location.json";
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
import { useState, useEffect } from "react";

interface Location {
  id: number;
  name: string;
  type: string;
  parent_id: number | null;
}

function combineDateTime(date: Date, time: string): Date {
  const timeParts = time.split(":");
  if (
    timeParts.length !== 2 ||
    isNaN(Number(timeParts[0])) ||
    isNaN(Number(timeParts[1]))
  ) {
    throw new Error("Invalid time format");
  }

  const newDate = new Date(date);

  if (isNaN(newDate.getTime())) {
    throw new Error("Invalid date");
  }

  newDate.setHours(Number(timeParts[0]));
  newDate.setMinutes(Number(timeParts[1]));

  if (isNaN(newDate.getTime())) {
    throw new Error("Invalid time value");
  }

  return newDate;
}

export const formSchema = z
  .object({
    location: z
      .string()
      .min(1, "Vui lòng nhập điểm đến để bắt đầu tìm kiếm!")
      .max(50),

    checkin: z
      .object({
        date: z.date(),
        time: z
          .string()
          .regex(
            /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
            "Thời gian phải có định dạng HH:mm",
          ),
      })
      .refine(
        (data) => {
          try {
            const checkinDateTime = combineDateTime(data.date, data.time);
            return !isNaN(checkinDateTime.getTime());
          } catch (error) {
            return false;
          }
        },
        {
          message: "Ngày và thời gian checkin không hợp lệ",
        },
      ),

    checkout: z
      .object({
        date: z.date(),
        time: z
          .string()
          .regex(
            /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
            "Thời gian phải có định dạng HH:mm",
          ),
      })
      .refine(
        (data) => {
          try {
            const checkoutDateTime = combineDateTime(data.date, data.time);
            return !isNaN(checkoutDateTime.getTime());
          } catch (error) {
            return false;
          }
        },
        {
          message: "Ngày và thời gian checkin không hợp lệ",
        },
      ),
  })
  .refine(
    (data) => {
      const checkinDateTime = combineDateTime(
        data.checkin.date,
        data.checkin.time,
      );
      const checkoutDateTime = combineDateTime(
        data.checkout.date,
        data.checkout.time,
      );

      return checkinDateTime < checkoutDateTime;
    },
    {
      message: "Ngày và thời gian kết thúc phải sau ngày và thời gian bắt đầu",
    },
  );

function RentalSearchForm() {
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
      checkin: {
        date: today,
        time: "09:00",
      },
      checkout: {
        date: tomorrow,
        time: "09:00",
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

  const handleSuggestionClick = (name: string) => {
    setKeyword(name);
    form.setValue("location", name);
    setSuggestions([]);
  };

  useEffect(() => {
    const storedValues = localStorage.getItem("searchRental");
    if (storedValues) {
      const parsedValues = JSON.parse(storedValues);
      form.setValue("location", parsedValues.location || "");
      form.setValue("checkin.date", new Date(parsedValues.checkin?.date));
      form.setValue("checkout.date", new Date(parsedValues.checkout?.date));
      form.setValue("checkin.time", parsedValues.checkin?.time || "09:00");
      form.setValue("checkout.time", parsedValues.checkout?.time || "09:00");
    }

    const subscription = form.watch((value) => {
      localStorage.setItem("searchRental", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const startDate = `${format(values.checkin.date, "yyyy-MM-dd")}T${values.checkin.time}`;
    const endDate = `${format(values.checkout.date, "yyyy-MM-dd")}T${values.checkout.time}`;
    const currentPath = window.location.pathname;
    localStorage.setItem("searchRental", JSON.stringify(values));

    const url = new URL("https://searchresults.html");
    url.searchParams.set("ss", "true");
    url.searchParams.set("location", values.location);
    url.searchParams.set("checkin", startDate);
    url.searchParams.set("checkout", endDate);

    console.log(url.href);

    if (currentPath.includes("/search")) {
      router.push(`search?url=${url.href}`);
    } else {
      router.push(`rental/search?url=${url.href}`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-blue-600 p-4 rounded-lg max-w-7xl lg:mx-auto"
      >
        <div className="grid grid-cols-10 gap-2">
          <div className="col-span-3 relative">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative h-[65px]">
                      <Input
                        placeholder="Bạn đang ở đâu?"
                        {...field}
                        onChange={(e) => {
                          setKeyword(e.target.value);
                          field.onChange(e);
                        }}
                        value={keyword || field.value}
                        className="pl-12 h-[65px]"
                      />
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <FontAwesomeIcon
                          icon={faMapLocation}
                          className="mr-2 text-gray-400"
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

          <div className="col-span-2 bg-white border border-gray-300 rounded-lg px-4 py-2">
            <FormField
              control={form.control}
              name="checkin.date"
              render={({ field }) => (
                <FormItem>
                  <label className="block text-xs">Ngày nhận xe</label>
                  <Popover>
                    <PopoverTrigger asChild className="!p-0">
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full h-auto border border-white justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="mr-2 w-4 text-gray-400"
                          />
                          {field.value &&
                          field.value instanceof Date &&
                          !isNaN(field.value.getTime())
                            ? format(field.value, "dd/MM/yyyy")
                            : "Ngày nhận xe"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
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

          <div className="col-span-1 bg-white border border-gray-300 rounded-lg px-4 py-2">
            <FormField
              control={form.control}
              name="checkin.time"
              render={({ field }) => (
                <FormItem>
                  <label className="block text-xs">Thời gian</label>
                  <FormControl>
                    <div className="flex">
                      <select
                        className="rounded-lg w-full text-sm"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        {[...Array(24)].map((_, hourIndex) =>
                          [...Array(2)].map((_, minuteIndex) => {
                            const hour = hourIndex.toString().padStart(2, "0");
                            const minutes = (minuteIndex * 30)
                              .toString()
                              .padStart(2, "0");
                            const time = `${hour}:${minutes}`;
                            return (
                              <option
                                key={`${hourIndex}-${minuteIndex}`}
                                value={time}
                              >
                                {time}
                              </option>
                            );
                          }),
                        )}
                      </select>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2 bg-white border border-gray-300 rounded-lg px-4 py-2">
            <FormField
              control={form.control}
              name="checkout.date"
              render={({ field }) => (
                <FormItem>
                  <label className="block text-xs">Ngày trả xe</label>
                  <Popover>
                    <PopoverTrigger asChild className="!p-0">
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full h-auto border border-white justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="mr-2 w-4 text-gray-400"
                          />
                          {field.value &&
                          field.value instanceof Date &&
                          !isNaN(field.value.getTime())
                            ? format(field.value, "dd/MM/yyyy")
                            : "Ngày trả xe"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                        disabled={(date) =>
                          date <= form.getValues("checkin.date")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-1 bg-white border border-gray-300 rounded-lg px-4 py-2">
            <FormField
              control={form.control}
              name="checkout.time"
              render={({ field }) => (
                <FormItem>
                  <label className="block text-xs">Thời gian</label>
                  <FormControl>
                    <div className="flex">
                      <select
                        className="rounded-lg w-full text-sm"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        {[...Array(24)].map((_, hourIndex) =>
                          [...Array(2)].map((_, minuteIndex) => {
                            const hour = hourIndex.toString().padStart(2, "0");
                            const minutes = (minuteIndex * 30)
                              .toString()
                              .padStart(2, "0");
                            const time = `${hour}:${minutes}`;
                            return (
                              <option
                                key={`${hourIndex}-${minuteIndex}`}
                                value={time}
                              >
                                {time}
                              </option>
                            );
                          }),
                        )}
                      </select>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-1 flex justify-center">
            <Button
              type="submit"
              className="bg-[#013B94] text-base font-bold w-full h-full"
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default RentalSearchForm;
