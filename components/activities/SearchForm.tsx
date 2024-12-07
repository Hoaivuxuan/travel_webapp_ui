"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
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
import { useEffect } from "react";
import "./index.css";

export const formSchema = z.object({
  location: z
    .string()
    .min(1, "Vui lòng chọn địa điểm tham quan của bạn!")
    .max(50),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

function SearchForm() {
  const router = useRouter();
  const today = new Date();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      dateRange: {
        from: today,
        to: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    },
  });

  useEffect(() => {
    const storedValues = localStorage.getItem("searchActivities");
    if (storedValues) {
      const parsedValues = JSON.parse(storedValues);
      form.setValue("location", parsedValues.location || "");
      form.setValue("dateRange", {
        from: new Date(parsedValues.dateRange.from),
        to: new Date(parsedValues.dateRange.to),
      });
    }

    const subscription = form.watch((value) => {
      localStorage.setItem("searchActivities", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const currentPath = window.location.pathname;
    localStorage.setItem("searchActivities", JSON.stringify(values));

    const url = new URL("https://searchresults.html");
    url.searchParams.set("ss", "true");
    url.searchParams.set("location", values.location);
    url.searchParams.set(
      "checkin",
      format(values.dateRange.from, "yyyy-MM-dd"),
    );
    url.searchParams.set("checkout", format(values.dateRange.to, "yyyy-MM-dd"));

    if (currentPath.includes("/search")) {
      router.push(`search?url=${url.href}`);
    } else {
      router.push(`activities/search`);
    }
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
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Bạn muốn đi ở đâu?"
                            {...field}
                            className="pl-10"
                          />
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <FontAwesomeIcon
                              icon={faMapLocation}
                              className="mr-2 w-4 text-gray-400"
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

              <div className="col-span-6">
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
                                ? `${format(
                                    field.value.from,
                                    "dd/MM/yyyy",
                                  )} - ${format(field.value.to, "dd/MM/yyyy")}`
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
            </div>
          </div>

          <div className="col-span-1 flex items-end justify-center">
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
