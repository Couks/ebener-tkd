"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    name: string;
    defaultValue?: Date;
    required?: boolean;
}

export function DatePicker({ name, defaultValue, required }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(defaultValue);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-foreground/10 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white",
            "justify-start text-left font-normal hover:bg-foreground/10",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-popover border-input text-popover-foreground">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
      {/* Hidden input to carry the value in the form */}
      {date && <input type="hidden" name={name} value={format(date, 'yyyy-MM-dd')} />}
    </Popover>
  )
}
