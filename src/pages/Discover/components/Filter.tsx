import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type FilterProps = {
  name: string;
  defaultValue?: string;
  filters: {
    label: string;
    value: string;
  }[];
};

export const Filter = ({ name, defaultValue, filters }: FilterProps) => {
  const [_, setSearchParams] = useSearchParams();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-52 justify-between"
        >
          {value
            ? filters.find((filter) => filter.value === defaultValue)?.label
            : name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52">
        <Command>
          <CommandGroup>
            {filters.map((filter) => (
              <CommandItem
                key={filter.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  setSearchParams({ "filter": currentValue })
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === filter.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {filter.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
