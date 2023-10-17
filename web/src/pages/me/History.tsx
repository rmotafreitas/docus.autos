import { useEffect, useMemo } from "react";
// @ts-ignore
import { register } from "@teamhanko/hanko-elements";
import { hankoInstance } from "@/lib/hanko";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Navbar } from "@/components/navbar";
import {
  FileAudio,
  FileText,
  FileVideo,
  FilterIcon,
  Globe,
} from "lucide-react";

export function HistoryPage() {
  const hanko = useMemo(() => hankoInstance, []);
  const router = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const user = await hanko.user.getCurrent();
        console.log(user);
      } catch (e) {
        router("/auth?expired=1");
      }
    })();
  }, []);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Navbar />
      <div className="flex flex-col justify-center items-center flex-1 min-h-full min-w-[74rem] max-w-[74rem]">
        <div className="flex justify-end w-full mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row justify-center items-center gap-2">
              <FilterIcon className="text-xl" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Media Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem className="flex flex-row gap-2 justify-start items-center">
                <FileVideo className="w-4" />
                Videos
              </DropdownMenuItem>

              <DropdownMenuItem className="flex flex-row gap-2 justify-start items-center">
                <Globe className="w-4" />
                Websites
              </DropdownMenuItem>

              <DropdownMenuItem className="flex flex-row gap-2 justify-start items-center">
                <FileText className="w-4" />
                Documents
              </DropdownMenuItem>

              <DropdownMenuItem className="flex flex-row gap-2 justify-start items-center">
                <FileAudio className="w-4" />
                Audios
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Table>
          <TableCaption>A list of your {} prompts.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
