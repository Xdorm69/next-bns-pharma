"use client";
import TableCompt from "@/components/TableCompt";
import { fetchApi } from "@/Hooks/api";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import TableFilters from "@/components/TableFilters";
import { useSession } from "next-auth/react";
import { PaginationBtns } from "@/components/PaginationBtns";

const RenderUserTable = () => {
  const [search, setSearch] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");
  const [subscribed, setSubscribed] = React.useState<string>("");
  const [provider, setProvider] = React.useState<string>("");
  const [page, setPage] = useState<number>(0);
  const max = 8;

  const session = useSession();
  const isAuthenticated = session.status === "authenticated";

  const {
    data: res,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin", "users", search, role, subscribed, provider],
    queryFn: async () => {
      return await fetchApi<User[]>(
        `/api/users?role=${role}&subscribed=${subscribed}&provider=${provider}&search=${search}&take=${max}&skip=${
          page * max
        }`
      );
    },
  });

  const users = res?.data ?? [];

  return (
    <div>
      {/* FILTERS  */}
      <TableFilters
        isAuthenticated={isAuthenticated}
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        filters={[
          {
            state: role,
            setState: setRole,
            title: "Role",
            selectItems: [
              { key: "ADMIN", value: "ADMIN" },
              { key: "USER", value: "USER" },
            ],
          },
          {
            state: subscribed,
            setState: setSubscribed,
            title: "Subscribed",
            selectItems: [
              { key: "Yes", value: "true" },
              { key: "No", value: "false" },
            ],
          },
          {
            state: provider,
            setState: setProvider,
            title: "Provider",
            selectItems: [
              { key: "Google", value: "google" },
              { key: "Email", value: "email" },
            ],
          },
        ]}
      />
      <TableCompt
        data={users}
        columns={[
          {
            column: "id",
            render: (row) => <CopyHoverCard data={row.id} tag="Id" />,
          },
          { column: "name", render: (row) => row.name },
          { column: "email", render: (row) => row.email },
          {
            column: "role",
            render: (row) => <RenderRoleCard role={row.role} />,
          },
          {
            column: "createdAt",
            render: (row) => (
              <CopyHoverCard
                data={new Date(row.createdAt).toString()}
                tag="Created At"
              />
            ),
          },
          {
            column: "updatedAt",
            render: (row) => (
              <CopyHoverCard
                data={new Date(row.updatedAT).toString()}
                tag="Updated At"
              />
            ),
          },
          {
            column: "subscribed",
            render: (row) =>
              row.subscribed ? (
                <div className="bg-emerald-500 text-white w-fit px-2 py-1 rounded">
                  Yes
                </div>
              ) : (
                <div className="bg-red-400 text-white w-fit px-2 py-1 rounded">
                  No
                </div>
              ),
          },
          { column: "provider", render: (row) => row.provider },
        ]}
        loading={isLoading}
        error={isError ? (error as Error)?.message : null}
      />
      <PaginationBtns
        page={page}
        setPage={setPage}
        isLastPage={users.length < max}
      />
    </div>
  );
};

export default RenderUserTable;

const CopyHoverCard = ({
  data,
  tag,
  placeHolder,
}: {
  data: string;
  tag: string;
  placeHolder?: string;
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(data);
    toast.success(`${data} copied successfully`);
  };
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className={cn("p-0", tag === "Id" && "text-primary")}
        >
          {placeHolder ?? data.split("").slice(0, 15).join("") + "..."}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{tag}</h4>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm">{data}</p>
              <Copy
                onClick={handleCopy}
                className="text-muted-foreground hover:text-primary cursor-pointer"
              />
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const RenderRoleCard = ({ role }: { role: "ADMIN" | "USER" }) => {
  return (
    <Badge
      className={cn(
        " border-1 bg-amber-500 border-amber-200",
        role === "ADMIN" && "bg-emerald-500 border-emerald-200"
      )}
    >
      {role}
    </Badge>
  );
};
