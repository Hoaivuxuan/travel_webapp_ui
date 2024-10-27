"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import "./index.css";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export const formSchema = z.object({
  type: z.string(),
  location: z
    .string()
    .min(1, "Vui lòng nhập điểm đến để bắt đầu tìm kiếm!")
    .max(50),
  dates: z
    .object({
      startDate: z.date(),
      endDate: z.date(),
    })
    .refine((data) => data.startDate < data.endDate, {
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

  const [selectedType, setSelectedType] = useState("cars");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "cars",
      location: "",
      dates: {
        startDate: today,
        endDate: tomorrow,
      },
      startTime: "09:00",
      endTime: "09:00",
    },
  });

  useEffect(() => {
    const storedValues = localStorage.getItem("rentalSearchFormValues");
    if (storedValues) {
      const parsedValues = JSON.parse(storedValues);
      form.setValue("type", parsedValues.type || "cars");
      form.setValue("location", parsedValues.location || "");
      form.setValue("dates.startDate", new Date(parsedValues.dates.startDate));
      form.setValue("dates.endDate", new Date(parsedValues.dates.endDate));
      form.setValue("startTime", parsedValues.startTime || "09:00");
      form.setValue("endTime", parsedValues.endTime || "09:00");
      setSelectedType(parsedValues.type || "cars");
    }

    const subscription = form.watch((value) => {
      localStorage.setItem("rentalSearchFormValues", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const checkin = format(values.dates.startDate, "dd-MM-yyyy");
    const checkout = format(values.dates.endDate, "dd-MM-yyyy");
    const currentPath = window.location.pathname;

    const url = new URL("https://searchresults.html");
    url.searchParams.set("ss", "false");
    url.searchParams.set("type", selectedType);
    url.searchParams.set("location", values.location);
    url.searchParams.set("checkin", checkin);
    url.searchParams.set("checkout", checkout);
    url.searchParams.set("start_time", values.startTime);
    url.searchParams.set("end_time", values.endTime);

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
                        placeholder="Bạn muốn đến đâu?"
                        {...field}
                        className="pl-12 h-[65px]"
                      />
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <FontAwesomeIcon
                          icon={faMapLocation}
                          className="mr-2 h-5 text-gray-400"
                        />
                      </span>
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
              name="dates.startDate"
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
                          {field.value
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
              name="startTime"
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
              name="dates.endDate"
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
                          {field.value
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
                          date <= form.getValues("dates.startDate")
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
              name="endTime"
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
      <div className="max-w-7xl mt-4 lg:mx-auto">
        <div className="flex space-x-4 text-base ml-2">
          <span>
            <strong>Chọn loại phương tiện: </strong>
          </span>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="type"
              value="cars"
              checked={selectedType === "cars"}
              onChange={() => setSelectedType("cars")}
              className="form-radio text-blue-600"
            />
            <span>Ô TÔ</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="type"
              value="motors"
              checked={selectedType === "motors"}
              onChange={() => setSelectedType("motors")}
              className="form-radio text-blue-600"
            />
            <span>XE MÁY</span>
          </label>
        </div>
      </div>
    </Form>
  );
}

export default RentalSearchForm;
